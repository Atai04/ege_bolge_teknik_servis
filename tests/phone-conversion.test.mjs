import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
const require = createRequire(import.meta.url);

// Execute the real effect through a tiny hook/DOM harness, including React cleanup replay.
function mount(preference, ready = true) {
  const effects = [], calls = [], listeners = new Set();
  let stored = preference, stateIndex = 0;
  const document = {
    addEventListener: (type, listener) => { if (type === "click") listeners.add(listener); },
    removeEventListener: (type, listener) => { if (type === "click") listeners.delete(listener); },
  };
  class Element {
    constructor(href) { this.href = href; }
    closest() { return this.href === null ? null : { getAttribute: () => this.href }; }
  }
  const window = { localStorage: { getItem: () => stored }, gtag: (...args) => calls.push(args) };
  const compiledModule = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync("components/CookieConsent.tsx", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(source, { module: compiledModule, exports: compiledModule.exports, window, document, Element,
    require: id => id === "react" ? {
      useState: () => [[preference, ready, false][stateIndex++], () => {}],
      useEffect: callback => effects.push(callback),
    } : id === "../lib/data" ? { COMPANY: { phoneHref: "tel:+905332319469" } } : require(id),
  });
  compiledModule.exports.CookieConsent();
  return { calls, listeners, setup: effects[2], setConsent: value => { stored = value; }, click: href => {
    const event = { target: new Element(href), preventDefault: () => assert.fail("must not block dialing") };
    for (const listener of listeners) listener(event);
  } };
}

test("real conversion effect respects consent, exact href, and cleanup replay", () => {
  for (const preference of [null, "rejected"]) {
    const harness = mount(preference); harness.setup(); harness.click("tel:+905332319469");
    assert.equal(harness.calls.length, 0);
  }
  const pending = mount("accepted", false); pending.setup(); pending.click("tel:+905332319469");
  assert.equal(pending.calls.length, 0);
  const harness = mount("accepted");
  for (let i = 0; i < 5; i++) { const cleanup = harness.setup(); cleanup(); }
  const cleanup = harness.setup();
  assert.equal(harness.listeners.size, 1);
  for (const href of [null, "tel:+900000000000", "tel:+905332319469?x=1", "TEL:+905332319469", "/iletisim"]) harness.click(href);
  assert.equal(harness.calls.length, 0);
  harness.click("tel:+905332319469");
  assert.equal(harness.calls.length, 1);
  assert.equal(JSON.stringify(harness.calls[0]), JSON.stringify(["event", "conversion", { send_to: "AW-18410577740/WXDGCL6J55IdEMy-7MpE" }]));
  harness.setConsent("rejected"); harness.click("tel:+905332319469");
  assert.equal(harness.calls.length, 1, "withdrawal blocks even before effect cleanup");
  cleanup(); assert.equal(harness.listeners.size, 0);
});
