import { NextResponse } from "next/server";
import { COMPANY } from "../../../lib/data";

const text = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const phone = text(body.phone, 32).replace(/\D/g, "");
    const district = text(body.district, 100);
    const device = text(body.device, 100);
    if (phone.length < 10 || !district || !device || body.consent !== "on") return NextResponse.json({ message: "Lütfen zorunlu alanları kontrol edin." }, { status: 400 });
    if (!process.env.RESEND_API_KEY) return NextResponse.json({ message: "Form gönderimi henüz etkinleştirilmedi." }, { status: 503 });
    const fields = [["Ad Soyad", text(body.name, 120) || "Belirtilmedi"],["Telefon", phone],["İlçe", district],["Cihaz Türü", device],["Marka", text(body.brand, 100) || "Belirtilmedi"],["Arıza Açıklaması", text(body.description) || "Belirtilmedi"]];
    const html = `<h2>Yeni servis talebi</h2><table>${fields.map(([key, value]) => `<tr><td><strong>${key}</strong></td><td>${escapeHtml(value)}</td></tr>`).join("")}</table>`;
    const resend = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL || "Ege Bölge Teknik Servis <onboarding@resend.dev>", to: [process.env.CONTACT_TO_EMAIL || COMPANY.serviceEmail], reply_to: process.env.CONTACT_REPLY_TO_EMAIL || COMPANY.serviceEmail, subject: `Yeni servis talebi — ${device} / ${district}`, html }) });
    if (!resend.ok) return NextResponse.json({ message: "Talep gönderilemedi. Lütfen telefon veya WhatsApp üzerinden ulaşın." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ message: "Talep gönderilemedi. Lütfen tekrar deneyin." }, { status: 500 }); }
}
