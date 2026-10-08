import { ServiceAreas, ProvinceSummary } from "../../components/ServiceAreas";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPANY, SERVICES, SERVICE_VISUALS } from "../../lib/data";
import { SERVICE_LANDINGS } from "../../lib/service-landings";
import { ServiceVisual } from "../../components/ServiceVisual";
import { BrandDirectory } from "../../components/BrandDirectory";

import { PAGE_ROUTES, resolvePageRoute } from "../../lib/routes";
import { getBrandsForService } from "../../lib/brands";
import { BrandPage } from "../../components/BrandPage";
import { ServiceActions } from "../../components/ServiceActions";
import { buildPageMetadata } from "../../lib/seo";
import { ServiceSchema } from "../../components/ServiceSchema";

export function generateStaticParams() {
  return PAGE_ROUTES.map(route => ({ slug: route.slug.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const route = resolvePageRoute(path);
  if (!route) notFound();
  if (route.kind === "brand") {
    const { brand } = route;
    return buildPageMetadata({
      title: brand.seoTitle,
      description: brand.seoDescription,
      path: `/${brand.slug}`,
    });
  }
  if (route.kind === "service") {
    const { service } = route;
    const visual = SERVICE_VISUALS[service.visual];
    const landing = SERVICE_LANDINGS[service.slug];
    return buildPageMetadata({
      title: landing.title,
      description: landing.description,
      path: `/${service.slug}`,
      image: { url: visual.src, alt: visual.alt },
    });
  }
  const meta = route.metadata;
  return buildPageMetadata({ title: meta[0], description: meta[1], path: `/${path}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  const route = resolvePageRoute(path);
  if (!route) notFound();
  if (route.kind === "brand") return <BrandPage brand={route.brand} />;
  if (route.kind === "service") return <Service service={route.service} />;
  if (path === "gizlilik-politikasi") return <PrivacyPolicy />;
  if (path === "cerez-politikasi") return <CookiePolicy />;
  if (path === "markalar") return <section className="section container"><BrandDirectory headingLevel={1} /></section>;
  if (path === "hizmet-bolgeleri") return <ServiceAreas />;
  if (path === "hakkimizda") return <About />;
  if (path === "iletisim") return <Contact />;
  notFound();
}

function Contact() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
  return <section className="section container"><div className="section-heading"><p className="eyebrow">İletişim</p><h1>Servis için bize ulaşın</h1><p className="lead">Servis hakkında bilgi almak için bizi arayabilirsiniz. E-posta ikincil iletişim seçeneğidir.</p></div><div className="contact-card"><p><strong>Telefon:</strong> <a className="text-link" href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a></p><p><strong>E-posta:</strong> <a className="text-link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p><p><strong>Adres:</strong> {COMPANY.address}</p><p><strong>{COMPANY.contactAvailability}</strong></p><p>İşletme adresimiz Buca / İzmir’dedir. Aydın hizmet bölgemizdir; Aydın’da şubemiz bulunmamaktadır.</p><p><a className="text-link" href="/hizmet-bolgeleri">İzmir ve Aydın hizmet bölgelerini inceleyin</a></p><a className="button outline" href={directionsUrl}>Yol Tarifi Al</a></div></section>;
}

function About() {
  return <section className="section container article">
    <p className="eyebrow">Ege Bölge Teknik Servis</p><h1>Hakkımızda</h1>
    <p className="lead small">Ege Bölge Teknik Servis Hizmetleri, İzmir ve Aydın’da bağımsız özel teknik servis hizmeti sunar. İşletme adresimiz Buca / İzmir’dedir; Aydın’da şubemiz bulunmamaktadır.</p>
    <h2>Hangi cihazlar için bize ulaşabilirsiniz?</h2>
    <p>Beyaz eşya, klima, kombi, televizyon, ısı pompası ve VRF sistemleri için servis talebinizi paylaşabilirsiniz. Cihazınıza ilişkin yapılabilecek işlemler, cihaz bilgisi ve durumu değerlendirilerek netleştirilir.</p>
    <p><a className="text-link" href="/#hizmetler">Hizmetlerimizi inceleyin</a> veya <a className="text-link" href="/hizmet-bolgeleri">hizmet bölgelerimizi kontrol edin</a>.</p>
    <h2>İletişim ve bilgilendirme</h2>
    <p>7/24 çağrı merkezimize cihazınızın marka/modelini, arıza belirtisini ve bulunduğunuz ilçeyi iletebilirsiniz. Görüşmede servis talebinizin kapsamını ve sonraki adımları sorabilirsiniz. E-posta ikincil iletişim seçeneğidir.</p>
    <ServiceActions /><p><a className="text-link" href="/iletisim">İletişim bilgilerimiz</a></p>
    <p className="disclaimer light-disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servistir. Listelenen markaların yetkili servisi değildir.</p>
  </section>;
}

function PrivacyPolicy() {
  return <section className="section container article"><p className="eyebrow">Gizlilik</p><h1>Gizlilik Politikası</h1><p className="lead small">Bu sitede çevrimiçi servis talep formu bulunmaz; site üzerinden ad, telefon numarası veya arıza açıklaması toplanmaz.</p><h2>İletişim kanalları</h2><p>Telefon veya e-posta üzerinden kendi isteğinizle paylaştığınız bilgiler, yalnızca doğrudan iletişim kurmak ve talebinize yanıt vermek amacıyla kullanılır.</p><h2>Çerezler</h2><p>Zorunlu olmayan Google Ads çerezleri yalnızca açık tercih vermenizden sonra etkinleştirilir. Ayrıntılar için <a className="text-link" href="/cerez-politikasi">Çerez Politikası</a> sayfasını inceleyebilirsiniz.</p><p>Bu metin genel bilgilendirme amacı taşır; hukukî danışmanlık değildir.</p></section>;
}

function CookiePolicy() {
  return <section className="section container article"><p className="eyebrow">Çerezler</p><h1>Çerez Politikası</h1><p className="lead small">Site, çerez tercihinizi tarayıcınızın yerel depolamasında saklar. Bu tercih, zorunlu olmayan Google Ads etiketinin yüklenip yüklenmeyeceğini belirler.</p><h2>Tercih yönetimi</h2><p>İlk ziyaretinizde Kabul Et veya Reddet seçeneklerinden birini seçebilirsiniz. Tercihinizi footer’daki Çerez Tercihleri düğmesinden istediğiniz zaman değiştirebilirsiniz.</p><h2>Google Ads</h2><p>Google Ads etiketi yalnızca açık izninizden sonra yüklenir. Reddetmeniz halinde etiket yüklenmez; daha sonra reddetmeniz gerektiğinde sayfa yenilenerek bu tercih uygulanır.</p><p>Bu metin genel bilgilendirme amacı taşır; hukukî danışmanlık değildir.</p></section>;
}

function Service({ service }: { service: (typeof SERVICES)[number] }) {
  const landing = SERVICE_LANDINGS[service.slug];
  const brands = getBrandsForService(service.slug);
  const applianceSlugs: readonly string[] = ["beyaz-esya-servisi", "buzdolabi-servisi", "camasir-makinesi-servisi", "bulasik-makinesi-servisi", "kurutma-makinesi-servisi"];
  const related = applianceSlugs.includes(service.slug)
    ? SERVICES.filter(item => applianceSlugs.includes(item.slug) && item.slug !== service.slug)
    : [];

  return <div className="service-landing">
    <ServiceSchema service={service} />
    <section className="service-hero">
      <div className="container service-hero-grid">
        <div>
          <p className="eyebrow">{landing.eyebrow}</p>
          <p className="breadcrumb"><a href="/">Ana Sayfa</a> / {service.name}</p>
          <h1>{landing.heading}</h1>
          <p className="lead">{landing.intro}</p>
          <ServiceActions />
          <p className="disclaimer light-disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servistir. Listelenen markaların yetkili servisi değildir.</p>
        </div>
        <div className="service-hero-image"><ServiceVisual visual={service.visual} priority /></div>
      </div>
    </section>

    <>
      <section className="section container" aria-labelledby="service-issues-title">
        {landing.serviceGroup && <div className="service-options">
          <div className="section-heading"><h2>{landing.serviceGroup.title}</h2></div>
          <ul className="service-issues">
            {landing.serviceGroup.slugs.map(slug => {
              const item = SERVICES.find(candidate => candidate.slug === slug);
              return item && <li key={item.slug}><a href={`/${item.slug}`}>{item.name}<span aria-hidden="true"> →</span></a></li>;
            })}
          </ul>
        </div>}
        <div className="section-heading">
          <h2 id="service-issues-title">{landing.issuesTitle}</h2>
          <p>{landing.issuesIntro}</p>
        </div>
        <ul className="service-issues">{landing.issues.map(issue => <li key={issue}>{issue}</li>)}</ul>
      </section>
      <section className="service-details" aria-labelledby="service-details-title">
        <div className="container service-details-copy">
          <h2 id="service-details-title">{landing.detailsTitle}</h2>
          {landing.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="area-section" aria-labelledby="service-areas-title">
        <div className="container area-layout">
          <div><h2 id="service-areas-title">{landing.areasTitle}</h2>
            <p>Bulunduğunuz il ve ilçeyi, cihazınızı ve yaşadığınız sorunu paylaşarak servis talebinizi iletebilirsiniz.</p>
            <a className="button white-outline" href="/hizmet-bolgeleri">Tüm hizmet bölgelerini incele</a>
          </div><ProvinceSummary />
        </div>
      </section>
    </>
    {related.length > 0 && !landing.serviceGroup && <section className="section container" aria-labelledby="related-services-title">
      <h2 id="related-services-title">Diğer beyaz eşya hizmetleri</h2>
      <div className="related-links">{related.map(item => <a key={item.slug} href={`/${item.slug}`}>{item.name} →</a>)}</div>
    </section>}

    {brands.length > 0 && <section className="section container"><BrandDirectory brands={brands} heading="Servis Verdiğimiz Markalar" /></section>}

    <section className="contact-section">
      <div className="container contact-section__inner">
        <div>
          <p className="eyebrow">İletişim</p>
          <h2>{landing.contactTitle}</h2>
          <p>{landing.contactText}</p>
        </div>
        <ServiceActions />
      </div>
    </section>
  </div>;
}
