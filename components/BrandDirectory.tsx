import { BRAND_DIRECTORY, type Brand } from "../lib/brands";

type Props = {
  brands?: readonly Brand[];
  theme?: "light" | "dark";
  heading?: string;
  headingLevel?: 1 | 2;
};

export function BrandDirectory({ brands = BRAND_DIRECTORY, theme = "light", heading = "Tamir Ettiğimiz Markalar", headingLevel = 2 }: Props) {
  if (!brands.length) return null;
  const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name, "tr"));
  const Heading = headingLevel === 1 ? "h1" : "h2";
  // A labelled section avoids fixed IDs and is safe to render more than once.
  return <section className={`brand-directory brand-directory--${theme}`} aria-label={heading}>
    <p className={`eyebrow${theme === "dark" ? " eyebrow-light" : ""}`}>Cihaz desteği</p>
    <Heading>{heading}</Heading>
    <p>Listelenen marka adları yalnızca hizmet verilen cihazları tanımlamak için kullanılır.</p>
    <ul className="brand-directory__links">{sortedBrands.map(brand => <li key={brand.slug}><a href={`/${brand.slug}`}>{brand.name}<span aria-hidden="true"> →</span></a></li>)}</ul>
    <p className={`disclaimer${theme === "light" ? " light-disclaimer" : ""}`}>Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servistir. Listelenen markaların yetkili servisi değildir.</p>
  </section>;
}
