import { SERVICES } from "./data";
import { BRAND_DIRECTORY, type Brand } from "./brands";

export const INFORMATION_PAGES = {
  "markalar": ["Hizmet Verilen Markalar | Ege Bölge Teknik Servis", "İzmir'de birçok beyaz eşya ve elektronik marka cihazı için bağımsız özel teknik servis desteği."],
  "hizmet-bolgeleri": ["İzmir ve Aydın Teknik Servis Hizmet Bölgeleri | Ege Bölge Teknik Servis", "İzmir’de listelenen 20 ilçede ve Aydın’ın 17 ilçesinde bağımsız özel teknik servis. Ege Bölge Teknik Servis hizmet bölgelerini inceleyin."],
  "hakkimizda": ["Hakkımızda | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis Hizmetleri hakkında bilgi ve İzmir'deki bağımsız özel teknik servis yaklaşımı."],
  "iletisim": ["İletişim | Ege Bölge Teknik Servis", "İzmir Buca'da Ege Bölge Teknik Servis iletişim bilgileri."],
  "gizlilik-politikasi": ["Gizlilik Politikası | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis gizlilik politikası."],
  "cerez-politikasi": ["Çerez Politikası | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis çerez politikası."],
} as const;

export type PageRoute =
  | { kind: "information"; slug: string; metadata: readonly [string, string] }
  | { kind: "service"; slug: string; service: (typeof SERVICES)[number] }
  | { kind: "brand"; slug: string; brand: Brand };

// Future route types must join this registry, rather than a parallel lookup.
const RESERVED_PATHS = ["", "sitemap.xml", "robots.txt", "manifest.webmanifest", "favicon.ico", "icon.png", "apple-icon.png"];

export function assertUniqueRoutePaths(entries: readonly { slug: string }[], reservedPaths: readonly string[] = RESERVED_PATHS) {
  const seen = new Set(reservedPaths);
  for (const { slug } of entries) {
    if (!/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid canonical route: ${slug}`);
    if (seen.has(slug)) throw new Error(`Route collision: ${slug}`);
    seen.add(slug);
  }
}

export const PAGE_ROUTES: readonly PageRoute[] = [
  ...Object.entries(INFORMATION_PAGES).map(([slug, metadata]) => ({ kind: "information" as const, slug, metadata })),
  ...SERVICES.map(service => ({ kind: "service" as const, slug: service.slug, service })),
  ...BRAND_DIRECTORY.map(brand => ({ kind: "brand" as const, slug: brand.slug, brand })),
];

assertUniqueRoutePaths(PAGE_ROUTES);
const routesByPath = new Map(PAGE_ROUTES.map(route => [route.slug, route]));
export function resolvePageRoute(path: string): PageRoute | undefined { return routesByPath.get(path); }
export function getCanonicalPaths(): readonly string[] { return ["/", ...PAGE_ROUTES.map(route => `/${route.slug}`)]; }
