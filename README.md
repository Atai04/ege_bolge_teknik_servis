# Ege Bölge Teknik Servis Hizmetleri

İzmir için hazırlanan, mobil dönüşüm ve yerel arama görünürlüğü odaklı teknik servis sitesi.

## Çalıştırma

`npm ci` ardından `npm run dev` komutunu kullanın. Üretim kontrolü için `npm run build` ve `npm run lint` çalıştırın.

## Yapı

- `lib/data.ts`: şirket, hizmet, marka ve bölge için tek veri kaynağı
- `components/`: ortak header, footer, görsel ve çerez tercih bileşenleri
- `app/[...slug]/page.tsx`: hizmet, iletişim, marka, bölge ve yasal sayfalar
- `app/sitemap.ts` ve `app/robots.ts`: arama motoru yapılandırması
- `lib/analytics.ts`: izin verildikten sonra telefon ve WhatsApp olayları için takip arayüzü

## İletişim ve çerezler

Site çevrimiçi servis talep formu toplamaz. İletişim e-posta, telefon ve WhatsApp üzerinden sağlanır. Google Ads etiketi (`AW-18410577740`) yalnızca kullanıcı açık çerez tercihi verdikten sonra yüklenir; tercih tarayıcı yerel depolamasında tutulur.

## Yayın

Vercel’de `www.egebolgeteknikservis.com` birincil domain olarak yapılandırılmalıdır. Kök domain yönlendirmesini Vercel domain ayarları yönetir; uygulama içinde ayrıca redirect kuralı eklemeyin. Search Console için sitemap adresi: `https://www.egebolgeteknikservis.com/sitemap.xml`.
