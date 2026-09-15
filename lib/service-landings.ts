import type { SERVICES } from "./data";

type ServiceLanding = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
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
};
