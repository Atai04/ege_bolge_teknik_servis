import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS, BRANDS, COMPANY, SERVICES, SERVICE_VISUALS } from "../../lib/data";
import { ServiceForm } from "../../components/ServiceForm";
import { ServiceVisual } from "../../components/ServiceVisual";

const legal: Record<string, [string, string]> = {
  "kvkk": ["KVKK Aydınlatma Metni", "Kişisel veriler, servis talebinin değerlendirilmesi ve iletişim kurulması amacıyla işlenir. Veri sorumlusu ve başvuru usulleri gibi teyit gerektiren yasal bilgiler, yayın öncesinde şirket tarafından tamamlanmalıdır."],
  "gizlilik-politikasi": ["Gizlilik Politikası", "Bu siteyi kullanırken paylaştığınız iletişim ve servis talebi bilgileri, talebinizi değerlendirmek için kullanılır. Veriler, yasal yükümlülükler ve gerekli haller dışında paylaşılmaz."],
  "cerez-politikasi": ["Çerez Politikası", "Site, temel çalışmasını sağlamak için zorunlu çerezleri kullanabilir. Analitik veya pazarlama çerezleri, ilgili izin tercihleri doğrultusunda etkinleştirilmelidir."],
};
const pageMeta: Record<string, [string, string]> = {
  "markalar": ["Hizmet Verilen Markalar | Ege Bölge Teknik Servis", "İzmir'de birçok beyaz eşya ve elektronik marka cihazı için bağımsız özel teknik servis desteği."],
  "hizmet-bolgeleri": ["İzmir Hizmet Bölgeleri | Ege Bölge Teknik Servis", "Buca ve İzmir'in birçok ilçesinde bağımsız özel teknik servis hizmet bölgeleri."],
  "hakkimizda": ["Hakkımızda | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis Hizmetleri hakkında bilgi ve İzmir'deki bağımsız özel teknik servis yaklaşımı."],
  "iletisim": ["İletişim | Ege Bölge Teknik Servis", "İzmir Buca'da Ege Bölge Teknik Servis iletişim bilgileri, telefon ve servis talep formu."],
  "kvkk": ["KVKK Aydınlatma Metni | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis kişisel verilerin işlenmesine ilişkin aydınlatma metni."],
  "gizlilik-politikasi": ["Gizlilik Politikası | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis gizlilik politikası."],
  "cerez-politikasi": ["Çerez Politikası | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis çerez politikası."],
};

