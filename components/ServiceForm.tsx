"use client";
import { FormEvent, useState } from "react";
import { SERVICES, AREAS } from "../lib/data";
import { trackEvent } from "../lib/analytics";

export function ServiceForm() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone") || "").replace(/\D/g, "");
    if (phone.length < 10 || !form.get("device") || !form.get("district") || !form.get("consent")) { setError("Lütfen telefon, cihaz türü, ilçe ve KVKK onayını kontrol edin."); return; }
    setSending(true); setError(""); setSuccess(false);
    try {
      const response = await fetch("/api/service-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      trackEvent("service_form_submit", { placement: "form" });
      setSuccess(true); event.currentTarget.reset();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Talep gönderilemedi. Lütfen tekrar deneyin."); }
    finally { setSending(false); }
  }
  return <form className="request-form" onFocus={() => trackEvent("service_form_start", { placement: "form" })} onSubmit={submit} noValidate>
    <div className="form-honeypot" aria-hidden="true">
      <label htmlFor="service-website">Web sitesi</label>
      <input
        id="service-website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
    <div className="two-col"><label>Ad Soyad<input name="name" autoComplete="name" /></label><label>Telefon *<input name="phone" inputMode="tel" autoComplete="tel" required /></label></div>
    <div className="two-col"><label>İlçe *<select name="district" required defaultValue=""><option value="" disabled>İlçe seçin</option>{AREAS.map(x => <option key={x}>{x}</option>)}</select></label><label>Cihaz Türü *<select name="device" required defaultValue=""><option value="" disabled>Cihaz seçin</option>{SERVICES.map(x => <option key={x.slug}>{x.name}</option>)}</select></label></div>
    <label>Marka<input name="brand" /></label><label>Arıza Açıklaması<textarea name="description" rows={4} /></label>
    <label className="consent"><input name="consent" type="checkbox" required /><span>Kişisel verilerimin servis talebimin değerlendirilmesi amacıyla işlenmesini kabul ediyorum. <a href="/kvkk">KVKK</a></span></label>
    {error && <p role="alert" className="form-error">{error}</p>}{success && <p role="status" className="form-success">Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.</p>}
    <button className="button amber" disabled={sending}>{sending ? "Gönderiliyor…" : "Servis Talebi Gönder"}</button>
  </form>;
}
