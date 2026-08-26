import Image from "next/image";
import { AREAS, BRANDS, COMPANY, SERVICES, SERVICE_VISUALS } from "../lib/data";
import { ServiceForm } from "../components/ServiceForm";
import { Reveal } from "../components/Reveal";
import { ServiceVisual } from "../components/ServiceVisual";

const advantages = [
  ["01", "Deneyimli Teknik Ekip", "Cihaz türü ve arıza bilgisine göre planlanan teknik destek."],
  ["02", "Hızlı Servis Yönlendirmesi", "Talebiniz değerlendirilir, uygun yönlendirme süreci başlatılır."],
  ["03", "Şeffaf Bilgilendirme", "Servis süreci boyunca ihtiyaç duyulan bilgiler net biçimde paylaşılır."],
  ["04", "İzmir Geneli Hizmet", "İzmir'in birçok ilçesinde bağımsız özel teknik servis desteği."],
];
const faq = [
  ["Servis talebini nasıl oluşturabilirim?", "Telefon, WhatsApp veya servis talep formu üzerinden cihaz ve ilçe bilginizi paylaşabilirsiniz."],
  ["Hangi cihazlar için hizmet veriyorsunuz?", "Beyaz eşya, klima, kombi, televizyon, ısı pompası ve VRF sistemleri için teknik servis desteği sunuyoruz."],
  ["İzmir'in hangi bölgelerine hizmet veriyorsunuz?", "Buca, Konak, Karabağlar, Bornova ve diğer listelenen ilçelerde hizmet planlaması yapılmaktadır."],
  ["Yetkili servis misiniz?", "Hayır. Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servis hizmeti sunar; listelenen markaların yetkili servisi değildir."],
];

