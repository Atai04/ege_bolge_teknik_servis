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

## Marka sayfaları

`lib/brands.ts`, işletme tarafından doğrulanan mevcut 28 markanın açıkça yazılmış URL slug'larını, Türkçe içeriklerini ve SEO alanlarını tutar. `lib/data.ts`, mevcut importlar için `BRAND_DIRECTORY` dışa aktarımını korur. Marka desteği onaylanmıştır; marka/hizmet kategorisi eşleşmeleri henüz onaylanmamıştır. Bu nedenle `supportedServices` listeleri bilinçli olarak boştur. Boş liste, kategorinin desteklenmediği anlamına gelmez.

Bir kategori eşleşmesi işletme tarafından doğrulandığında ilgili `brand(...)` kaydının son, isteğe bağlı `supportedServices` parametresine mevcut `SERVICES` slug'ları eklenir. Marka sayfasındaki hizmet bağlantıları ve hizmet sayfasındaki marka dizini aynı eşleşmeyi kullanır. Üreticinin ürün gamından hizmet kapsamı çıkarılmamalıdır. Marka slug'ları mevcut URL'lerdir; marka adından çalışma anında üretilmemeli veya yeniden adlandırılmamalıdır.

`lib/routes.ts`, bilgi, hizmet ve marka sayfalarının ortak kayıt defteridir. Sayfa çözümleme, statik parametreler ve sitemap bu kaynaktan beslenir; çakışan yollar derlemeyi durdurur. Gelecekteki sayfa türleri de aynı kayıt defterine eklenmelidir. `components/BrandPage.tsx` tüm markalar için tek sunucu şablonudur; `ServiceActions` mevcut telefon/WhatsApp bağlantılarını korur. Marka sayfaları yalnızca breadcrumb yapılandırılmış verisi ekler; üretici yetkisi veya kategori kapsamı iddia etmez.

Marka ve rota regresyon kontrolleri: `node --test tests/brand-architecture.test.mjs`. Bu kontroller mevcut TypeScript bağımlılığıyla bellekte derlenir. Ardından `npm run lint`, `npx tsc --noEmit --incremental false` ve `npm run build` çalıştırılmalıdır.

## İletişim ve çerezler

Site çevrimiçi servis talep formu toplamaz. İletişim e-posta, telefon ve WhatsApp üzerinden sağlanır. Google Ads etiketi (`AW-18410577740`) yalnızca kullanıcı açık çerez tercihi verdikten sonra yüklenir; tercih tarayıcı yerel depolamasında tutulur.

## Yayın

Vercel’de `www.egebolgeteknikservis.com` birincil domain olarak yapılandırılmalıdır. Kök domain yönlendirmesini Vercel domain ayarları yönetir; uygulama içinde ayrıca redirect kuralı eklemeyin. Search Console için sitemap adresi: `https://www.egebolgeteknikservis.com/sitemap.xml`.
