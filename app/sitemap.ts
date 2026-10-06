import type { MetadataRoute } from "next";
import { COMPANY } from "../lib/data";
import { getCanonicalPaths } from "../lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getCanonicalPaths().map(path => ({ url: `${COMPANY.website}${path}`, lastModified: new Date() }));
}
