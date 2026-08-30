import Image from "next/image";
import { AREAS, COMPANY, SERVICES, SERVICE_VISUALS } from "../lib/data";
import { ServiceForm } from "../components/ServiceForm";
import { Reveal } from "../components/Reveal";
import { ServiceVisual } from "../components/ServiceVisual";

const advantages = [
  ["01", "Deneyimli Ekip", "Arızaya uygun teknik destek."],
  ["02", "Hızlı Yönlendirme", "Talebiniz hızlıca planlanır."],
  ["03", "Net Bilgilendirme", "Süreç açıkça paylaşılır."],
  ["04", "İzmir Geneli", "Birçok ilçede servis desteği."],
];
const brandMarks: ReadonlyArray<{ name: string; logo?: string }> = [
  { name: "Arçelik", logo: "/images/brands/arcelik.svg" },
  { name: "Beko", logo: "/images/brands/beko.svg" },
  { name: "Vestel", logo: "/images/brands/vestel.svg" },
  { name: "Bosch", logo: "/images/brands/bosch.svg" },
  { name: "Siemens", logo: "/images/brands/siemens.svg" },
  { name: "Samsung", logo: "/images/brands/samsung.svg" },
  { name: "LG", logo: "/images/brands/lg.svg" },
  { name: "Profilo" },
  { name: "Altus" },
  { name: "Regal" },
  { name: "Grundig" },
  { name: "Electrolux", logo: "/images/brands/electrolux.svg" },
  { name: "Whirlpool" },
  { name: "Hoover" },
  { name: "Indesit" },
];
const faq = [
  ["Servis talebini nasıl oluşturabilirim?", "Telefon, WhatsApp veya servis talep formu üzerinden cihaz ve ilçe bilginizi paylaşabilirsiniz."],
  ["Hangi cihazlar için hizmet veriyorsunuz?", "Beyaz eşya, klima, kombi, televizyon, ısı pompası ve VRF sistemleri için teknik servis desteği sunuyoruz."],
  ["İzmir'in hangi bölgelerine hizmet veriyorsunuz?", "Buca, Konak, Karabağlar, Bornova ve diğer listelenen ilçelerde hizmet planlaması yapılmaktadır."],
  ["Yetkili servis misiniz?", "Hayır. Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servis hizmeti sunar; listelenen markaların yetkili servisi değildir."],
];

const featuredServiceSlugs = [
  "camasir-makinesi-servisi",
  "bulasik-makinesi-servisi",
  "buzdolabi-servisi",
  "klima-servisi",
  "tv-tamiri",
  "kombi-servisi",
  "isi-pompasi-servisi",
  "vrf-servisi",
] as const;

const featuredServices = featuredServiceSlugs.map((slug) => SERVICES.find((service) => service.slug === slug)!);

const serviceCardDescriptions: Record<string, string> = {
  "camasir-makinesi-servisi": "Arıza tespiti, bakım ve onarım için hızlı teknik servis.",
  "bulasik-makinesi-servisi": "Yıkama, su alma ve tahliye sorunları için teknik destek.",
  "buzdolabi-servisi": "Soğutma ve ses sorunları için hızlı teknik servis.",
  "klima-servisi": "Bakım, arıza tespiti ve onarım için profesyonel destek.",
  "tv-tamiri": "Görüntü, ses ve açılmama sorunları için teknik destek.",
  "kombi-servisi": "Isıtma ve sıcak su sorunları için teknik servis.",
  "isi-pompasi-servisi": "Bakım, performans kontrolü ve arıza desteği.",
  "vrf-servisi": "Ticari iklimlendirme sistemleri için teknik destek.",
};

