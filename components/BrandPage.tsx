import { IZMIR_SERVICE_AREAS, AYDIN_SERVICE_AREAS } from "../lib/regions";
import { ProvinceSummary } from "./ServiceAreas";
import { COMPANY, SERVICES } from "../lib/data";
import type { Brand } from "../lib/brands";
import { ServiceActions } from "./ServiceActions";

export function BrandPage({ brand }: { brand: Brand }) {
  const services = SERVICES.filter(service => brand.supportedServices.includes(service.slug));
  const faq = [
    [`${brand.name} yetkili servisi misiniz?`, `Hayır. Ege Bölge Teknik Servis Hizmetleri bağımsız özel servistir. ${brand.name} markasının yetkili servisi değildir.`],
    [`${brand.name} cihazım için hangi bilgileri paylaşmalıyım?`, brand.preparation.text],
    ["Cihazım için yapılabilecek işlemleri nasıl öğrenebilirim?", "Cihaz türünü, modelini ve ihtiyacınızı telefonla paylaşın. İşlem kapsamı cihaz bilgisi ve durumu değerlendirilerek netleştirilir; yalnızca marka adı yapılabilecek işlemleri belirlemez."],
    ["Hangi illerde hizmet veriyorsunuz?", `İzmir’de listelenen ${IZMIR_SERVICE_AREAS.length} ilçede ve Aydın’ın ${AYDIN_SERVICE_AREAS.length} ilçesinin tamamında hizmet veriyoruz. İzmir’de Beydağ, Kiraz ve Ödemiş hizmet kapsamımız dışındadır. Talebinizde bulunduğunuz il ve ilçeyi belirtin.`],
  ];
  const breadcrumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${COMPANY.website}/` },
      { "@type": "ListItem", position: 2, name: "Markalar", item: `${COMPANY.website}/markalar` },
      { "@type": "ListItem", position: 3, name: `${brand.name} Servisi`, item: `${COMPANY.website}/${brand.slug}` },
    ],
  };

  return <div className="service-landing brand-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
    <section className="service-hero"><div className="container brand-page__hero">
      <nav className="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a><span aria-hidden="true"> / </span><a href="/markalar">Markalar</a><span aria-hidden="true"> / </span><span aria-current="page">{brand.name} Servisi</span></nav>
      <p className="eyebrow">EGE BÖLGE TEKNİK SERVİS</p><h1>{brand.name} Servisi</h1>
      <p className="lead">{brand.shortDescription}</p><ServiceActions />
    </div></section>

    {services.length > 0 && <section className="section container" aria-labelledby="brand-services-title">
      <div className="section-heading"><h2 id="brand-services-title">{brand.name} için hizmetlerimiz</h2></div>
      <div className="service-options"><ul className="service-issues">{services.map(service => <li key={service.slug}><a href={`/${service.slug}`}>{service.name}<span aria-hidden="true"> →</span></a></li>)}</ul></div>
    </section>}

    <section className="section container brand-page__preparation" aria-labelledby="brand-preparation-title">
      <div className="section-heading"><p className="eyebrow">Görüşme öncesi</p><h2 id="brand-preparation-title">{brand.preparation.title}</h2><p>{brand.preparation.text}</p></div>
      <div className="brand-page__checklist"><h3>İlk iletişimde paylaşabilecekleriniz</h3><ul><li>Cihazın türü ve biliyorsanız model bilgisi</li><li>Gözlemlediğiniz durum ve ne zaman başladığı</li><li>Cihazın bulunduğu il ve ilçe</li></ul><p>Belirti açıklaması tek başına kesin teşhis veya onarım garantisi değildir. Cihazınız için yapılabilecek işlemleri görüşmede sorabilirsiniz.</p></div>
    </section>

    <section className="container brand-page__process" aria-labelledby="brand-process-title">
      <h2 id="brand-process-title">Servis talebi nasıl ilerler?</h2>
      <ol className="brand-process"><li><h3>İhtiyacınızı paylaşın</h3><p>Telefonla cihazınızı ve talebinizi anlatın.</p></li><li><h3>Ayrıntıları görüşün</h3><p>Cihaz bilgisi, arıza belirtisi ve ilçenize göre talebin kapsamı hakkında bilgi alın.</p></li><li><h3>Sonraki adımı netleştirin</h3><p>Cihazın durumuna göre yapılabilecek işlemleri ve süreçle ilgili sorularınızı görüşün.</p></li></ol>
    </section>

    <section className="area-section" aria-labelledby="brand-areas-title"><div className="container area-layout"><div><p className="eyebrow eyebrow-light">Hizmet Bölgeleri</p><h2 id="brand-areas-title">İzmir ve Aydın’da servis talebiniz için bize ulaşın</h2><p>Talebinizde bulunduğunuz il ve ilçeyi belirtin.</p><a className="button white-outline" href="/hizmet-bolgeleri">Hizmet bölgelerini incele</a></div><ProvinceSummary /></div></section>

    <section className="faq-section" aria-labelledby="brand-faq-title"><div className="container faq-layout"><div><p className="eyebrow">Sık sorulan sorular</p><h2 id="brand-faq-title">{brand.name} servis talebi hakkında</h2></div><div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="contact-section"><div className="container contact-section__inner"><div><p className="eyebrow">İletişim</p><h2>{brand.name} cihazınız için bize ulaşın</h2><p>Servis talebinizi 7/24 çağrı merkezimize iletebilirsiniz.</p><a className="text-link" href="/markalar">Tüm markaları incele →</a></div><ServiceActions /></div></section>
  </div>;
}
