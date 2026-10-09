import type { SERVICES } from "./data";

type ServiceLanding = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  serviceGroup?: {
    title: string;
    slugs: readonly (typeof SERVICES)[number]["slug"][];
  };
  issuesTitle: string;
  issuesIntro: string;
  issues: readonly string[];
  detailsTitle: string;
  details: readonly string[];
  areasTitle: string;
  contactTitle: string;
  contactText: string;
};

// Add service-specific content here to reuse the same landing page layout.
export const SERVICE_LANDINGS: Record<(typeof SERVICES)[number]["slug"], ServiceLanding> = {
  "tv-tamiri": {
    title: "Televizyon Tamiri | TV Servisi | Ege Bölge",
    description: "İzmir ve Aydın’da LED, LCD ve Smart TV'lerde görüntü, ses ve açılmama sorunları için bağımsız özel televizyon servisi. TV tamiri için telefonla ulaşın.",
    eyebrow: "EGE BÖLGE TEKNİK SERVİS",
    heading: "Televizyon Tamiri",
    intro: "LED, LCD ve Smart TV'lerde görüntü, ses, açılmama ve aydınlatma sorunları için bağımsız özel teknik servis desteği.",
    issuesTitle: "Televizyonunuzda hangi sorun var?",
    issuesIntro: "Aşağıdakiler teknik destek verilen yaygın arıza belirtileridir. Sorunun kaynağı ve onarım imkânı cihazın değerlendirilmesiyle belirlenir.",
    issues: [
      "Televizyon açılmıyor",
      "Görüntü var, ses yok",
      "Ses var, görüntü yok",
      "Ekran karanlık",
      "LED / arka aydınlatma sorunu",
      "Görüntü gidip geliyor",
      "Smart TV bağlantı sorunları",
      "Anakart kaynaklı arızalar",
    ],
    detailsTitle: "TV Tamiri ve Teknik Servis Desteği",
    details: [
      "Televizyonunuz açılmadığında, görüntü kesildiğinde veya ses sorunu yaşadığınızda cihazın marka/modelini ve sorunun ne zaman başladığını paylaşabilirsiniz. Televizyon tamiri için ilettiğiniz bilgiler, teknik servis ihtiyacının anlaşılmasına yardımcı olur.",
      "Benzer belirtilerin farklı nedenleri olabilir; örneğin ses varken görüntü olmaması tek başına hangi parçanın arızalı olduğunu göstermez. TV tamiri sürecinde yapılabilecek işlemler cihazın durumuna göre değerlendirilir. Televizyon servisiyle iletişime geçerken varsa ekrandaki hata mesajını veya gözlemlediğiniz sorunu telefonla anlatabilirsiniz.",
    ],
    areasTitle: "İzmir ve Aydın’da hizmet bölgelerimiz",
    contactTitle: "Televizyon arızası için bize ulaşın",
    contactText: "Cihazınızın marka/modelini ve yaşadığınız sorunu telefonla paylaşabilirsiniz.",
  },
  "klima-servisi": {
    title: "Klima Servisi | Klima Tamiri | Ege Bölge",
    description: "İzmir ve Aydın’da klima arızası, bakım, soğutma ve ısıtma sorunları için bağımsız özel klima servisi. Cihazınızın sorununu telefonla paylaşın.",
    eyebrow: "EGE BÖLGE TEKNİK SERVİS",
    heading: "Klima Servisi",
    intro: "Klima arızası, bakım, soğutma ve ısıtma sorunları için bağımsız özel teknik servis desteği.",
    issuesTitle: "Klimanızda hangi sorun var?",
    issuesIntro: "Aşağıdakiler teknik destek verilen yaygın belirtiler ve bakım ihtiyaçlarıdır. Sorunun kaynağı ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    issues: [
      "Klima soğutmuyor",
      "Klima ısıtmıyor",
      "Klima çalışmıyor",
      "Klimadan su akıyor",
      "Klima ses yapıyor",
      "Klima kötü koku yapıyor",
      "Klima hata kodu veriyor",
      "Klima bakım ihtiyacı",
    ],
    detailsTitle: "Klima Servisi ve Teknik Destek",
    details: [
      "Klimanız ortamı yeterince soğutmuyor veya ısıtmıyorsa, sorunun hangi çalışma modunda ve ne zamandır yaşandığını paylaşabilirsiniz. Klima servisi talebinizde marka/model, bulunduğunuz ilçe ve varsa ekrandaki hata kodu, ihtiyacınızı anlamamıza yardımcı olur.",
      "Su akıntısı, koku veya ses gibi belirtilerin farklı nedenleri olabilir. Klima tamiri için gerekli işlemler cihazın durumuna göre değerlendirilir. Klima bakımı talebinizde son bakım zamanını biliyorsanız belirtmeniz, kullanım koşullarıyla birlikte bakım ihtiyacının değerlendirilmesine yardımcı olur.",
    ],
    areasTitle: "İzmir ve Aydın’da hizmet bölgelerimiz",
    contactTitle: "Klima arızası veya bakım ihtiyacı için bize ulaşın",
    contactText: "Klimanızın marka/modelini, bakım talebinizi veya yaşadığınız soğutma ve ısıtma sorununu telefonla paylaşabilirsiniz.",
  },
  "kombi-servisi": {
    title: "Kombi Servisi | Kombi Tamiri | Ege Bölge",
    description: "İzmir ve Aydın’da kombi ısıtma, sıcak su, çalışma ve hata kodu sorunları için bağımsız özel kombi servisi. Teknik destek için telefonla ulaşın.",
    eyebrow: "EGE BÖLGE TEKNİK SERVİS",
    heading: "Kombi Servisi",
    intro: "Kombi ısıtma, sıcak su, çalışma ve hata kodu sorunları için bağımsız özel teknik servis desteği.",
    issuesTitle: "Kombinizde hangi sorun var?",
    issuesIntro: "Aşağıdakiler teknik destek verilen yaygın belirtiler ve bakım ihtiyaçlarıdır. Arızanın nedeni ve onarım imkânı cihazın değerlendirilmesiyle belirlenir.",
    issues: [
      "Kombi çalışmıyor",
      "Kombi sıcak su vermiyor",
      "Petekler ısınmıyor",
      "Kombi basıncı düşüyor",
      "Kombi su akıtıyor",
      "Kombi ses yapıyor",
      "Kombi hata kodu veriyor",
      "Kombi bakım ihtiyacı",
    ],
    detailsTitle: "Kombi Servisi ve Teknik Destek",
    details: [
      "Sıcak su kesintisi, peteklerin ısınmaması veya ekranda hata kodu görülmesi durumunda yaşadığınız belirtiyi bize iletebilirsiniz. Kombi servisi talebinizde cihazın marka/modelini, varsa hata kodunu ve sorunun ne zaman başladığını paylaşmanız değerlendirmeye yardımcı olur.",
      "Benzer belirtiler farklı nedenlerden kaynaklanabilir; hata kodu tek başına değişmesi gereken parçayı belirlemez. Kombi tamiri için yapılabilecek işlemler cihaz incelendikten sonra değerlendirilir. Kombi bakımı hakkında bilgi almak için cihazın kullanım durumu ve biliyorsanız son bakım tarihiyle bize ulaşabilirsiniz.",
    ],
    areasTitle: "İzmir ve Aydın’da hizmet bölgelerimiz",
    contactTitle: "Kombi arızası veya bakım ihtiyacı için bize ulaşın",
    contactText: "Kombinizin marka/modelini, varsa hata kodunu ve yaşadığınız ısıtma veya sıcak su sorununu telefonla paylaşabilirsiniz.",
  },
  "beyaz-esya-servisi": {
    title: "Beyaz Eşya Tamiri ve Servisi | Ege Bölge",
    description: "İzmir ve Aydın’da çamaşır makinesi, bulaşık makinesi, buzdolabı ve kurutma makinesi için bağımsız özel beyaz eşya servisi. Telefonla bize ulaşın.",
    eyebrow: "EGE BÖLGE TEKNİK SERVİS",
    heading: "Beyaz Eşya Servisi",
    intro: "Çamaşır makinesi, bulaşık makinesi, buzdolabı ve kurutma makinesi arızaları için bağımsız özel teknik servis desteği.",
    serviceGroup: {
      title: "Hangi beyaz eşya için destek arıyorsunuz?",
      slugs: ["camasir-makinesi-servisi", "bulasik-makinesi-servisi", "buzdolabi-servisi", "kurutma-makinesi-servisi"],
    },
    issuesTitle: "Beyaz eşyanızda hangi sorun var?",
    issuesIntro: "Aşağıdakiler farklı cihaz türlerinde karşılaşılabilen yaygın arıza belirtileridir. Sorunun kaynağı ve onarım imkânı cihazın türüne ve durumuna göre değerlendirilir.",
    issues: [
      "Cihaz çalışmıyor",
      "Su almıyor",
      "Su tahliye etmiyor",
      "Soğutmuyor",
      "Isıtmıyor / kurutmuyor",
      "Ses yapıyor",
      "Hata kodu veriyor",
      "Program tamamlanmıyor",
    ],
    detailsTitle: "Beyaz Eşya Servisi ve Teknik Destek",
    details: [
      "Çamaşır veya bulaşık makineniz programı tamamlamadığında, buzdolabınız soğutmadığında ya da kurutma makineniz çamaşırları kurutmadığında cihaz türünü ve yaşadığınız sorunu paylaşabilirsiniz. Beyaz eşya servisi talebinizde marka/model ve varsa hata kodu, teknik destek ihtiyacının anlaşılmasına yardımcı olur.",
      "Su almama, ses veya ısıtma sorunları her cihazda aynı nedene bağlı değildir. Beyaz eşya tamiri için yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir. Sorunun hangi aşamada ortaya çıktığını anlatabilir, varsa ekran mesajını telefon görüşmesinde paylaşabilirsiniz.",
    ],
    areasTitle: "İzmir ve Aydın’da hizmet bölgelerimiz",
    contactTitle: "Beyaz eşya arızası için bize ulaşın",
    contactText: "Arızalı cihazınızın türünü, marka/modelini ve yaşadığınız sorunu telefonla paylaşabilirsiniz.",
  },
  "buzdolabi-servisi": {
    "title": "Buzdolabı Tamiri ve Servisi | Ege Bölge",
    "description": "İzmir ve Aydın’da buzdolabı soğutma, ses ve su sızıntısı sorunları için bağımsız özel servis. Model ve arıza belirtisiyle bize ulaşın.",
    "eyebrow": "EGE BÖLGE TEKNİK SERVİS",
    "heading": "Buzdolabı Tamiri",
    "intro": "Buzdolabınızın soğutma, ses veya su sızıntısı sorunları için bağımsız özel servis desteği hakkında bize ulaşabilirsiniz.",
    "issuesTitle": "Buzdolabınızda neler fark ettiniz?",
    "issuesIntro": "Bu belirtiler kesin teşhis değildir. Sorunun nedeni ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    "issues": [
        "Yeterince soğutmuyor",
        "Dondurucu bölmesi soğutmuyor",
        "Normalden farklı ses geliyor",
        "Su sızıntısı görülüyor",
        "Aşırı buzlanma oluşuyor",
        "Cihaz çalışmıyor"
    ],
    "detailsTitle": "Buzdolabı Tamiri için talebinizi nasıl iletebilirsiniz?",
    "details": [
        "Soğutma sorunu yalnızca tek bir parçaya işaret etmez. Sorunun buzdolabı bölümünde mi, dondurucuda mı yoksa her ikisinde mi olduğunu ve ne zaman başladığını anlatmanız talebinizi değerlendirmemize yardımcı olur.",
        "Görüşmede marka ve modeli, varsa ekrandaki uyarıyı ve bulunduğunuz ilçe bilgisini paylaşın. Cihazı sökmeniz veya parçalarını kontrol etmeniz gerekmez. Yapılabilecek onarım işlemleri cihazın durumu değerlendirilerek belirlenir."
    ],
    "areasTitle": "İzmir ve Aydın’da hizmet bölgelerimiz",
    "contactTitle": "Servis talebiniz için bize ulaşın",
    "contactText": "Cihaz ve ilçe bilginizi 7/24 çağrı merkezimize iletebilirsiniz."
},
  "camasir-makinesi-servisi": {
    "title": "Çamaşır Makinesi Tamiri | Ege Bölge",
    "description": "İzmir ve Aydın’da çamaşır makinesi yıkama, sıkma ve tahliye sorunları için bağımsız özel servis. Arıza belirtinizi telefonla paylaşın.",
    "eyebrow": "EGE BÖLGE TEKNİK SERVİS",
    "heading": "Çamaşır Makinesi Tamiri",
    "intro": "Çamaşır makinenizde yıkama, sıkma, su alma veya tahliye sorunu olduğunda yaşadığınız belirtiyi telefonla paylaşabilirsiniz.",
    "issuesTitle": "Yıkamanın hangi aşamasında sorun var?",
    "issuesIntro": "Bu belirtiler kesin teşhis değildir. Sorunun nedeni ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    "issues": [
        "Makine su almıyor",
        "Suyu tahliye etmiyor",
        "Sıkma yapmıyor",
        "Program yarıda duruyor",
        "Normalden fazla ses veya titreşim var",
        "Su sızıntısı görülüyor"
    ],
    "detailsTitle": "Çamaşır Makinesi Tamiri için talebinizi nasıl iletebilirsiniz?",
    "details": [
        "Yıkama başlangıcında su almama ile program sonunda suyu boşaltamama farklı değerlendirmeler gerektirir. Sorunun hangi aşamada ortaya çıktığını, her yıkamada tekrarlayıp tekrarlamadığını ve varsa hata mesajını belirtin.",
        "Marka/model ve ilçe bilgisiyle servis talebinizi iletebilirsiniz. Bir belirti tek başına arızalı parçayı göstermez; onarım kapsamı cihazın değerlendirilmesiyle netleşir. Sorunu yeniden göstermek için makineyi çalıştırmanız ya da bağlantılarını ayırmanız gerekmez."
    ],
    "areasTitle": "İzmir ve Aydın’da hizmet bölgelerimiz",
    "contactTitle": "Servis talebiniz için bize ulaşın",
    "contactText": "Cihaz ve ilçe bilginizi 7/24 çağrı merkezimize iletebilirsiniz."
},
  "bulasik-makinesi-servisi": {
    "title": "Bulaşık Makinesi Tamiri | Ege Bölge",
    "description": "İzmir ve Aydın’da bulaşık makinesi yıkama, su alma ve tahliye sorunları için bağımsız özel servis. Talebinizi EBTS’ye iletin.",
    "eyebrow": "EGE BÖLGE TEKNİK SERVİS",
    "heading": "Bulaşık Makinesi Tamiri",
    "intro": "Bulaşık makinenizde temiz yıkamama, su alma, tahliye veya çalışma sorunu için bağımsız özel servis talebinizi iletebilirsiniz.",
    "issuesTitle": "Bulaşık makinenizde hangi belirti var?",
    "issuesIntro": "Bu belirtiler kesin teşhis değildir. Sorunun nedeni ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    "issues": [
        "Bulaşıklar temiz çıkmıyor",
        "Makine su almıyor",
        "İçinde su kalıyor",
        "Program duruyor",
        "Su sızıntısı görülüyor",
        "Hata mesajı gösteriyor"
    ],
    "detailsTitle": "Bulaşık Makinesi Tamiri için talebinizi nasıl iletebilirsiniz?",
    "details": [
        "Bulaşıkların temiz çıkmaması, makinenin içinde su kalması ve programın durması aynı sorunu ifade etmez. Hangi belirtiyi gördüğünüzü, kullandığınız programı biliyorsanız adını ve sorunun başlangıcını anlatabilirsiniz.",
        "İlk görüşmede cihazın marka/modelini, bulunduğu ilçeyi ve varsa ekrandaki mesajı paylaşın. Bu bilgiler kesin teşhis yerine talebin anlaşılmasını sağlar. Gerekli işlemler cihazın durumuna göre değerlendirilir; cihazı yerinden çıkarmanız istenmez."
    ],
    "areasTitle": "İzmir ve Aydın’da hizmet bölgelerimiz",
    "contactTitle": "Servis talebiniz için bize ulaşın",
    "contactText": "Cihaz ve ilçe bilginizi 7/24 çağrı merkezimize iletebilirsiniz."
},
  "kurutma-makinesi-servisi": {
    "title": "Kurutma Makinesi Tamiri | Ege Bölge",
    "description": "İzmir ve Aydın’da kurutma makinesi kurutmama, ısıtma ve durma sorunları için bağımsız özel servis. Cihazınızın durumunu telefonla anlatın.",
    "eyebrow": "EGE BÖLGE TEKNİK SERVİS",
    "heading": "Kurutma Makinesi Tamiri",
    "intro": "Kurutma makineniz çamaşırları yeterince kurutmuyor, ısıtmıyor veya çalışma sırasında duruyorsa servis talebinizi bizimle paylaşın.",
    "issuesTitle": "Kurutma sırasında ne oluyor?",
    "issuesIntro": "Bu belirtiler kesin teşhis değildir. Sorunun nedeni ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    "issues": [
        "Çamaşırlar nemli kalıyor",
        "Cihaz ısıtmıyor",
        "Program beklenenden uzun sürüyor",
        "Çalışma sırasında duruyor",
        "Olağandışı ses geliyor",
        "Ekranda uyarı görülüyor"
    ],
    "detailsTitle": "Kurutma Makinesi Tamiri için talebinizi nasıl iletebilirsiniz?",
    "details": [
        "Kurutma sonucunu anlatırken çamaşırların nemli kalıp kalmadığını, cihazın çalışmayı tamamlayıp tamamlamadığını ve gördüğünüz uyarıları belirtin. Tek başına uzun program süresi hangi parçanın arızalı olduğunu göstermez.",
        "Marka ve model bilgisini biliyorsanız görüşmeye hazırlayın; bilmiyorsanız cihazı sökmeden gördüğünüz durumu anlatmanız yeterlidir. İl ve ilçe bilginizle talebin kapsamını görüşebilir, cihaz değerlendirmesi sonrasında yapılabilecek işlemler hakkında bilgi alabilirsiniz."
    ],
    "areasTitle": "İzmir ve Aydın’da hizmet bölgelerimiz",
    "contactTitle": "Servis talebiniz için bize ulaşın",
    "contactText": "Cihaz ve ilçe bilginizi 7/24 çağrı merkezimize iletebilirsiniz."
},
  "isi-pompasi-servisi": {
    "title": "Isı Pompası Servisi | Ege Bölge",
    "description": "İzmir ve Aydın’da ısı pompası bakım ve arıza talepleri için bağımsız özel servis. Sistem bilgilerinizi paylaşarak işlem kapsamını görüşün.",
    "eyebrow": "EGE BÖLGE TEKNİK SERVİS",
    "heading": "Isı Pompası Servisi",
    "intro": "Isı pompanızın bakım veya arıza değerlendirmesi ihtiyacı için cihaz bilgilerinizi ve gözlemlediğiniz durumu telefonla iletebilirsiniz.",
    "issuesTitle": "Sistemde hangi değişikliği fark ettiniz?",
    "issuesIntro": "Bu belirtiler kesin teşhis değildir. Sorunun nedeni ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    "issues": [
        "Beklenen ısıtma sağlanmıyor",
        "Sistem çalışmıyor",
        "Çalışma sırasında duruyor",
        "Olağandışı ses duyuluyor",
        "Kontrol ekranında uyarı görülüyor",
        "Bakım ihtiyacı hakkında bilgi isteniyor"
    ],
    "detailsTitle": "Isı Pompası Servisi için talebinizi nasıl iletebilirsiniz?",
    "details": [
        "Isı pompasıyla ilgili talebinizde mevcut marka/model bilgisini, kontrol ekranında görünen mesajı ve sorunun ne zaman başladığını aktarın. Gözlemleriniz tek başına kesin teşhis oluşturmaz; sistemin durumu değerlendirilmelidir.",
        "Sisteminiz için yapılabilecek işlemleri ilk görüşmede sorun. Bakım talebinizi arıza belirtisinden ayrı olarak açıklayabilir, bulunduğunuz il ve ilçeyi paylaşabilirsiniz. Sistem türüne veya parça ihtiyacına ilişkin kapsam, cihaz bilgisi değerlendirilmeden varsayılmaz."
    ],
    "areasTitle": "İzmir ve Aydın’da hizmet bölgelerimiz",
    "contactTitle": "Servis talebiniz için bize ulaşın",
    "contactText": "Cihaz ve ilçe bilginizi 7/24 çağrı merkezimize iletebilirsiniz."
},
  "vrf-servisi": {
    "title": "VRF Klima Servisi | Ege Bölge",
    "description": "İzmir ve Aydın’da VRF klima sistemleri için bakım ve teknik destek talepleri. Sistem ve belirti bilgisiyle bağımsız özel servis kapsamını görüşün.",
    "eyebrow": "EGE BÖLGE TEKNİK SERVİS",
    "heading": "VRF Klima Sistemleri Servisi",
    "intro": "VRF klima sisteminizin bakım veya teknik destek ihtiyacını EBTS’ye iletebilirsiniz. Sistem bilgisi ve yaşadığınız belirti üzerinden talebin kapsamını görüşün.",
    "issuesTitle": "VRF sisteminizde hangi belirti var?",
    "issuesIntro": "Bu belirtiler kesin teşhis değildir. Sorunun nedeni ve yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir.",
    "issues": [
        "Beklenen soğutma veya ısıtma sağlanmıyor",
        "Sistem devreye girmiyor",
        "Çalışma kesintiye uğruyor",
        "Kontrol ekranında hata mesajı görülüyor",
        "Olağandışı ses duyuluyor",
        "Bakım hakkında bilgi isteniyor"
    ],
    "detailsTitle": "VRF Klima Sistemleri Servisi için talebinizi nasıl iletebilirsiniz?",
    "details": [
        "Sorunun tüm sistemde mi yoksa belirli bir alanda mı hissedildiğini, ne zaman başladığını ve varsa kontrol ekranındaki mesajı belirtin. Bu gözlemler arızanın nedenini kesinleştirmez; değerlendirme için başlangıç bilgisi sağlar.",
        "İletişim sırasında bildiğiniz marka/modeli ve sistemin bulunduğu il ve ilçeyi paylaşın. Bakım ya da arıza talebinize ilişkin yapılabilecek işlemleri birlikte netleştirin. Belirli sistem türleri veya uygulamalar için hizmet kapsamı, ilk görüşmede cihaz bilgileriyle değerlendirilir."
    ],
    "areasTitle": "İzmir ve Aydın’da hizmet bölgelerimiz",
    "contactTitle": "Servis talebiniz için bize ulaşın",
    "contactText": "Cihaz ve ilçe bilginizi 7/24 çağrı merkezimize iletebilirsiniz."
},
};
