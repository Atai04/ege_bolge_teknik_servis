import { JsonLd } from "./JsonLd";
import { SERVICE_LANDINGS } from "../lib/service-landings";
import { breadcrumbSchema, serviceSchema } from "../lib/seo";
import type { SERVICES } from "../lib/data";

type ServiceItem = (typeof SERVICES)[number];

export function ServiceSchema({ service }: { service: ServiceItem }) {
  const landing = SERVICE_LANDINGS[service.slug];
  const path = `/${service.slug}`;
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Ana Sayfa", path: "/" }, { name: service.name, path }])} />
      <JsonLd
        data={serviceSchema({
          name: landing?.heading ?? service.name,
          description: landing?.description ?? service.description,
          path,
        })}
      />
    </>
  );
}