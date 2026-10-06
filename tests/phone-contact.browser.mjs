// Optional browser regression: supply PLAYWRIGHT_MODULE from an existing external install.
// Run against a local production server; Ads requests are mocked and calls are prevented.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.EBTS_QA_URL || "http://127.0.0.1:3109";
const origin = new URL(base).origin;
assert.ok(["127.0.0.1", "localhost"].includes(new URL(base).hostname), "QA must run locally");
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [320, 393, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    let tagRequests = 0;
    await context.route("**/*", async route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      if (url.hostname === "www.googletagmanager.com") {
        tagRequests++;
        return route.fulfill({ contentType: "text/javascript", body: "window.__qaTagLoaded = true;" });
      }
      return route.abort();
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__qaPhoneClicks = [];
      document.addEventListener("click", event => {
        const link = event.target.closest('a[href^="tel:"]');
        if (link) {
          event.preventDefault(); // Never open a dialer or place a real call.
          window.__qaPhoneClicks.push(link.getAttribute("href"));
        }
      }, true);
    });
    await page.goto(base + "/arcelik-servisi", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Reddet", exact: true }).waitFor();
    assert.equal(tagRequests, 0);
    assert.equal(await page.locator("#google-ads-gtag").count(), 0);
    await page.getByRole("button", { name: "Reddet", exact: true }).click();
    await page.locator('.service-hero a[href^="tel:"]').click();
    assert.equal(await page.evaluate(() => window.dataLayer?.length || 0), 0);
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("#google-ads-gtag").count(), 0);
    assert.equal(await page.evaluate(() => localStorage.getItem("ege-bolge-cookie-preference")), "rejected");
    if (width <= 768) {
      await page.locator("button.menu").click();
      await page.locator("#main-navigation").getByRole("link", { name: "İletişim", exact: true }).click();
      await page.waitForURL("**/iletisim");
      assert.equal(await page.locator("button.menu").getAttribute("aria-expanded"), "false");
    }
    await page.getByRole("button", { name: "Çerez Tercihleri", exact: true }).click();
    await page.getByRole("button", { name: "Tümünü Kabul Et", exact: true }).click();
    await page.waitForFunction(() => window.__qaTagLoaded === true);
    assert.equal(tagRequests, 1);
    assert.equal(await page.evaluate(() => localStorage.getItem("ege-bolge-cookie-preference")), "accepted");
    assert.deepEqual(await page.evaluate(() => window.dataLayer.filter(v => Array.isArray(v) && v[0] === "config").map(v => v[1])), ["AW-18410577740"]);
    const phone = page.locator(width <= 768 ? ".mobile-call" : '.topbar a[href^="tel:"]');
    await phone.focus();
    await page.keyboard.press("Enter");
    assert.deepEqual(await page.evaluate(() => window.__qaPhoneClicks), ["tel:+905332319469"]);
    assert.equal(await page.evaluate(() => window.dataLayer.filter(v => v?.event === "phone_click").length), 1);
    assert.equal(await page.evaluate(() => window.dataLayer.filter(v => Array.isArray(v) && v[0] === "event" && v[1] === "conversion").length), 0);
    assert.equal(await page.locator('a[href*="wa.me"]').count(), 0);
    if (width <= 768) {
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(await page.locator(".mobile-call .phone-icon").evaluate(e => getComputedStyle(e).animationName), "none");
      // Short viewport: consent buttons remain scrollable above the CTA.
      await page.setViewportSize({ width, height: 568 });
    }
    await page.getByRole("button", { name: "Çerez Tercihleri", exact: true }).click();
    const cookie = await page.locator(".cookie-consent").boundingBox();
    if (width <= 768) {
      const cta = await phone.boundingBox();
      assert.ok(cookie.y >= 67 && cookie.y + cookie.height <= cta.y);
    }
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.getByRole("button", { name: "Reddet", exact: true }).click(),
    ]);
    assert.equal(await page.locator("#google-ads-gtag").count(), 0);
    assert.equal(tagRequests, 1);
    assert.equal(await page.evaluate(() => localStorage.getItem("ege-bolge-cookie-preference")), "rejected");
    console.log(JSON.stringify({ width, consent: "pass", keyboardPhone: "pass", phoneAdsConversions: 0, reducedMotion: width <= 768 ? "pass" : "not applicable", noRealCalls: true }));
    await context.close();
  }
} finally {
  await browser.close();
}