export default function Home() {
  return <>
    <section className="hero hero-photo">
      <Image className="hero-background" src="/images/hero/teknik-servis-hero.png" alt="Klima ünitesinde bakım yapan teknik servis çalışanı" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="container hero-content"><Reveal className="hero-copy">
        <p className="eyebrow eyebrow-light">İzmir Geneli Teknik Servis</p>
        <h1>Evinizdeki Teknolojiye <em>Güvenilir Servis</em></h1>
        <p className="lead">Beyaz eşya, klima, kombi ve elektronik cihazlar için arıza tespiti, bakım ve onarım desteği.</p>
        <div className="actions"><a className="button orange" href="#servis-talebi">Servis Talebi Oluştur</a><a className="button hero-outline" href={COMPANY.phoneHref}>Hemen Ara</a></div>
        <p className="hero-note">Bağımsız özel teknik servis · {COMPANY.hours}</p>
      </Reveal></div>
    </section>

    <section className="brand-support" aria-labelledby="brands-title"><div className="container brand-support-grid"><div><p className="eyebrow">Hizmet verilen markalar</p><h2 id="brands-title">Birçok marka ve model için teknik destek</h2><p>Bu markalara ait cihazlar için bağımsız özel teknik servis hizmeti sunulur.</p></div><div className="brand-list" aria-label="Teknik destek sunulan markalar">{BRANDS.map(brand => <span key={brand}>{brand}</span>)}</div></div><p className="container brand-disclaimer">Belirtilen markalara ait cihazlar için bağımsız özel teknik servis hizmeti sunulur. Yetkili servis değiliz.</p></section>

    <section className="advantage-section"><div className="container advantage-grid">
      {advantages.map(([number, title, text], index) => <Reveal key={title} delay={index * 55} className="advantage-card"><span className="number-icon">{number}</span><div><h2>{title}</h2><p>{text}</p></div></Reveal>)}
    </div></section>

    <section className="section services-section" id="hizmetler"><div className="container"><Reveal><div className="section-heading centered"><p className="eyebrow">Hizmetlerimiz</p><h2>Teknik destek sunduğumuz alanlar</h2><p>Ev ve iş yerlerindeki temel cihaz ve sistemler için planlı teknik servis desteği.</p></div></Reveal><div className="service-grid">
      {SERVICES.map((service, index) => <Reveal key={service.slug} delay={index * 55}><article className="service-card"><a href={`/${service.slug}`} className="service-card-image" aria-label={`${service.name} sayfasını incele`}><ServiceVisual visual={service.visual as keyof typeof SERVICE_VISUALS} /></a><div className="service-card-copy"><small>Bağımsız teknik servis</small><h3><a href={`/${service.slug}`}>{service.name}</a></h3><p>{service.description}</p><a href={`/${service.slug}`} className="service-card-cta">Hizmeti incele <b>→</b></a></div></article></Reveal>)}
    </div></div></section>

    <section className="dark-service-section" id="servis-talebi"><div className="container dark-service-grid"><Reveal className="dark-service-copy"><p className="eyebrow eyebrow-orange">Servis desteği</p><h2>İhtiyacınızı dinleyip uygun süreci birlikte planlayalım.</h2><p>Cihaz türü, marka ve yaşadığınız sorunla ilgili temel bilgileri paylaşın. Size uygun iletişim ve değerlendirme süreci oluşturulsun.</p><ul className="check-list"><li>Telefon ve WhatsApp üzerinden hızlı iletişim</li><li>İzmir ilçelerine göre servis planlaması</li><li>Çok markalı cihazlar için bağımsız destek</li></ul><div className="actions"><a className="button orange" href={COMPANY.phoneHref}>Hemen Ara</a><a className="text-link light-link" href={COMPANY.whatsappUrl}>WhatsApp&apos;tan yazın →</a></div></Reveal><Reveal variant="fade-left" className="service-request-card"><div className="form-image"><ServiceVisual visual="airConditioner" /></div><div className="form-copy"><p className="form-kicker">Servis Talep Formu</p><h3>Size ulaşalım</h3><p>Bilgilerinizi bırakın, talebiniz değerlendirilsin.</p></div><ServiceForm /></Reveal></div></section>

    <section className="section"><div className="container"><Reveal><div className="section-heading"><p className="eyebrow">Kolay erişim</p><h2>İhtiyacınız olan bilgiye hızlıca ulaşın</h2></div></Reveal><div className="quick-grid">
      <a href="#hizmet-bolgeleri" className="quick-card"><span>01</span><h3>Hizmet Bölgeleri</h3><p>İzmir&apos;de destek sunduğumuz ilçeleri inceleyin.</p><b>İlçeleri görüntüle →</b></a>
      <a href="#servis-talebi" className="quick-card"><span>02</span><h3>Servis Talebi</h3><p>Cihaz ve arıza detaylarını ileterek süreç başlatın.</p><b>Talep oluştur →</b></a>
      <a href="/iletisim" className="quick-card"><span>03</span><h3>İletişim</h3><p>Telefon, e-posta veya iletişim sayfasından bize ulaşın.</p><b>İletişime geç →</b></a>
    </div></div></section>

    <section className="soft-section"><div className="container approach-grid"><Reveal><div><p className="eyebrow">Çalışma yaklaşımımız</p><h2>Her talepte sade, anlaşılır ve ilgili bir iletişim</h2><p className="lead">Talep öncesinde cihaz ve arıza bilgisi alınır; teknik destek süreci mümkün olduğunca net şekilde planlanır.</p><a href="/hakkimizda" className="text-link">Ege Bölge hakkında daha fazla bilgi →</a></div></Reveal><Reveal variant="fade-left" className="approach-visual"><ServiceVisual visual="washingMachine" /></Reveal></div></section>

    <section className="area-section" id="hizmet-bolgeleri"><div className="container area-layout"><Reveal><div><p className="eyebrow eyebrow-light">Hizmet Bölgeleri</p><h2>İzmir&apos;in birçok ilçesinde teknik servis desteği</h2><p>Geniş hizmet ağımızla talebinizi ilçenize göre değerlendiriyoruz.</p><a className="button white-outline" href="/hizmet-bolgeleri">Tüm hizmet bölgelerini gör</a></div></Reveal><Reveal variant="fade-left"><div className="area-list">{AREAS.slice(0, 12).map(area => <span key={area}>{area}</span>)}</div></Reveal></div><p className="container area-note">Beydağ, Kiraz ve Ödemiş bölgelerinde şu anda servis hizmeti verilmemektedir.</p></section>

    <section className="faq-section" id="sss"><div className="container faq-layout"><Reveal><div><p className="eyebrow">Sık sorulan sorular</p><h2>Servis süreci hakkında merak edilenler</h2><p>Ek bilgiye ihtiyacınız olduğunda iletişim kanallarımızdan bize ulaşabilirsiniz.</p></div></Reveal><Reveal variant="fade-left" className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</Reveal></div></section>

  </>;
}
