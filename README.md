# Ege Bölge Teknik Servis Hizmetleri

İzmir için hazırlanan, mobil dönüşüm ve yerel arama görünürlüğü odaklı teknik servis sitesi.

## Çalıştırma

`npm ci` ardından `npm run dev` komutunu kullanın. Üretim kontrolü için `npm run build` ve `npm run lint` çalıştırın.

## Yapı

- `lib/data.ts`: şirket, hizmet, marka ve bölge için tek veri kaynağı
- `components/`: ortak header, footer, görsel ve çerez tercih bileşenleri
- `app/[...slug]/page.tsx`: hizmet, iletişim, marka, bölge ve yasal sayfalar
- `app/sitemap.ts` ve `app/robots.ts`: arama motoru yapılandırması
- `lib/analytics.ts`: izin verildikten sonra iç `phone_click` olayları için takip arayüzü

## Marka sayfaları

`lib/brands.ts`, işletme tarafından doğrulanan mevcut 28 markanın açıkça yazılmış URL slug'larını, Türkçe içeriklerini ve SEO alanlarını tutar. `lib/data.ts`, mevcut importlar için `BRAND_DIRECTORY` dışa aktarımını korur. Marka desteği onaylanmıştır; marka/hizmet kategorisi eşleşmeleri henüz onaylanmamıştır. Bu nedenle `supportedServices` listeleri bilinçli olarak boştur. Boş liste, kategorinin desteklenmediği anlamına gelmez.

Bir kategori eşleşmesi işletme tarafından doğrulandığında ilgili `brand(...)` kaydının son, isteğe bağlı `supportedServices` parametresine mevcut `SERVICES` slug'ları eklenir. Marka sayfasındaki hizmet bağlantıları ve hizmet sayfasındaki marka dizini aynı eşleşmeyi kullanır. Üreticinin ürün gamından hizmet kapsamı çıkarılmamalıdır. Marka slug'ları mevcut URL'lerdir; marka adından çalışma anında üretilmemeli veya yeniden adlandırılmamalıdır.

`lib/routes.ts`, bilgi, hizmet ve marka sayfalarının ortak kayıt defteridir. Sayfa çözümleme, statik parametreler ve sitemap bu kaynaktan beslenir; çakışan yollar derlemeyi durdurur. Gelecekteki sayfa türleri de aynı kayıt defterine eklenmelidir. `components/BrandPage.tsx` tüm markalar için tek sunucu şablonudur; `ServiceActions` yerel `tel:` bağlantısıyla telefon aramasını sunar. Marka sayfaları yalnızca breadcrumb yapılandırılmış verisi ekler; üretici yetkisi veya kategori kapsamı iddia etmez.

Marka ve rota regresyon kontrolleri: `node --test tests/brand-architecture.test.mjs`. Bu kontroller mevcut TypeScript bağımlılığıyla bellekte derlenir. Ardından `npm run lint`, `npx tsc --noEmit --incremental false` ve `npm run build` çalıştırılmalıdır.

## Hizmet kapsamı ve çalışma saatleri

İzmir’in 30 idari ilçesinin 27’sinde hizmet verilir. Yalnızca Beydağ, Kiraz ve Ödemiş kapsam dışıdır. Aydın’ın 17 ilçesinde hizmet verilir; toplam 44 hizmet ilçesi vardır. Aydın hizmet bölgesidir; fiziksel işletme adresi Buca / İzmir olarak kalır.

Çalışma saatleri: **Her gün 08:00–22:00**. Görünür saatler ve LocalBusiness saatleri `lib/data.ts` içindeki ortak saat verisinden üretilir.

## İletişim ve çerezler

Site çevrimiçi servis talep formu toplamaz. Birincil iletişim telefon, ikincil iletişim e-postadır. WhatsApp arayüzü, eski dönüşüm dinleyicisi ve kullanılmayan şirket verisi kaldırılmıştır. Google Ads etiketi (`AW-18410577740`) yalnızca kullanıcı açık çerez tercihi verdikten sonra yüklenir; tercih tarayıcı yerel depolamasında tutulur.

Kabul edilmiş izinle tam olarak `tel:+905332319469` bağlantısına tıklamak, merkezi dinleyicide bir `conversion` olayı üretir: `send_to: AW-18410577740/WXDGCL6J55IdEMy-7MpE` (Web Sitesi Telefon Araması). Bu olay tıklamayı ölçer; görüşmenin gerçekleştiğini doğrulamaz. Sabit 1 TRY değeri Google Ads işlem ayarlarından gelir; olayda `value` veya `currency` gönderilmez. Telefon bağlantısının varsayılan davranışı değiştirilmez.

İzin verilmeden, ret durumunda veya izin geri alındığında dönüşüm gönderilmez. Geri alma mevcut yeniden yükleme davranışını korur; dinleyici her tıklamada güncel tercihi de kontrol eder. Üst şerit ve mobil butondaki iç `phone_click` olayları ayrı kalır. Etiket ve dinleyici çoğaltılmaz; React effect temizliği dinleyiciyi kaldırır.

## Telefon arayüzü kontrolleri

`node --test tests/*.test.mjs` tüm kaynak regresyonlarını çalıştırır. `tests/fixtures/phase4-baseline.json`, Phase 4 öncesindeki korunan kaynakların doğrulama özetlerini tutar; şirket verisinde yalnızca kullanılmayan WhatsApp alanının kaldırılmasına izin verir. Phase 3 özeti tarihsel kayıt olarak korunur.

`tests/phone-contact.browser.mjs`, yerel üretim sunucusunda çerez kabul/ret ve telefon bağlantılarını kontrol eder. Mevcut haricî Playwright kurulumu `PLAYWRIGHT_MODULE`, tarayıcı dizini `PLAYWRIGHT_BROWSERS_PATH`, yerel sunucu `EBTS_QA_URL` ile belirtilebilir. Test Ads isteklerini taklit eder ve `tel:` navigasyonunu engeller; gerçek arama veya dönüşüm göndermez. Projeye tarayıcı bağımlılığı eklenmemiştir.

## Yayın

Vercel’de `www.egebolgeteknikservis.com` birincil domain olarak yapılandırılmalıdır. Kök domain yönlendirmesini Vercel domain ayarları yönetir; uygulama içinde ayrıca redirect kuralı eklemeyin. Search Console için sitemap adresi: `https://www.egebolgeteknikservis.com/sitemap.xml`.
