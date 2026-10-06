export const BUSINESS_HOURS = { opens: "08:00", closes: "22:00" } as const;
export const COMPANY={name:"Ege Bölge Teknik Servis Hizmetleri",phoneDisplay:"0533 231 9469",phoneHref:"tel:+905332319469",email:"info@egebolgeteknikservis.com",address:"Fırat Mah. 289/59 Sk. No:7/A, 35380 Buca / İzmir",hours:`Her gün ${BUSINESS_HOURS.opens}–${BUSINESS_HOURS.closes}`,openingHours:`Mo-Su ${BUSINESS_HOURS.opens}-${BUSINESS_HOURS.closes}`,website:"https://www.egebolgeteknikservis.com"};
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
  {slug:"beyaz-esya-servisi",name:"Beyaz Eşya Servisi",short:"Beyaz Eşya",visual:"whiteGoods",description:"Ev cihazlarında arıza, bakım ve onarım desteği."},
  {slug:"camasir-makinesi-servisi",name:"Çamaşır Makinesi Servisi",short:"Çamaşır Makinesi",visual:"washingMachine",description:"Yıkama, sıkma, su alma ve tahliye sorunları."},
  {slug:"buzdolabi-servisi",name:"Buzdolabı Servisi",short:"Buzdolabı",visual:"refrigerator",description:"Soğutmama, ses ve kullanım sorunları."},
  {slug:"bulasik-makinesi-servisi",name:"Bulaşık Makinesi Servisi",short:"Bulaşık Makinesi",visual:"dishwasher",description:"Yıkama, su alma ve tahliye sorunları."},
  {slug:"kurutma-makinesi-servisi",name:"Kurutma Makinesi Servisi",short:"Kurutma Makinesi",visual:"dryer",description:"Kurutmama, ısıtma ve çalışma sorunları."},
  {slug:"klima-servisi",name:"Klima Servisi",short:"Klima",visual:"airConditioner",description:"Arıza tespiti, bakım ve onarım."},
  {slug:"kombi-servisi",name:"Kombi Servisi",short:"Kombi",visual:"boiler",description:"Isıtma, sıcak su ve hata kodu sorunları."},
  {slug:"tv-tamiri",name:"Televizyon Servisi",short:"Televizyon",visual:"tv",description:"Görüntü, ses ve açılmama sorunları."},
  {slug:"isi-pompasi-servisi",name:"Isı Pompası Servisi",short:"Isı Pompası",visual:"heatPump",description:"Bakım, arıza tespiti ve onarım."},
  {slug:"vrf-servisi",name:"VRF Klima Sistemleri",short:"VRF Sistemleri",visual:"vrf",description:"VRF sistemlerinde bakım ve teknik destek."}
] as const;
export { BRAND_DIRECTORY } from "./brands";
// Legacy consumers remain scoped to confirmed İzmir service districts.
export { IZMIR_SERVICE_AREAS as AREAS } from "./regions";
