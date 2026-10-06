// External Playwright only; mock Ads and prevent dialing AFTER observing application behavior.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.EBTS_QA_URL || "http://127.0.0.1:3112";
const origin = new URL(base).origin;
assert.ok(["127.0.0.1", "localhost"].includes(new URL(base).hostname));
const browser = await chromium.launch({ headless: true });
const destination = "AW-18410577740/WXDGCL6J55IdEMy-7MpE";
try {
  for (const width of [393, 1440]) for (const path of ["/", "/beyaz-esya-servisi", "/arcelik-servisi", "/iletisim"]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    let tagRequests = 0;
    await context.route("**/*", async route => {
      const url = new URL(route.request().url());
      if (url.origin === origin) return route.continue();
      if (url.hostname === "www.googletagmanager.com") {
        assert.equal(url.searchParams.get("id"), "AW-18410577740"); tagRequests++;
        return route.fulfill({ contentType: "text/javascript", body: "window.__qaTagLoaded = true;" });
      }
      return route.abort();
    });
    const page = await context.newPage(), errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.addInitScript(() => {
      window.__qaClicks = [];
      // Window bubbling runs after React/root and the application's document listener.
      window.addEventListener("click", event => {
        const link = event.target instanceof Element && event.target.closest('a[href^="tel:"]');
        if (!link) return;
        window.__qaClicks.push({ href: link.getAttribute("href"), prevented: event.defaultPrevented });
        event.preventDefault(); // Test harness only: never open a phone handler.
      });
    });
    const conversions = () => page.evaluate(() => (window.dataLayer || []).filter(v => Array.isArray(v) && v[0] === "event" && v[1] === "conversion"));
    const internal = () => page.evaluate(() => (window.dataLayer || []).filter(v => v?.event === "phone_click").length);
    const phone = () => page.locator(width < 769 ? ".mobile-call" : '.topbar a[href^="tel:"]');
    const preferences = async () => { await page.getByRole("button", { name: "Çerez Tercihleri", exact: true }).click(); };
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.locator(".cookie-consent").waitFor();
    await phone().click();
    assert.equal((await conversions()).length, 0); assert.equal(await internal(), 0); assert.equal(tagRequests, 0);
    await page.getByRole("button", { name: "Reddet", exact: true }).click();
    await phone().click(); assert.equal((await conversions()).length, 0);
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => localStorage.getItem("ege-bolge-cookie-preference")), "rejected");
    assert.equal(tagRequests, 0);
    await preferences(); await page.getByRole("button", { name: "Tümünü Kabul Et", exact: true }).click();
    await page.waitForFunction(() => window.__qaTagLoaded);
    for (let i = 0; i < 3; i++) { await preferences(); await page.getByRole("button", { name: "Tümünü Kabul Et", exact: true }).click(); }
    assert.equal(tagRequests, 1); assert.equal(await page.locator("#google-ads-gtag").count(), 1);
    assert.deepEqual(await page.evaluate(() => window.dataLayer.filter(v => Array.isArray(v) && v[0] === "config").map(v => v[1])), ["AW-18410577740"]);
    await phone().focus(); await page.keyboard.press("Enter");
    assert.equal((await conversions()).length, 1); assert.equal(await internal(), 1);
    // All visible placements, including each homepage service card and nested icon/text.
    let clicks = 1;
    const phones = page.locator('a[href^="tel:"]');
    for (let i = 0; i < await phones.count(); i++) {
      const link = phones.nth(i);
      assert.equal(await link.getAttribute("href"), "tel:+905332319469");
      if (!await link.isVisible()) continue;
      const before = (await conversions()).length;
      await link.click(); clicks++;
      assert.equal((await conversions()).length, before + 1);
    }
    if (width < 769) {
      await page.locator("button.menu").click(); await page.locator(".mobile-nav-call").click(); clicks++;
      assert.equal(await page.locator("button.menu").getAttribute("aria-expanded"), "false");
      await page.locator(".mobile-call svg").click(); clicks++;
      await page.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(await page.locator(".mobile-call .phone-icon").evaluate(e => getComputedStyle(e).animationName), "none");
    }
    assert.equal((await conversions()).length, clicks);
    for (const event of await conversions()) assert.deepEqual(event, ["event", "conversion", { send_to: destination }]);
    assert.ok((await page.evaluate(() => window.__qaClicks)).every(v => !v.prevented && v.href === "tel:+905332319469"));
    assert.equal(await page.locator('a[href*="wa.me"]').count(), 0);
    await page.reload({ waitUntil: "networkidle" }); await page.waitForFunction(() => window.__qaTagLoaded);
    assert.equal(tagRequests, 2); assert.equal(await page.locator("#google-ads-gtag").count(), 1);
    await phone().click(); assert.equal((await conversions()).length, 1);
    await preferences();
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle" }), page.getByRole("button", { name: "Reddet", exact: true }).click()]);
    assert.equal(await page.evaluate(() => localStorage.getItem("ege-bolge-cookie-preference")), "rejected");
    await phone().click(); assert.equal((await conversions()).length, 0); assert.equal(await internal(), 0);
    assert.equal(await page.locator("#google-ads-gtag").count(), 0); assert.equal(tagRequests, 2);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ path, width, acceptedClicks: clicks + 1, eventsPerClick: 1, beforeRejectedRevoked: 0, tagOncePerAcceptedDocument: true, normalDialingPreserved: true, errors }));
    await context.close();
  }
} finally { await browser.close(); }
