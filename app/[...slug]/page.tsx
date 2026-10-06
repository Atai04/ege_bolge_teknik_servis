import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS, COMPANY, SERVICES, SERVICE_VISUALS } from "../../lib/data";
import { SERVICE_LANDINGS } from "../../lib/service-landings";
import { ServiceVisual } from "../../components/ServiceVisual";
import { BrandDirectory } from "../../components/BrandDirectory";

import { PAGE_ROUTES, resolvePageRoute } from "../../lib/routes";
import { getBrandsForService } from "../../lib/brands";
import { BrandPage } from "../../components/BrandPage";
import { ServiceActions } from "../../components/ServiceActions";

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
    const title = brand.seoTitle;
    const description = brand.seoDescription;
    const canonical = `/${brand.slug}`;
    return { title, description, alternates: { canonical },
      openGraph: { title, description, url: canonical, type: "website", locale: "tr_TR", images: [{ url: "/og.png", width: 1200, height: 630, alt: COMPANY.name }] },
      twitter: { card: "summary_large_image", title, description, images: ["/og.png"] } };
  }
  if (route.kind === "service") {
    const { service } = route;
    const visual = SERVICE_VISUALS[service.visual];
    const landing = SERVICE_LANDINGS[service.slug];
    const title = landing?.title ?? `İzmir ${service.name} | Ege Bölge Teknik Servis`;
    const description = landing?.description ?? `${service.description} Buca ve İzmir genelinde iletişim için bize ulaşın.`;
    return { title, description, alternates: { canonical: `/${service.slug}` }, openGraph: { title, description, images: [{ url: visual.src, alt: visual.alt }] }, twitter: { title, description, images: [visual.src] } };
  }
  const meta = route.metadata;
  return meta ? { title: meta[0], description: meta[1], alternates: { canonical: `/${path}` }, openGraph: { title: meta[0], description: meta[1] } } : {};
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
  if (path === "hizmet-bolgeleri") return <Article title="İzmir Hizmet Bölgeleri" text="İzmir'in birçok ilçesinde servis hizmeti sunuyoruz. Beydağ, Kiraz ve Ödemiş bölgelerinde şu anda servis hizmeti verilmemektedir." chips={AREAS} />;
  if (path === "hakkimizda") return <Article title="Hakkımızda" text="Ege Bölge Teknik Servis Hizmetleri; İzmir'de beyaz eşya, klima, kombi, TV, ısı pompası ve VRF sistemleri için bağımsız özel teknik servis hizmeti sunar. Cihaz türü ve arıza bilgisine göre uygun teknik destek planlanır." />;
  if (path === "iletisim") return <Contact />;
  notFound();
}

