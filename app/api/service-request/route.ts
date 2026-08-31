import { NextResponse } from "next/server";
import { AREAS, COMPANY, SERVICES } from "../../../lib/data";

const PRODUCTION_ORIGINS = new Set([
  "https://www.egebolgeteknikservis.com",
  "https://egebolgeteknikservis.com",
]);

const ALLOWED_DISTRICTS = new Set<string>(AREAS);
const ALLOWED_DEVICES = new Set<string>(
  SERVICES.map((service) => service.name),
);

const text = (value: unknown, max = 500) =>
  String(value ?? "").trim().slice(0, max);

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  // Origin başlığı olmayan sunucu, sağlık kontrolü ve aynı-site istekleri.
  if (!origin) return true;

  if (PRODUCTION_ORIGINS.has(origin)) return true;

  try {
    const originUrl = new URL(origin);
    const requestHost = request.headers.get("host");

    // Vercel preview deployment'ları ve aynı-origin istekleri.
    if (
      requestHost &&
      originUrl.host === requestHost &&
      (originUrl.protocol === "https:" ||
        process.env.NODE_ENV !== "production")
    ) {
      return true;
    }

    // Sadece yerel geliştirme ortamı.
    return (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" ||
        originUrl.hostname === "127.0.0.1")
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { message: "Bu istek kabul edilmedi." },
        { status: 403 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;

    // Botların doldurması beklenen görünmez honeypot alanı.
    if (text(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const phone = text(body.phone, 32).replace(/\D/g, "");
    const district = text(body.district, 100);
    const device = text(body.device, 100);

    if (
      phone.length < 10 ||
      !district ||
      !device ||
      body.consent !== "on"
    ) {
      return NextResponse.json(
        { message: "Lütfen zorunlu alanları kontrol edin." },
        { status: 400 },
      );
    }

    if (
      !ALLOWED_DISTRICTS.has(district) ||
      !ALLOWED_DEVICES.has(device)
    ) {
      return NextResponse.json(
        { message: "Geçersiz ilçe veya cihaz seçimi." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { message: "Form gönderimi henüz etkinleştirilmedi." },
        { status: 503 },
      );
    }

    const fields: Array<[string, string]> = [
      ["Ad Soyad", text(body.name, 120) || "Belirtilmedi"],
      ["Telefon", phone],
      ["İlçe", district],
      ["Cihaz Türü", device],
      ["Marka", text(body.brand, 100) || "Belirtilmedi"],
      [
        "Arıza Açıklaması",
        text(body.description) || "Belirtilmedi",
      ],
    ];

    const html = [
      "<h2>Yeni servis talebi</h2>",
      "<table>",
      fields
        .map(
          ([key, value]) =>
            `<tr><td><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join(""),
      "</table>",
    ].join("");

    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ||
          "Ege Bölge Teknik Servis <onboarding@resend.dev>",
        to: [
          process.env.CONTACT_TO_EMAIL || COMPANY.serviceEmail,
        ],
        reply_to:
          process.env.CONTACT_REPLY_TO_EMAIL ||
          COMPANY.serviceEmail,
        subject: `Yeni servis talebi — ${device} / ${district}`,
        html,
      }),
    });

    if (!resend.ok) {
      return NextResponse.json(
        {
          message:
            "Talep gönderilemedi. Lütfen telefon veya WhatsApp üzerinden ulaşın.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Talep gönderilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
