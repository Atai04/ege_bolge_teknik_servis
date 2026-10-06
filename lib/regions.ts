/** Confirmed business coverage. Administrative neighborhood research is not published. */
export interface ServiceProvince {
  readonly id: "izmir" | "aydin";
  readonly name: string;
  readonly districts: readonly string[];
  readonly exclusions: readonly string[];
}

export const IZMIR_SERVICE_AREAS = ["Buca","Konak","Karabağlar","Bornova","Bayraklı","Gaziemir","Balçova","Narlıdere","Güzelbahçe","Karşıyaka","Çiğli","Menemen","Torbalı","Kemalpaşa","Menderes","Seferihisar","Urla","Foça","Aliağa","Selçuk"] as const;
export const AYDIN_SERVICE_AREAS = [
  "Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik",
  "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası",
  "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar",
] as const;
export const SERVICE_PROVINCES: readonly ServiceProvince[] = [
  { id: "izmir", name: "İzmir", districts: IZMIR_SERVICE_AREAS, exclusions: ["Beydağ", "Kiraz", "Ödemiş"] },
  { id: "aydin", name: "Aydın", districts: AYDIN_SERVICE_AREAS, exclusions: [] },
];

export const SERVICE_AREA_SCHEMA = SERVICE_PROVINCES.flatMap(province =>
  province.districts.map(name => ({
    "@type": "AdministrativeArea" as const,
    name,
    containedInPlace: {
      "@type": "AdministrativeArea" as const,
      name: province.name,
      containedInPlace: { "@type": "Country" as const, name: "Türkiye" },
    },
  })),
);
