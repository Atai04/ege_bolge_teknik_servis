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
export const SERVICE_LANDINGS: Partial<Record<(typeof SERVICES)[number]["slug"], ServiceLanding>> = {
  "tv-tamiri": {
    title: "İzmir Televizyon Tamiri | TV Servisi | Ege Bölge",
    description: "İzmir'de LED, LCD ve Smart TV'lerde görüntü, ses ve açılmama sorunları için bağımsız özel televizyon servisi. TV tamiri için telefon veya WhatsApp'tan ulaşın.",
    eyebrow: "İzmir Televizyon Teknik Servisi",
    heading: "İzmir Televizyon Tamiri",
    intro: "LED, LCD ve Smart TV'lerde görüntü, ses, açılmama ve aydınlatma sorunları için İzmir genelinde bağımsız özel teknik servis desteği.",
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
    detailsTitle: "İzmir TV Tamiri ve Teknik Servis Desteği",
    details: [
      "Televizyonunuz açılmadığında, görüntü kesildiğinde veya ses sorunu yaşadığınızda cihazın marka/modelini ve sorunun ne zaman başladığını paylaşabilirsiniz. İzmir'de televizyon tamiri için ilettiğiniz bilgiler, teknik servis ihtiyacının anlaşılmasına yardımcı olur.",
      "Benzer belirtilerin farklı nedenleri olabilir; örneğin ses varken görüntü olmaması tek başına hangi parçanın arızalı olduğunu göstermez. TV tamiri sürecinde yapılabilecek işlemler cihazın durumuna göre değerlendirilir. Televizyon servisiyle iletişime geçerken varsa ekrandaki hata mesajını veya sorunu gösteren bir fotoğrafı WhatsApp üzerinden iletebilirsiniz.",
    ],
    areasTitle: "İzmir Televizyon Servis Bölgeleri",
    contactTitle: "Televizyon arızası için bize ulaşın",
    contactText: "Cihazınızın marka/modelini ve yaşadığınız sorunu telefon veya WhatsApp üzerinden paylaşabilirsiniz.",
  },
  "klima-servisi": {
    title: "İzmir Klima Servisi | Klima Tamiri | Ege Bölge",
    description: "İzmir'de klima arızası, bakım, soğutma ve ısıtma sorunları için bağımsız özel klima servisi. Cihazınızın sorununu telefon veya WhatsApp üzerinden paylaşın.",
    eyebrow: "İzmir Klima Teknik Servisi",
    heading: "İzmir Klima Servisi",
    intro: "Klima arızası, bakım, soğutma ve ısıtma sorunları için İzmir genelinde bağımsız özel teknik servis desteği.",
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
    detailsTitle: "İzmir Klima Servisi ve Teknik Destek",
    details: [
      "Klimanız ortamı yeterince soğutmuyor veya ısıtmıyorsa, sorunun hangi çalışma modunda ve ne zamandır yaşandığını paylaşabilirsiniz. Klima servisi talebinizde marka/model, bulunduğunuz ilçe ve varsa ekrandaki hata kodu, ihtiyacınızı anlamamıza yardımcı olur.",
      "Su akıntısı, koku veya ses gibi belirtilerin farklı nedenleri olabilir. Klima tamiri için gerekli işlemler cihazın durumuna göre değerlendirilir. Klima bakımı talebinizde son bakım zamanını biliyorsanız belirtmeniz, kullanım koşullarıyla birlikte bakım ihtiyacının değerlendirilmesine yardımcı olur.",
    ],
    areasTitle: "İzmir Klima Servis Bölgeleri",
    contactTitle: "Klima arızası veya bakım ihtiyacı için bize ulaşın",
    contactText: "Klimanızın marka/modelini, bakım talebinizi veya yaşadığınız soğutma ve ısıtma sorununu telefon veya WhatsApp üzerinden paylaşabilirsiniz.",
  },
  "kombi-servisi": {
    title: "İzmir Kombi Servisi | Kombi Tamiri | Ege Bölge",
    description: "İzmir'de kombi ısıtma, sıcak su, çalışma ve hata kodu sorunları için bağımsız özel kombi servisi. Teknik destek için telefon veya WhatsApp üzerinden ulaşın.",
    eyebrow: "İzmir Kombi Teknik Servisi",
    heading: "İzmir Kombi Servisi",
    intro: "Kombi ısıtma, sıcak su, çalışma ve hata kodu sorunları için İzmir genelinde bağımsız özel teknik servis desteği.",
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
    detailsTitle: "İzmir Kombi Servisi ve Teknik Destek",
    details: [
      "Sıcak su kesintisi, peteklerin ısınmaması veya ekranda hata kodu görülmesi durumunda yaşadığınız belirtiyi bize iletebilirsiniz. İzmir kombi servisi talebinizde cihazın marka/modelini, varsa hata kodunu ve sorunun ne zaman başladığını paylaşmanız değerlendirmeye yardımcı olur.",
      "Benzer belirtiler farklı nedenlerden kaynaklanabilir; hata kodu tek başına değişmesi gereken parçayı belirlemez. Kombi tamiri için yapılabilecek işlemler cihaz incelendikten sonra değerlendirilir. Kombi bakımı hakkında bilgi almak için cihazın kullanım durumu ve biliyorsanız son bakım tarihiyle bize ulaşabilirsiniz.",
    ],
    areasTitle: "İzmir Kombi Servis Bölgeleri",
    contactTitle: "Kombi arızası veya bakım ihtiyacı için bize ulaşın",
    contactText: "Kombinizin marka/modelini, varsa hata kodunu ve yaşadığınız ısıtma veya sıcak su sorununu telefon veya WhatsApp üzerinden paylaşabilirsiniz.",
  },
  "beyaz-esya-servisi": {
    title: "İzmir Beyaz Eşya Servisi | Teknik Servis | Ege Bölge",
    description: "İzmir'de çamaşır makinesi, bulaşık makinesi, buzdolabı ve kurutma makinesi için bağımsız özel beyaz eşya servisi. Telefon veya WhatsApp üzerinden bize ulaşın.",
    eyebrow: "İzmir Beyaz Eşya Teknik Servisi",
    heading: "İzmir Beyaz Eşya Servisi",
    intro: "Çamaşır makinesi, bulaşık makinesi, buzdolabı ve kurutma makinesi arızaları için İzmir genelinde bağımsız özel teknik servis desteği.",
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
    detailsTitle: "İzmir Beyaz Eşya Servisi ve Teknik Destek",
    details: [
      "Çamaşır veya bulaşık makineniz programı tamamlamadığında, buzdolabınız soğutmadığında ya da kurutma makineniz çamaşırları kurutmadığında cihaz türünü ve yaşadığınız sorunu paylaşabilirsiniz. Beyaz eşya servisi talebinizde marka/model ve varsa hata kodu, teknik destek ihtiyacının anlaşılmasına yardımcı olur.",
      "Su almama, ses veya ısıtma sorunları her cihazda aynı nedene bağlı değildir. Beyaz eşya tamiri için yapılabilecek işlemler cihazın değerlendirilmesiyle belirlenir. Sorunun hangi aşamada ortaya çıktığını anlatabilir, varsa ekran mesajının fotoğrafını WhatsApp üzerinden iletebilirsiniz.",
    ],
    areasTitle: "İzmir Beyaz Eşya Servis Bölgeleri",
    contactTitle: "Beyaz eşya arızası için bize ulaşın",
    contactText: "Arızalı cihazınızın türünü, marka/modelini ve yaşadığınız sorunu telefon veya WhatsApp üzerinden paylaşabilirsiniz.",
  },
};
