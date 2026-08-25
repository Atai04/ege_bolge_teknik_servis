# Ege Bölge Teknik Servis Hizmetleri

İzmir için hazırlanan, mobil dönüşüm ve yerel arama görünürlüğü odaklı teknik servis sitesi.

## Çalıştırma

`npm ci` ardından `npm run dev` komutunu kullanın. Üretim kontrolü için `npm run build` ve `npm run lint` çalıştırın.

## Yapı

- `lib/data.ts`: şirket, hizmet, marka ve bölge için tek veri kaynağı
- `components/`: ortak header, footer ve servis talep formu
- `app/[...slug]/page.tsx`: hizmet, iletişim, marka, bölge ve yasal sayfalar
- `app/sitemap.ts` ve `app/robots.ts`: arama motoru yapılandırması
- `lib/analytics.ts`: telefon, WhatsApp, form ve yol tarifi olayları için ortak takip arayüzü

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayın. GTM/GA4 kimliklerini yalnızca yayın öncesinde ekleyin. Form göndermek için seçilen e-posta/CRM sağlayıcısına ait sunucu tarafı entegrasyonu ve `RESEND_API_KEY` gibi gerekli değerler eklenmelidir.

## Yayın

Vercel'e bağlayın, ortam değişkenlerini ekleyin ve alan adını `egebolgeteknikservis.com` olarak ilişkilendirin. Yayından sonra Search Console'a sitemap URL'sini gönderin: `/sitemap.xml`.

## Manuel tamamlanacaklar

- Servis talep formunu Resend, Telegram, Supabase veya CRM sunucu entegrasyonuna bağlayın.
- Gerçek işletme fotoğraflarını `public/` altına ekleyip yerleştirin.
- KVKK metnindeki teyit gerektiren veri sorumlusu/başvuru detaylarını hukuk danışmanıyla tamamlayın.
- GTM içinde `phone_click`, `whatsapp_click`, `service_form_start`, `service_form_submit` ve `directions_click` olaylarını dönüşüme bağlayın.