function Contact() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`;
  return <section className="section container"><div className="section-heading"><p className="eyebrow">İletişim</p><h1>Servis için bize ulaşın</h1><p className="lead">İletişim talebiniz için öncelikle WhatsApp veya telefon kanalını kullanabilirsiniz. E-posta ikincil iletişim seçeneğidir.</p></div><div className="contact-card"><p><strong>WhatsApp:</strong> <a className="text-link" href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp üzerinden yazın</a></p><p><strong>Telefon:</strong> <a className="text-link" href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a></p><p><strong>E-posta:</strong> <a className="text-link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p><p><strong>Adres:</strong> {COMPANY.address}</p><p><strong>Çalışma saatleri:</strong> {COMPANY.hours}</p><a className="button outline" href={directionsUrl}>Yol Tarifi Al</a></div></section>;
}

function Article({ title, text, chips }: { title: string; text: string; chips?: readonly string[] }) {
  return <section className="section container article"><p className="eyebrow">Ege Bölge Teknik Servis</p><h1>{title}</h1><p className="lead small">{text}</p>{chips && <div className="chips">{chips.map(item => <span key={item}>{item}</span>)}</div>}<p className="disclaimer light-disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servis hizmeti sunmaktadır. Listelenen markaların yetkili servisi değildir.</p></section>;
}

function PrivacyPolicy() {
  return <section className="section container article"><p className="eyebrow">Gizlilik</p><h1>Gizlilik Politikası</h1><p className="lead small">Bu sitede çevrimiçi servis talep formu bulunmaz; site üzerinden ad, telefon numarası veya arıza açıklaması toplanmaz.</p><h2>İletişim kanalları</h2><p>Telefon, e-posta veya WhatsApp üzerinden kendi isteğinizle paylaştığınız bilgiler, yalnızca doğrudan iletişim kurmak ve talebinize yanıt vermek amacıyla kullanılır.</p><h2>Çerezler</h2><p>Zorunlu olmayan Google Ads çerezleri yalnızca açık tercih vermenizden sonra etkinleştirilir. Ayrıntılar için <a className="text-link" href="/cerez-politikasi">Çerez Politikası</a> sayfasını inceleyebilirsiniz.</p><p>Bu metin genel bilgilendirme amacı taşır; hukukî danışmanlık değildir.</p></section>;
}

function CookiePolicy() {
  return <section className="section container article"><p className="eyebrow">Çerezler</p><h1>Çerez Politikası</h1><p className="lead small">Site, çerez tercihinizi tarayıcınızın yerel depolamasında saklar. Bu tercih, zorunlu olmayan Google Ads etiketinin yüklenip yüklenmeyeceğini belirler.</p><h2>Tercih yönetimi</h2><p>İlk ziyaretinizde Kabul Et veya Reddet seçeneklerinden birini seçebilirsiniz. Tercihinizi footer’daki Çerez Tercihleri düğmesinden istediğiniz zaman değiştirebilirsiniz.</p><h2>Google Ads</h2><p>Google Ads etiketi yalnızca açık izninizden sonra yüklenir. Reddetmeniz halinde etiket yüklenmez; daha sonra reddetmeniz gerektiğinde sayfa yenilenerek bu tercih uygulanır.</p><p>Bu metin genel bilgilendirme amacı taşır; hukukî danışmanlık değildir.</p></section>;
}

function Service({ service }: { service: (typeof SERVICES)[number] }) {
  const landing = SERVICE_LANDINGS[service.slug];
  const brands = getBrandsForService(service.slug);
  const related = SERVICES.filter(item => item.slug !== service.slug).slice(0, 5);
  const whatsappLabel = landing ? "WhatsApp'tan Ulaşın" : "WhatsApp'tan Yaz";

  return <div className={landing ? "service-landing" : undefined}>
    <section className="service-hero">
      <div className="container service-hero-grid">
        <div>
          <p className="eyebrow">{landing?.eyebrow ?? "İzmir Bağımsız Teknik Servis"}</p>
          <p className="breadcrumb"><a href="/">Ana Sayfa</a> / {service.name}</p>
          <h1>{landing?.heading ?? `İzmir ${service.name}`}</h1>
          <p className="lead">{landing?.intro ?? `${service.description} Cihazınızdaki arıza belirtisi için WhatsApp veya telefon üzerinden bize ulaşabilirsiniz.`}</p>
          <ServiceActions whatsappLabel={whatsappLabel} />
          {landing && <p className="disclaimer light-disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servistir. Listelenen markaların yetkili servisi değildir.</p>}
        </div>
        <div className="service-hero-image"><ServiceVisual visual={service.visual} priority /></div>
      </div>
    </section>

    {landing ? <>
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
        <div className="container">
          <div className="area-layout">
            <div>
              <h2 id="service-areas-title">{landing.areasTitle}</h2>
              <p>Hizmet verilen ilçelerimizi aşağıda bulabilirsiniz. Bulunduğunuz ilçeyi ve cihazınızdaki sorunu paylaşarak servis talebiniz hakkında bilgi alabilirsiniz.</p>
            </div>
            <ul className="service-areas">{AREAS.map(area => <li key={area}>{area}</li>)}</ul>
          </div>
          <p className="area-note">Beydağ, Kiraz ve Ödemiş ilçelerine servis verilmemektedir.</p>
        </div>
      </section>
    </> : <section className="section container split">
      <div>
        <h2>{service.name} hakkında</h2>
        <p>Arıza, bakım veya onarım ihtiyacınız için cihaz ve yaşadığınız sorun hakkında temel bilgiyi WhatsApp veya telefon üzerinden iletebilirsiniz.</p>
        <h2>Yaygın sorunlar</h2>
        <div className="chips"><span>Çalışmıyor</span><span>Ses yapıyor</span><span>Hata kodu veriyor</span><span>Program tamamlamıyor</span></div>
      </div>
      <div>
        <h2>Servis bölgeleri</h2>
        <p>İzmir&apos;in birçok ilçesinde hizmet verilmektedir. Beydağ, Kiraz ve Ödemiş kapsam dışıdır.</p>
        <a href="/hizmet-bolgeleri" className="text-link">Hizmet bölgelerini incele →</a>
        <h2 className="related-title">Diğer hizmetler</h2>
        <div className="related-links">{related.map(item => <a key={item.slug} href={`/${item.slug}`}>{item.short} →</a>)}</div>
      </div>
    </section>}

    {brands.length > 0 && <section className="section container"><BrandDirectory brands={brands} heading="Servis Verdiğimiz Markalar" /></section>}

    <section className="contact-section">
      <div className="container contact-section__inner">
        <div>
          <p className="eyebrow">İletişim</p>
          <h2>{landing?.contactTitle ?? `${service.name} için bize ulaşın`}</h2>
          <p>{landing?.contactText ?? "WhatsApp veya telefon üzerinden doğrudan iletişime geçebilirsiniz."}</p>
        </div>
        <ServiceActions whatsappLabel={whatsappLabel} />
      </div>
    </section>
  </div>;
}
