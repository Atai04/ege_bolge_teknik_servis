export const COMPANY={name:"Ege Bölge Teknik Servis Hizmetleri",shortName:"EGE BÖLGE",phoneDisplay:"0850 302 24 36",phoneHref:"tel:+908503022436",mobileDisplay:"0507 650 98 07",mobileHref:"tel:+905076509807",whatsappUrl:"https://wa.me/905076509807",email:"info@egebolgeteknikservis.com",serviceEmail:"servis@egebolgeteknikservis.com",address:"Fırat Mah. 289/59 Sk. No:7/A, 35380 Buca / İzmir",hours:"08:00–19:00",website:"https://www.egebolgeteknikservis.com"};
/** Individual appliance visuals support the relevant service card. The hero photograph
 * is generic illustrative imagery and does not represent an Ege Bölge employee. */
export const SERVICE_VISUALS={
  whiteGoods:{src:"/images/services/beyaz-esya-servisi.png",alt:"Beyaz eşya teknik servis hizmeti"},
  washingMachine:{src:"/images/services/beyaz-esya-servisi.png",alt:"Çamaşır makinesi teknik servis hizmeti"},
  dishwasher:{src:"/images/services/bulasik-makinesi-servisi.png",alt:"Bulaşık makinesi teknik servis hizmeti"},
  refrigerator:{src:"/images/services/buzdolabi-servisi.png",alt:"Buzdolabı teknik servis hizmeti"},
  dryer:{src:"/images/services/kurutma-makinesi-servisi.png",alt:"Kurutma makinesi teknik servis hizmeti"},
  airConditioner:{src:"/images/services/klima-servisi.png",alt:"Klima teknik servis hizmeti"},
  boiler:{src:"/images/services/kombi-servisi.png",alt:"Kombi teknik servis hizmeti"},
  tv:{src:"/images/services/tv-servisi.png",alt:"Televizyon teknik servis hizmeti"},
  heatPump:{src:"/images/services/isi-pompasi-servisi.png",alt:"Isı pompası teknik servis hizmeti"},
  vrf:{src:"/images/services/vrf-servisi.png",alt:"VRF klima sistemleri teknik servis hizmeti"}
} as const;
export const SERVICES=[
  {slug:"beyaz-esya-servisi",name:"Beyaz Eşya Servisi",short:"Beyaz Eşya",icon:"⌂",visual:"whiteGoods",description:"Çamaşır makinesi, bulaşık makinesi, buzdolabı ve diğer ev cihazları için bağımsız teknik servis desteği."},
  {slug:"camasir-makinesi-servisi",name:"Çamaşır Makinesi Servisi",short:"Çamaşır Makinesi",icon:"◌",visual:"washingMachine",description:"İzmir'de çamaşır makinesi arıza tespiti, bakım ve onarım için bağımsız teknik servis desteği."},
  {slug:"buzdolabi-servisi",name:"Buzdolabı Servisi",short:"Buzdolabı",icon:"□",visual:"refrigerator",description:"İzmir'de buzdolabı soğutma ve kullanım sorunları için bağımsız teknik servis desteği."},
  {slug:"bulasik-makinesi-servisi",name:"Bulaşık Makinesi Servisi",short:"Bulaşık Makinesi",icon:"◇",visual:"dishwasher",description:"İzmir'de bulaşık makinesi arıza, bakım ve onarım ihtiyaçları için teknik destek."},
  {slug:"kurutma-makinesi-servisi",name:"Kurutma Makinesi Servisi",short:"Kurutma Makinesi",icon:"○",visual:"dryer",description:"İzmir'de kurutma makinesi arızaları ve bakım ihtiyacı için bağımsız teknik servis desteği."},
  {slug:"klima-servisi",name:"Klima Servisi",short:"Klima",icon:"✳",visual:"airConditioner",description:"Klima sistemleri için arıza tespiti, bakım ve onarım desteği."},
  {slug:"kombi-servisi",name:"Kombi Servisi",short:"Kombi",icon:"♨",visual:"boiler",description:"Kombi sistemleri için bağımsız teknik servis desteği."},
  {slug:"tv-tamiri",name:"TV Tamiri",short:"TV Tamiri",icon:"▣",visual:"tv",description:"Televizyonlarda görülen arızalar için teknik inceleme ve bağımsız teknik servis desteği."},
  {slug:"isi-pompasi-servisi",name:"Isı Pompası Servisi",short:"Isı Pompası",icon:"◉",visual:"heatPump",description:"Isı pompası sistemleri için bağımsız teknik servis ve bakım desteği."},
  {slug:"vrf-servisi",name:"VRF Sistemleri Servisi",short:"VRF Sistemleri",icon:"◫",visual:"vrf",description:"VRF klima sistemleri için bağımsız teknik servis ve bakım desteği."}
] as const;
export const BRANDS=["Arçelik","Beko","Vestel","Bosch","Siemens","Samsung","LG","Profilo","Altus","Regal","Grundig","Electrolux","Whirlpool","Hoover","Indesit"];
export const AREAS=["Buca","Konak","Karabağlar","Bornova","Bayraklı","Gaziemir","Balçova","Narlıdere","Güzelbahçe","Karşıyaka","Çiğli","Menemen","Torbalı","Kemalpaşa","Menderes","Seferihisar","Urla","Foça","Aliağa","Selçuk"];