export default function Home() {
  return <>
    <section className="hero hero-photo">
      <Image className="hero-background" src="/images/hero/teknik-servis-hero.png" alt="Klima ünitesinde bakım yapan teknik servis çalışanı" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="container hero-content"><Reveal className="hero-copy">
        <p className="eyebrow eyebrow-light">İzmir Geneli Teknik Servis</p>
        <h1>Evinizdeki Teknolojiye <em>Güvenilir Servis</em></h1>
        <p className="lead">Beyaz eşya, klima, kombi ve elektronik cihazlarda hızlı teknik destek.</p>
        <div className="actions"><a className="button orange" href="#servis-talebi">Servis Talebi Oluştur</a><a className="button hero-outline" href={COMPANY.phoneHref}>Hemen Ara</a></div>
        <p className="hero-note">Bağımsız özel teknik servis · {COMPANY.hours}</p>
      </Reveal></div>
    </section>

    <section className="section services-section" id="hizmetler"><div className="container"><Reveal><div className="section-heading centered"><p className="eyebrow">Hizmetlerimiz</p><h2>Hangi cihazlara servis veriyoruz?</h2><p>İhtiyacınız olan hizmeti seçin.</p></div></Reveal><div className="service-grid">
      {featuredServices.map((service, index) => <Reveal key={service.slug} delay={index * 55}><article className="service-card"><a href={`/${service.slug}`} className="service-card-image" aria-label={`${service.name} sayfasını incele`}><ServiceVisual visual={service.visual as keyof typeof SERVICE_VISUALS} /></a><div className="service-card-copy"><p className="service-card-kicker">Teknik Servis</p><h3><a href={`/${service.slug}`}>{service.name}</a></h3><p>{serviceCardDescriptions[service.slug]}</p><div className="service-card-badges" aria-label="Servis özellikleri"><span>Hızlı Servis</span><span>İzmir Geneli</span></div><a href="#servis-talebi" className="service-card-cta">Servis Talebi Oluştur <b>→</b></a></div></article></Reveal>)}
    </div></div></section>

    <section className="advantage-section"><div className="container advantage-grid">
      {advantages.map(([number, title, text], index) => <Reveal key={title} delay={index * 55} className="advantage-card"><span className="number-icon">{number}</span><div><h2>{title}</h2><p>{text}</p></div></Reveal>)}
    </div></section>

    <section className="brand-showcase" aria-labelledby="brand-showcase-title"><div className="container"><Reveal><div className="brand-showcase-heading"><div><p className="eyebrow">Hizmet verilen markalar</p><h2 id="brand-showcase-title">Birçok marka için teknik destek</h2></div><p>Bağımsız özel servis hizmeti sunuyoruz.</p></div></Reveal><div className="brand-logo-grid">
      {brandMarks.map((brand, index) => <Reveal key={brand.name} delay={index * 28} className="brand-logo-card">{brand.logo && <Image src={brand.logo} alt="" aria-hidden="true" width={31} height={31} />}<span>{brand.name}</span></Reveal>)}
    </div><p className="brand-showcase-note">Listelenen markaların yetkili servisi değiliz.</p></div></section>

    <section className="dark-service-section" id="servis-talebi"><div className="container dark-service-grid"><Reveal className="dark-service-copy"><p className="eyebrow eyebrow-orange">Servis desteği</p><h2>Arızanızı bildirin, sizi arayalım.</h2><p>Cihaz, ilçe ve telefon bilginizi bırakmanız yeterli.</p><ul className="check-list"><li>Telefon ve WhatsApp desteği</li><li>İlçeye göre hızlı planlama</li><li>Çok markalı özel servis</li></ul><div className="actions"><a className="button orange" href={COMPANY.phoneHref}>Hemen Ara</a><a className="text-link light-link" href={COMPANY.whatsappUrl}>WhatsApp&apos;tan yazın →</a></div></Reveal><Reveal variant="fade-left" className="service-request-card"><div className="form-copy"><p className="form-kicker">Servis Talebi</p><h3>Size ulaşalım</h3></div><ServiceForm /></Reveal></div></section>

    <section className="area-section" id="hizmet-bolgeleri"><div className="container area-layout"><Reveal><div><p className="eyebrow eyebrow-light">Hizmet Bölgeleri</p><h2>İzmir&apos;in birçok ilçesinde teknik servis desteği</h2><p>Geniş hizmet ağımızla talebinizi ilçenize göre değerlendiriyoruz.</p><a className="button white-outline" href="/hizmet-bolgeleri">Tüm hizmet bölgelerini gör</a></div></Reveal><Reveal variant="fade-left"><div className="area-list">{AREAS.slice(0, 12).map(area => <span key={area}>{area}</span>)}</div></Reveal></div><p className="container area-note">Beydağ, Kiraz ve Ödemiş bölgelerinde şu anda servis hizmeti verilmemektedir.</p></section>

    <section className="faq-section" id="sss"><div className="container faq-layout"><Reveal><div><p className="eyebrow">Sık sorulan sorular</p><h2>Servis süreci hakkında merak edilenler</h2><p>Ek bilgiye ihtiyacınız olduğunda iletişim kanallarımızdan bize ulaşabilirsiniz.</p></div></Reveal><Reveal variant="fade-left" className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</Reveal></div></section>

  </>;
}
