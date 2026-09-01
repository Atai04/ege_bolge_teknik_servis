import { BRAND_DIRECTORY } from "../lib/data";

const deviceGroups = [["Beyaz Eşya", "Buzdolabı · Çamaşır Makinesi · Bulaşık Makinesi · Kurutma Makinesi"], ["Klima", "Ev tipi ve ticari klima sistemleri"], ["Kombi", "Kombi arıza, bakım ve onarım desteği"]] as const;

export function BrandDirectory() {
  const brands = [...BRAND_DIRECTORY].sort((a, b) => a.name.localeCompare(b.name, "tr"));
  return <section className="brand-directory" aria-labelledby="brand-directory-title"><p className="eyebrow">Cihaz desteği</p><h2 id="brand-directory-title">Hizmet Verdiğimiz Marka ve Cihaz Grupları</h2><div className="device-group-grid">{deviceGroups.map(([title, description]) => <article key={title} className="device-group-card"><h3>{title}</h3><p>{description}</p></article>)}</div><h3 className="brand-directory__subtitle">Destek Verdiğimiz Markalar</h3><div className="brand-directory__grid">{brands.map(brand => <article key={brand.name} className="brand-directory__card"><h3>{brand.name}</h3><div>{brand.categories.map(category => <span key={category} className="brand-directory__tag">{category}</span>)}</div>{brand.note && <p>{brand.note}</p>}</article>)}</div><p className="disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servistir. Listelenen markaların yetkili servisi değildir.</p></section>;
}
