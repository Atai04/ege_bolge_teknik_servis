import type { Metadata } from "next";
import { COMPANY } from "./data";

export const DEFAULT_OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: COMPANY.name };

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt: string };
};

export function buildPageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "tr_TR",
      siteName: COMPANY.name,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function breadcrumbSchema(items: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${COMPANY.website}${item.path}`,
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: `${COMPANY.website}${input.path}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${COMPANY.website}/#business`,
      name: COMPANY.name,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "İzmir" },
      { "@type": "AdministrativeArea", name: "Aydın" },
    ],
  };
}