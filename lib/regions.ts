/** Confirmed business coverage. Administrative neighborhood research is not published. */
export interface ServiceProvince {
  readonly id: "izmir" | "aydin";
  readonly name: string;
  readonly districts: readonly string[];
  readonly exclusions: readonly string[];
}

export const IZMIR_SERVICE_AREAS = ["Buca","Konak","Karabağlar","Bornova","Bayraklı","Gaziemir","Balçova","Narlıdere","Güzelbahçe","Karşıyaka","Çiğli","Menemen","Torbalı","Kemalpaşa","Menderes","Seferihisar","Urla","Foça","Aliağa","Selçuk","Bayındır","Bergama","Çeşme","Dikili","Karaburun","Kınık","Tire"] as const;
export const IZMIR_EXCLUDED_AREAS = ["Beydağ", "Kiraz", "Ödemiş"] as const;
// All 30 administrative districts are accounted for; exclusions are never service areas.
export const IZMIR_ADMINISTRATIVE_DISTRICTS = [...IZMIR_SERVICE_AREAS, ...IZMIR_EXCLUDED_AREAS] as const;
export const AYDIN_SERVICE_AREAS = [
  "Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik",
  "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası",
  "Kuyucak", "Nazilli", "Söke", "Sultanhisar", "Yenipazar",
] as const;
export const SERVICE_PROVINCES: readonly ServiceProvince[] = [
  { id: "izmir", name: "İzmir", districts: IZMIR_SERVICE_AREAS, exclusions: IZMIR_EXCLUDED_AREAS },
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
