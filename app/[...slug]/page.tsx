import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS, COMPANY, SERVICES, SERVICE_VISUALS } from "../../lib/data";
import { ServiceVisual } from "../../components/ServiceVisual";
import { BrandDirectory } from "../../components/BrandDirectory";

const pageMeta: Record<string, [string, string]> = {
  "markalar": ["Hizmet Verilen Markalar | Ege Bölge Teknik Servis", "İzmir'de birçok beyaz eşya ve elektronik marka cihazı için bağımsız özel teknik servis desteği."],
  "hizmet-bolgeleri": ["İzmir Hizmet Bölgeleri | Ege Bölge Teknik Servis", "Buca ve İzmir'in birçok ilçesinde bağımsız özel teknik servis hizmet bölgeleri."],
  "hakkimizda": ["Hakkımızda | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis Hizmetleri hakkında bilgi ve İzmir'deki bağımsız özel teknik servis yaklaşımı."],
  "iletisim": ["İletişim | Ege Bölge Teknik Servis", "İzmir Buca'da Ege Bölge Teknik Servis iletişim bilgileri."],
  "gizlilik-politikasi": ["Gizlilik Politikası | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis gizlilik politikası."],
  "cerez-politikasi": ["Çerez Politikası | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis çerez politikası."],
};

export function generateStaticParams() {
  return ["markalar", "hizmet-bolgeleri", "hakkimizda", "iletisim", "gizlilik-politikasi", "cerez-politikasi", ...SERVICES.map(service => service.slug)].map(slug => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const service = SERVICES.find(item => item.slug === path);
  if (service) {
    const visual = SERVICE_VISUALS[service.visual];
    const title = `İzmir ${service.name} | Ege Bölge Teknik Servis`;
    const description = `${service.description} Buca ve İzmir genelinde iletişim için bize ulaşın.`;
    return { title, description, alternates: { canonical: `/${service.slug}` }, openGraph: { title, description, images: [{ url: visual.src, alt: visual.alt }] }, twitter: { title, description, images: [visual.src] } };
  }
  const meta = pageMeta[path];
  return meta ? { title: meta[0], description: meta[1], alternates: { canonical: `/${path}` }, openGraph: { title: meta[0], description: meta[1] } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  if (path === "gizlilik-politikasi") return <PrivacyPolicy />;
  if (path === "cerez-politikasi") return <CookiePolicy />;
  if (path === "markalar") return <section className="section container"><BrandDirectory /></section>;
  if (path === "hizmet-bolgeleri") return <Article title="İzmir Hizmet Bölgeleri" text="İzmir'in birçok ilçesinde servis hizmeti sunuyoruz. Beydağ, Kiraz ve Ödemiş bölgelerinde şu anda servis hizmeti verilmemektedir." chips={AREAS} />;
  if (path === "hakkimizda") return <Article title="Hakkımızda" text="Ege Bölge Teknik Servis Hizmetleri; İzmir'de beyaz eşya, klima, kombi, TV, ısı pompası ve VRF sistemleri için bağımsız özel teknik servis hizmeti sunar. Cihaz türü ve arıza bilgisine göre uygun teknik destek planlanır." />;
  if (path === "iletisim") return <Contact />;
  const service = SERVICES.find(item => item.slug === path);
  if (!service) notFound();
  return <Service service={service} />;
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
  const related = SERVICES.filter(item => item.slug !== service.slug).slice(0, 5);
  return <><section className="service-hero"><div className="container service-hero-grid"><div><p className="eyebrow">İzmir Bağımsız Teknik Servis</p><p className="breadcrumb"><a href="/">Ana Sayfa</a> / {service.name}</p><h1>İzmir {service.name}</h1><p className="lead">{service.description} Cihazınızdaki arıza belirtisi için WhatsApp veya telefon üzerinden bize ulaşabilirsiniz.</p><div className="actions"><a className="button amber" href={COMPANY.phoneHref}>Hemen Ara</a><a className="button outline" href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp&apos;tan Yaz</a></div></div><div className="service-hero-image"><ServiceVisual visual={service.visual} priority /></div></div></section><section className="section container split"><div><h2>{service.name} hakkında</h2><p>Arıza, bakım veya onarım ihtiyacınız için cihaz ve yaşadığınız sorun hakkında temel bilgiyi WhatsApp veya telefon üzerinden iletebilirsiniz.</p><h2>Yaygın sorunlar</h2><div className="chips"><span>Çalışmıyor</span><span>Ses yapıyor</span><span>Hata kodu veriyor</span><span>Program tamamlamıyor</span></div></div><div><h2>Servis bölgeleri</h2><p>İzmir&apos;in birçok ilçesinde hizmet verilmektedir. Beydağ, Kiraz ve Ödemiş kapsam dışıdır.</p><a href="/hizmet-bolgeleri" className="text-link">Hizmet bölgelerini incele →</a><h2 className="related-title">Diğer hizmetler</h2><div className="related-links">{related.map(item => <a key={item.slug} href={`/${item.slug}`}>{item.short} →</a>)}</div></div></section><section className="contact-section"><div className="container contact-section__inner"><div><p className="eyebrow">İletişim</p><h2>{service.name} için bize ulaşın</h2><p>WhatsApp veya telefon üzerinden doğrudan iletişime geçebilirsiniz.</p></div><div className="actions"><a className="button amber" href={COMPANY.phoneHref}>Hemen Ara</a><a className="button outline" href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp&apos;tan Yaz</a></div></div></section></>;
}
