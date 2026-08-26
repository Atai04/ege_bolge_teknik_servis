import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ege Bölge Teknik Servis Hizmetleri",
    short_name: "Ege Bölge",
    description: "İzmir'de bağımsız özel teknik servis hizmeti.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#061e35",
    icons: [
      { src: "/icon-192.png?v=ege-bolge-20260826", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png?v=ege-bolge-20260826", sizes: "512x512", type: "image/png" },
    ],
  };
}