export function generateStaticParams() {
  return ["markalar", "hizmet-bolgeleri", "hakkimizda", "iletisim", ...Object.keys(legal), ...SERVICES.map(service => service.slug)].map(slug => ({ slug: [slug] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const service = SERVICES.find(item => item.slug === path);
  if (service) {
    const visual = SERVICE_VISUALS[service.visual];
    const title = `İzmir ${service.name} | Ege Bölge Teknik Servis`;
    const description = `${service.description} Buca ve İzmir genelinde hizmet planlaması için iletişime geçin.`;
    return { title, description, alternates: { canonical: `/${service.slug}` }, openGraph: { title, description, images: [{ url: visual.src, alt: visual.alt }] }, twitter: { title, description, images: [visual.src] } };
  }
  const meta = pageMeta[path];
  return meta ? { title: meta[0], description: meta[1], alternates: { canonical: `/${path}` }, openGraph: { title: meta[0], description: meta[1] } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const path = slug.join("/");
  if (legal[path]) return <Article title={legal[path][0]} text={legal[path][1]} />;
  if (path === "markalar") return <Article title="Hizmet Verilen Markalar" text="Aşağıdaki markalara ait cihazlar için bağımsız özel teknik servis desteği sunulur. Ege Bölge Teknik Servis Hizmetleri listelenen markaların yetkili servisi değildir." chips={BRANDS} />;
  if (path === "hizmet-bolgeleri") return <Article title="İzmir Hizmet Bölgeleri" text="İzmir'in birçok ilçesinde servis hizmeti sunuyoruz. Beydağ, Kiraz ve Ödemiş bölgelerinde şu anda servis hizmeti verilmemektedir." chips={AREAS} />;
  if (path === "hakkimizda") return <Article title="Hakkımızda" text="Ege Bölge Teknik Servis Hizmetleri; İzmir'de beyaz eşya, klima, kombi, TV, ısı pompası ve VRF sistemleri için bağımsız özel teknik servis hizmeti sunar. Cihaz türü ve arıza bilgisine göre uygun servis desteği planlanır." />;
  if (path === "iletisim") return <section className="section container"><div className="section-heading"><p className="eyebrow">İletişim</p><h1>Servis için bize ulaşın</h1><p>{COMPANY.address}</p><p><a className="text-link" href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a> · <a className="text-link" href={COMPANY.whatsappUrl}>WhatsApp</a></p><p>{COMPANY.hours} · <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p></div><div className="form-layout"><div><a className="button outline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`}>Yol Tarifi Al</a></div><ServiceForm /></div></section>;
  const service = SERVICES.find(item => item.slug === path);
  if (!service) notFound();
  return <Service service={service} />;
}

function Article({ title, text, chips }: { title: string; text: string; chips?: readonly string[] }) {
  return <section className="section container article"><p className="eyebrow">Ege Bölge Teknik Servis</p><h1>{title}</h1><p className="lead small">{text}</p>{chips && <div className="chips">{chips.map(item => <span key={item}>{item}</span>)}</div>}<p className="disclaimer light-disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servis hizmeti sunmaktadır. Listelenen markaların yetkili servisi değildir.</p></section>;
}

function Service({ service }: { service: (typeof SERVICES)[number] }) {
  const related = SERVICES.filter(item => item.slug !== service.slug).slice(0, 5);
  return <><section className="service-hero"><div className="container service-hero-grid"><div><p className="eyebrow">İzmir Bağımsız Teknik Servis</p><p className="breadcrumb"><Link href="/">Ana Sayfa</Link> / {service.name}</p><h1>İzmir {service.name}</h1><p className="lead">{service.description} Cihazınızdaki arıza belirtisini paylaşarak servis talebi oluşturabilirsiniz.</p><div className="actions"><a className="button amber" href={COMPANY.phoneHref}>Hemen Ara</a><a className="button outline" href={COMPANY.whatsappUrl}>WhatsApp&apos;tan Yaz</a></div></div><div className="service-hero-image"><ServiceVisual visual={service.visual} priority /></div></div></section><section className="section container split"><div><h2>{service.name} hakkında</h2><p>Arıza, bakım veya onarım ihtiyacınız için cihaz ve yaşadığınız sorun hakkında temel bilgi iletebilirsiniz. İnceleme sonucunda uygun teknik servis desteği planlanır.</p><h2>Yaygın sorunlar</h2><div className="chips"><span>Çalışmıyor</span><span>Ses yapıyor</span><span>Hata kodu veriyor</span><span>Program tamamlamıyor</span></div></div><div><h2>Servis bölgeleri</h2><p>İzmir&apos;in birçok ilçesinde hizmet verilmektedir. Beydağ, Kiraz ve Ödemiş kapsam dışıdır.</p><Link href="/hizmet-bolgeleri" className="text-link">Hizmet bölgelerini incele →</Link><h2 className="related-title">Diğer hizmetler</h2><div className="related-links">{related.map(item => <Link key={item.slug} href={`/${item.slug}`}>{item.short} →</Link>)}</div></div></section><section className="form-section" id="servis-talebi"><div className="container form-layout"><div><p className="eyebrow">Servis talebi</p><h2>{service.name} için talep oluşturun</h2><p>Telefon veya WhatsApp üzerinden de doğrudan ulaşabilirsiniz.</p></div><ServiceForm /></div></section></>;
}
