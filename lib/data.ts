export const COMPANY={name:"Ege Bölge Teknik Servis Hizmetleri",shortName:"EGE BÖLGE",phoneDisplay:"0850 302 24 36",phoneHref:"tel:+908503022436",mobileDisplay:"0507 650 98 07",mobileHref:"tel:+905076509807",whatsappUrl:"https://wa.me/905076509807",email:"info@egebolgeteknikservis.com",address:"Fırat Mah. 289/59 Sk. No:7/A, 35380 Buca / İzmir",hours:"08:00–19:00",website:"https://www.egebolgeteknikservis.com"};
/** Individual appliance visuals support the relevant service card. The hero photograph
 * is generic illustrative imagery and does not represent an Ege Bölge employee. */
export const SERVICE_VISUALS={
  whiteGoods:{src:"/images/services/appliance-service-sheet.png",alt:"Beyaz eşya teknik servis hizmetleri"},
  washingMachine:{src:"/images/services/camasir-makinesi-premium.webp",alt:"Modern çamaşır odasında çamaşır makinesi"},
  dishwasher:{src:"/images/services/bulasik-makinesi-premium.webp",alt:"Modern mutfakta bulaşık makinesi"},
  refrigerator:{src:"/images/services/buzdolabi-premium.webp",alt:"Modern mutfakta buzdolabı"},
  dryer:{src:"/images/services/kurutma-makinesi-servisi.png",alt:"Kurutma makinesi teknik servis hizmeti"},
  airConditioner:{src:"/images/services/klima-premium.webp",alt:"Modern salonda duvar tipi klima"},
  boiler:{src:"/images/services/kombi-premium.webp",alt:"Modern teknik alanda duvar tipi kombi"},
  tv:{src:"/images/services/televizyon-premium.webp",alt:"Modern oturma odasında televizyon"},
  heatPump:{src:"/images/services/isi-pompasi-premium.webp",alt:"Modern evin dışında ısı pompası ünitesi"},
  vrf:{src:"/images/services/vrf-premium.webp",alt:"Ticari binada VRF klima dış üniteleri"}
} as const;
export const SERVICES=[
  {slug:"beyaz-esya-servisi",name:"Beyaz Eşya Servisi",short:"Beyaz Eşya",icon:"⌂",visual:"whiteGoods",description:"Ev cihazlarında arıza, bakım ve onarım desteği."},
  {slug:"camasir-makinesi-servisi",name:"Çamaşır Makinesi Servisi",short:"Çamaşır Makinesi",icon:"◌",visual:"washingMachine",description:"Yıkama, sıkma, su alma ve tahliye sorunları."},
  {slug:"buzdolabi-servisi",name:"Buzdolabı Servisi",short:"Buzdolabı",icon:"□",visual:"refrigerator",description:"Soğutmama, ses ve kullanım sorunları."},
  {slug:"bulasik-makinesi-servisi",name:"Bulaşık Makinesi Servisi",short:"Bulaşık Makinesi",icon:"◇",visual:"dishwasher",description:"Yıkama, su alma ve tahliye sorunları."},
  {slug:"kurutma-makinesi-servisi",name:"Kurutma Makinesi Servisi",short:"Kurutma Makinesi",icon:"○",visual:"dryer",description:"Kurutmama, ısıtma ve çalışma sorunları."},
  {slug:"klima-servisi",name:"Klima Servisi",short:"Klima",icon:"✳",visual:"airConditioner",description:"Arıza tespiti, bakım ve onarım."},
  {slug:"kombi-servisi",name:"Kombi Servisi",short:"Kombi",icon:"♨",visual:"boiler",description:"Isıtma, sıcak su ve hata kodu sorunları."},
  {slug:"tv-tamiri",name:"Televizyon Servisi",short:"Televizyon",icon:"▣",visual:"tv",description:"Görüntü, ses ve açılmama sorunları."},
  {slug:"isi-pompasi-servisi",name:"Isı Pompası Servisi",short:"Isı Pompası",icon:"◉",visual:"heatPump",description:"Bakım, arıza tespiti ve onarım."},
  {slug:"vrf-servisi",name:"VRF Klima Sistemleri",short:"VRF Sistemleri",icon:"◫",visual:"vrf",description:"VRF sistemlerinde bakım ve teknik destek."}
] as const;
export type BrandCategory = "Beyaz Eşya" | "Klima" | "Kombi";
export type BrandEntry = { name: string; categories: BrandCategory[]; note?: string };
export const BRAND_DIRECTORY: BrandEntry[] = [
  { name: "Altus", categories: ["Beyaz Eşya"] }, { name: "Amana", categories: ["Beyaz Eşya"] }, { name: "Arçelik", categories: ["Beyaz Eşya", "Klima"] }, { name: "Baymak", categories: ["Kombi"] }, { name: "Beko", categories: ["Beyaz Eşya"] }, { name: "Bosch", categories: ["Beyaz Eşya", "Kombi"] }, { name: "Buderus", categories: ["Kombi"] }, { name: "Daikin", categories: ["Klima"] }, { name: "DemirDöküm", categories: ["Kombi"] }, { name: "E.C.A.", categories: ["Kombi"] }, { name: "Electrolux", categories: ["Beyaz Eşya"] }, { name: "Gaggenau", categories: ["Beyaz Eşya"] }, { name: "Grundig", categories: ["Beyaz Eşya"] }, { name: "Hoover", categories: ["Beyaz Eşya"] }, { name: "Indesit", categories: ["Beyaz Eşya"] }, { name: "LG", categories: ["Beyaz Eşya"] }, { name: "Mitsubishi Electric", categories: ["Klima"] }, { name: "Mitsubishi Heavy Industries", categories: ["Klima"] }, { name: "Profilo", categories: ["Beyaz Eşya"] }, { name: "Regal", categories: ["Beyaz Eşya"] }, { name: "Samsung", categories: ["Beyaz Eşya"] }, { name: "Siemens", categories: ["Beyaz Eşya"] }, { name: "Sub-Zero", categories: ["Beyaz Eşya"], note: "Buzdolabı ve soğutma sistemleri" }, { name: "Toshiba", categories: ["Klima"] }, { name: "Vaillant", categories: ["Kombi"] }, { name: "Vestel", categories: ["Beyaz Eşya"] }, { name: "Viessmann", categories: ["Kombi"] }, { name: "Whirlpool", categories: ["Beyaz Eşya"] },
];
export const BRANDS = BRAND_DIRECTORY.map((brand) => brand.name);
export const AREAS=["Buca","Konak","Karabağlar","Bornova","Bayraklı","Gaziemir","Balçova","Narlıdere","Güzelbahçe","Karşıyaka","Çiğli","Menemen","Torbalı","Kemalpaşa","Menderes","Seferihisar","Urla","Foça","Aliağa","Selçuk"];
