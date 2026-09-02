import { BRAND_DIRECTORY } from "../lib/data";

export function BrandDirectory() {
  const brands = [...BRAND_DIRECTORY].sort((a, b) => a.name.localeCompare(b.name, "tr"));
  return <section aria-labelledby="brands-title"><p className="eyebrow eyebrow-light">Cihaz desteği</p><h2 id="brands-title">Tamir Ettiğimiz Markalar</h2><p>Listelenen marka adları yalnızca hizmet verilen cihazları tanımlamak için kullanılır.</p><div className="brand-list">{brands.map(brand => <span key={brand.name}>{brand.name}</span>)}</div><p className="disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servistir. Listelenen markaların yetkili servisi değildir.</p></section>;
}
