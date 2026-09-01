"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ege-bolge-cookie-preference";
const GOOGLE_ADS_TAG_ID = "AW-18410577740";
type Preference = "accepted" | "rejected" | null;

export function CookieConsent() {
  const [preference, setPreference] = useState<Preference>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const timer = window.setTimeout(() => {
      if (stored === "accepted" || stored === "rejected") setPreference(stored);
      else setOpen(true);
      setReady(true);
    }, 0);

    const showPreferences = () => setOpen(true);
    window.addEventListener("open-cookie-preferences", showPreferences);
    return () => { window.clearTimeout(timer); window.removeEventListener("open-cookie-preferences", showPreferences); };
  }, []);

  function choose(nextPreference: Exclude<Preference, null>) {
    const changedFromAccepted = preference === "accepted" && nextPreference === "rejected";
    window.localStorage.setItem(STORAGE_KEY, nextPreference);
    setPreference(nextPreference);
    setOpen(false);
    if (changedFromAccepted) window.location.reload();
  }

  return <>
    {ready && preference === "accepted" && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`} strategy="afterInteractive" />
      <Script id="google-ads-tag" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GOOGLE_ADS_TAG_ID}');`}</Script>
    </>}
    {open && <section className="cookie-consent" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-description">
      <div className="cookie-consent__content">
        <h2 id="cookie-consent-title">Çerez tercihleri</h2>
        <p id="cookie-consent-description">Zorunlu olmayan Google Ads çerezleri yalnızca izin verirseniz kullanılır. Tercihinizi dilediğiniz zaman footer’daki Çerez Tercihleri bağlantısından değiştirebilirsiniz.</p>
        <div className="cookie-consent__actions"><button className="button orange" type="button" onClick={() => choose("accepted")}>Tümünü Kabul Et</button><button className="button outline" type="button" onClick={() => choose("rejected")}>Reddet</button></div>
      </div>
    </section>}
  </>;
}
