import { IZMIR_SERVICE_AREAS, AYDIN_SERVICE_AREAS } from "./regions";
import { SERVICES } from "./data";
import { BRAND_DIRECTORY, type Brand } from "./brands";

export const INFORMATION_PAGES = {
  "markalar": ["Hizmet Verilen Markalar | Ege Bölge Teknik Servis", "İzmir ve Aydın’da hizmet verilen markaları inceleyin. EBTS bağımsız özel teknik servistir; markaların yetkili servisi değildir."],
  "hizmet-bolgeleri": ["İzmir ve Aydın Teknik Servis Hizmet Bölgeleri | Ege Bölge Teknik Servis", `İzmir’de listelenen ${IZMIR_SERVICE_AREAS.length} ilçede ve Aydın’ın ${AYDIN_SERVICE_AREAS.length} ilçesinde bağımsız özel teknik servis. Ege Bölge Teknik Servis hizmet bölgelerini inceleyin.`],
  "hakkimizda": ["Hakkımızda | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis’in bağımsız özel servis yaklaşımı, İzmir ve Aydın hizmet kapsamı ve telefonla iletişim süreci."],
  "iletisim": ["İletişim | Ege Bölge Teknik Servis", "Ege Bölge Teknik Servis 7/24 çağrı merkezi ve Buca / İzmir iletişim adresi. İzmir ve Aydın hizmet bölgeleri için bize ulaşın."],
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
