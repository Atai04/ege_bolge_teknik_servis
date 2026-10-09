import type { PageGuide } from "./service-guides";

// Brand-category coverage is unconfirmed: these guides do not invent device mappings.
export const BRAND_GUIDES: Record<string, PageGuide> = {
  "altus-servisi": {
    title: "Altus servisi için cihaz ve talep bilgileri",
    sections: [
      { title: "İlk başvuruda hangi bilgileri paylaşabilirsiniz?", text: "Altus servis talebinde cihazın türünü, modelini ve yaşadığınız değişikliği birlikte belirtin. Modeli bilmiyorsanız günlük kullanım sırasında gördüğünüz durumu anlatabilirsiniz. Cihaz hiç başlamıyor mu, çalışırken duruyor mu, yoksa beklenen sonucu vermiyor mu? Bu ayrım, yalnızca ‘bozuldu’ demekten daha açıklayıcıdır ve görüşmenin ihtiyaç duyduğunuz konuya odaklanmasını sağlar." },
      { title: "İzmir ve Aydın’da talebin kapsamını görüşün", text: "Altus teknik servis görüşmesinde ilçenizi belirttikten sonra cihazınıza ilişkin değerlendirme adımlarını sorabilirsiniz. Hangi işlemin yapılabileceği model ve soruna göre netleşir. İşçilik, olası parça ihtiyacı ve zamanlama hakkında sorularınızı ilk görüşmede iletin. Marka adı tek başına her model için aynı işlem, fiyat veya onarım süresi anlamına gelmez." },
    ],
    questions: [["Altus cihazımın modelini bilmiyorsam görüşebilir miyim?", "Evet, cihaz türünü ve belirtisini anlatarak başlayabilirsiniz. Modeli biliyorsanız paylaşın; öğrenmek için cihazı sökmeyin veya yerinden çıkarmayın."]],
  },
  "amana-servisi": {
    title: "Amana teknik servis talebinde modelin önemi",
    sections: [
      { title: "Benzer model adlarını birbirinden ayırın", text: "Amana cihazınıza ait kullanım belgesinde bir model adı varsa harf ve rakamları eksiksiz aktarın. Satın alma adı ile model kodu aynı olmayabilir; elinizde hangi bilginin olduğunu belirtmeniz yeterlidir. Arıza talebinde cihazın yaşı hakkında tahmin yürütmek yerine bildiğiniz kullanım geçmişini ve yeni fark ettiğiniz değişikliği anlatın." },
      { title: "Parça ve onarım sorularını modele göre sorun", text: "Amana servisi için aradığınızda parça bulunabilirliği, işlem kapsamı ve değerlendirme sürecini cihaz bilgisiyle birlikte görüşün. Bir modelde yapılabilen işlem başka bir model için aynı şekilde geçerli olmayabilir. İzmir veya Aydın’daki ilçenizi paylaşarak talebinizi iletin; cihaz görülmeden kesin parça, fiyat ya da süre sözü varsaymayın." },
    ],
    questions: [["Amana için yalnızca ürünün ticari adını bilmem yeterli mi?", "Bildiğiniz adı paylaşabilirsiniz. Kullanım belgesinde ayrıca model kodu varsa onu da belirtin; iki bilginin aynı olduğunu varsaymanız gerekmez."]],
  },
  "arcelik-servisi": {
    title: "Arçelik servis talebinde arızanın başlangıcını anlatın",
    sections: [
      { title: "Ani başlayan sorun ile zamanla değişen performans", text: "Arçelik cihazınız bir anda durduysa o sırada hangi işlemi yaptığını belirtin. Sorun zaman içinde arttıysa neyin değiştiğini ve ne kadar süredir devam ettiğini anlatın. Her kullanımda ortaya çıkan bir belirtiyle ara sıra görülen bir belirtiyi ayırmak, servis görüşmesini daha yararlı hâle getirir. Kesin parça adı vermek yerine gözlemlerinizi paylaşın." },
      { title: "Arçelik teknik destek görüşmesinde ücret ve kapsam", text: "Değerlendirme, işçilik ve olası parça bedellerinin nasıl ele alındığını ilk görüşmede sorabilirsiniz. Arçelik servis talebinizin kapsamı cihaz türüne, modeline ve mevcut durumuna göre netleşir. İzmir ve Aydın hizmet bölgelerindeki başvurunuz için ilçe bilgisini de aktarın; yalnızca marka adına bakılarak kesin onarım ücreti veya tamamlanma zamanı belirlenemez." },
    ],
    questions: [["Arçelik cihazımdaki sorun ara sıra oluyorsa servis talebi iletebilir miyim?", "Belirtinin hangi zamanlarda ve hangi kullanım sırasında görüldüğünü anlatabilirsiniz. Sırf sorunu yeniden göstermek için cihazı çalıştırmanız gerekmez; daha önceki gözlemlerinizle görüşmeye başlayın."]],
  },
  "baymak-servisi": {
    title: "Baymak servisi için hata mesajı ve çalışma durumu",
    sections: [
      { title: "Hata kodunu yorumlamadan aktarın", text: "Baymak cihazınızın ekranında bir kod veya uyarı görüyorsanız harf, rakam ve varsa simgeyi olduğu gibi belirtin. Aynı zamanda cihazın ne yaptığını da anlatın: başlamaması, çalışıp durması veya beklenen sonucu vermemesi farklı bilgilerdir. İnternette benzer bir kod için yazılan parça adını, modeliniz doğrulanmadan kesin arıza nedeni kabul etmeyin." },
      { title: "Tekrar eden uyarı ile bakım ihtiyacını ayırın", text: "Baymak teknik servis görüşmesinde bakım hakkında bilgi almak istediğinizi ve ayrıca bir çalışma sorunu bulunup bulunmadığını açıklayın. Önceki işlem tarihini biliyorsanız paylaşın. İzmir veya Aydın’daki ilçeniz, cihaz türü ve modeliniz üzerinden talebin kapsamını görüşebilirsiniz. Hata mesajı, tek başına belirli bir işlem veya parça değişimi gerektirdiğini göstermez." },
    ],
    questions: [["Baymak ekranındaki kod tek başına teşhis için yeterli mi?", "Kod yararlı bir ön bilgidir; ancak cihaz modeli ve çalışma durumu da değerlendirilmelidir. Görüşmede kodu aynen okuyun ve ne zaman göründüğünü belirtin."]],
  },
  "beko-servisi": {
    title: "Beko servisi: tekrar eden sorunları doğru tarif edin",
    sections: [
      { title: "Her kullanımda mı, belirli koşullarda mı?", text: "Beko cihazınızda yaşanan sorun bazen ortaya çıkıyorsa hangi kullanım sırasında görüldüğünü anlatın. İlk çalıştırmada görülen bir sorunla işlem sonunda fark edilen sonuç farklıdır. Cihazın normal çalıştığı zamanlar da önemli bir karşılaştırma sağlar. Sorunu tekrar üretmeye çalışmadan, hatırladığınız örnekleri model bilgisiyle birlikte paylaşabilirsiniz." },
      { title: "Beko teknik servis başvurusunu netleştirin", text: "İzmir ve Aydın’daki talebiniz için ilçenizi ve cihaz türünü belirtin. İlk görüşmede değerlendirme sürecini, işlem kapsamını ve ücretlendirmeyi sorabilirsiniz. Daha önce aynı belirti için işlem yapıldıysa bunu da anlatın. Önceki işlemle bugünkü sorunun aynı nedene bağlı olduğu, cihazın durumu değerlendirilmeden kesinleştirilemez." },
    ],
    questions: [["Beko cihazım bazen normal çalışıyor; bunu da söylemeli miyim?", "Evet. Normal çalıştığı zamanlarla sorunun görüldüğü koşullar arasındaki farkı anlatmak, talebinizin açıklanmasına yardımcı olur. Aralıklı belirtiyi sürekli arıza gibi tarif etmeyin."]],
  },
  "bosch-servisi": {
    title: "Bosch teknik servis görüşmesine hazırlanırken",
    sections: [
      { title: "Marka, cihaz türü ve model farklı bilgilerdir", text: "Bosch servis talebinde marka adının yanında hangi cihaz için destek istediğinizi belirtin. Elinizdeki belgede model veya ürün kodu bulunuyorsa o ifadeyi aynen aktarın. Cihazın dış görünüşünden model tahmin etmek yerine bildiğiniz bilgiyi paylaşmanız yeterlidir. Teknik destek görüşmesinde eksik ayrıntılar ayrıca sorulabilir." },
      { title: "Sorunu işlem aşamasıyla birlikte anlatın", text: "Cihaz başlamadan önce mi, çalışırken mi, yoksa işlem bittikten sonra mı sorun fark ettiğinizi açıklayın. Bosch cihazınıza yönelik yapılabilecek işlemler, tür ve modelle birlikte değerlendirilir. İlçenizi paylaşarak hizmet bölgesini teyit edin; değerlendirme, olası parça ihtiyacı ve işlem süresi hakkındaki sorularınızı ayrı ayrı iletin." },
    ],
    questions: [["Bosch model koduna ulaşmak için cihazı çekmeli miyim?", "Hayır. Erişebildiğiniz kullanım belgesi veya mevcut bilgilerle başlayabilirsiniz. Etiketi görmek için cihazı yerinden çıkarmanız ya da bağlantılarını ayırmanız gerekmez."]],
  },
  "buderus-servisi": {
    title: "Buderus servis başvurusunda önceki işlemlerin rolü",
    sections: [
      { title: "Geçmiş işlem ile bugünkü belirtiyi ayırın", text: "Buderus cihazına daha önce bakım veya onarım yapıldıysa tarihini ve bildiğiniz işlem bilgisini paylaşın. Bugünkü sorunun aynı mı yoksa farklı bir belirti mi olduğunu açıklayın. Önceki bir parçanın değişmiş olması, yeni sorunun yine o parçadan kaynaklandığını tek başına göstermez. Bildiğiniz bilgileri tahminlerden ayrı tutmanız görüşmeyi kolaylaştırır." },
      { title: "Yeni talebinizin kapsamını belirleyin", text: "Buderus teknik servis görüşmesinde bakım bilgisi almak, mevcut bir sorunu bildirmek veya önceki işlemden sonra değişen durumu anlatmak farklı ihtiyaçlardır. Hangi konuda destek istediğinizi söyleyin. Model ve ilçenizi paylaşarak değerlendirme adımlarını, ücret kalemlerini ve zamanlama konusunu görüşebilirsiniz; bunlar cihazın durumuna göre netleştirilir." },
    ],
    questions: [["Buderus cihazının önceki servis kaydı yoksa ne yapmalıyım?", "Kayda ulaşamıyorsanız bunu belirtin. Hatırladığınız bilgileri kesinmiş gibi sunmadan mevcut belirtiyi ve modeli paylaşmanızla görüşmeye başlanabilir."]],
  },
  "daikin-servisi": {
    title: "Daikin servisi için bakım ve arıza taleplerini ayırın",
    sections: [
      { title: "Düzenli bakım mı, yeni bir çalışma sorunu mu?", text: "Daikin cihazınız için planlı bakım hakkında bilgi istiyorsanız bunu ilk görüşmede belirtin. Bunun yanında ses, uyarı mesajı veya çalışma sonucunda değişiklik fark ettiyseniz ayrı anlatın. Bir bakım talebinin her arızayı kapsadığı varsayılmamalıdır. Cihazın türü, modeli ve kullanım koşulları değerlendirme kapsamını konuşmaya yardımcı olur." },
      { title: "Talebi kullanım bilgisiyle tamamlayın", text: "Daikin teknik servis başvurusunda cihazın yoğun mu aralıklı mı kullanıldığını ve son bakım tarihini biliyorsanız aktarın. İzmir veya Aydın’daki ilçenizi paylaşarak talebinizin ayrıntılarını görüşün. Hangi işlemlerin bakım kapsamında olduğunu, mevcut şikâyet için ayrıca değerlendirme gerekip gerekmediğini ve ücretlendirme şeklini önceden sorun." },
    ],
    questions: [["Daikin bakım talebine çalışma şikâyetini eklemeli miyim?", "Evet. Bakım ihtiyacı ile belirli bir arıza belirtisi ayrı konulardır. İkisini de açıklamanız, görüşmede işlem kapsamının daha net anlaşılmasını sağlar."]],
  },
  "demirdokum-servisi": {
    title: "DemirDöküm teknik servis talebinizi açıklayın",
    sections: [
      { title: "Kısa ama eksiksiz bir belirti özeti", text: "DemirDöküm cihazınız için önce hangi işlevde sorun yaşadığınızı, sonra sorunun ne zaman başladığını anlatın. Ekranda mesaj varsa olduğu gibi aktarın. Cihazın çalışıp durmasıyla hiç başlamaması farklı durumlardır. Teknik parça isimleri kullanmadan, günlük kullanımda fark ettiğiniz değişikliği tarif etmeniz başvuru için daha açık bir başlangıç sağlar." },
      { title: "Telefon görüşmesi ile kesin arıza tespitini ayırın", text: "İlk bilgiler talebin anlaşılmasına yardımcı olur; cihazın değerlendirilmesinin yerini tutmaz. DemirDöküm servisi için modelinizi ve ilçenizi paylaşarak hangi adımların izleneceğini sorun. Olası parça, işçilik ve süre konularını görüşebilirsiniz; yalnızca hata mesajından hareketle kesin onarım sonucu veya fiyat varsayılmamalıdır." },
    ],
    questions: [["DemirDöküm talebinde teknik terim kullanmam gerekiyor mu?", "Hayır. Cihazın ne yaptığını, beklediğiniz sonucun ne olduğunu ve sorunun başlangıcını kendi sözcüklerinizle anlatabilirsiniz. Varsa görünen mesajı aynen paylaşın."]],
  },
  "eca-servisi": {
    title: "E.C.A. servisi için model ve belge bilgisi",
    sections: [
      { title: "Belgedeki model adını esas alın", text: "E.C.A. cihazınıza ait kullanım belgesinde model adı veya kodu varsa görüşmede onu paylaşın. Benzer görünen cihazları yalnızca görünüşleriyle ayırt etmek zor olabilir. Elinizdeki belgenin hangi cihaza ait olduğunu kontrol edin; modelden emin değilseniz bunu açıkça söyleyin. Görüşmeye başlamak için bütün teknik ayrıntıları bilmeniz gerekmez." },
      { title: "Mevcut sorunu modelden ayrı açıklayın", text: "Model bilgisi cihazı tanımlar, arıza belirtisi ise yaşadığınız ihtiyacı açıklar. E.C.A. teknik servis görüşmesinde ikisini de belirtin. Talebiniz bakım hakkında bilgi almaksa, bir çalışma sorunu varsa onu ayrıca anlatın. İlçeniz üzerinden hizmet bölgesini ve cihazınıza ilişkin değerlendirme kapsamını sorabilirsiniz; marka adı tek başına işlem planını belirlemez." },
    ],
    questions: [["E.C.A. belgesindeki model ile cihaz adı farklı görünüyorsa ne yapmalıyım?", "Elinizdeki bilgileri olduğu gibi paylaşın ve hangisinden emin olmadığınızı belirtin. Tahmini bir model seçmek yerine belgedeki tam ifadeyi aktarmak daha açıklayıcıdır."]],
  },
  "electrolux-servisi": {
    title: "Electrolux servis talebinde çalışma aşamasını belirtin",
    sections: [
      { title: "Başlangıç, çalışma ve bitiş farklı ipuçlarıdır", text: "Electrolux cihazınızda sorunu hangi aşamada gördüğünüzü anlatın. Başlamaması, belirli bir süre sonra durması ve işlem bittikten sonra beklenen sonucun alınamaması ayrı gözlemlerdir. Varsa program veya kullanım modu bilgisini ekleyin. Bu ayrım, şikâyetinizi açıklamaya yardımcı olur; kendi başına teknik teşhis anlamına gelmez." },
      { title: "Teknik servis için sonucu da tarif edin", text: "Cihazın çalıştığını söylemenin yanında kullanım sonunda neyin eksik kaldığını belirtin. Electrolux servisi görüşmesinde model ve ilçenizle birlikte bu bilgileri paylaşabilirsiniz. Değerlendirme adımlarını ve ücretin hangi kalemlere bağlı olduğunu sorun. İşlem kapsamı, parça ihtiyacı ve süre cihazın mevcut durumuna göre ele alınmalıdır." },
    ],
    questions: [["Electrolux cihazım işlemi tamamlıyor ama sonuç değişti; bu bilgi yeterli mi?", "Görüşmeye başlamak için yararlıdır. Beklediğiniz sonuçla gördüğünüz farkı, kullanılan modu ve bunun ne zamandır yaşandığını da belirtin."]],
  },
  "gaggenau-servisi": {
    title: "Gaggenau servisi için cihazın bulunduğu alanı tarif edin",
    sections: [
      { title: "Erişim koşullarını önceden paylaşın", text: "Gaggenau cihazının bulunduğu yere erişim kısıtlıysa bunu başvuruda belirtin. Cihazın dolap içinde, sabit bir alanda veya erişimi zor bir noktada olması görüşmede açıklanabilecek bilgilerdir. Etiketi görmek amacıyla cihazı yerinden çıkarmayın. Elinizdeki model belgesi ve mevcut arıza gözlemiyle talebi anlatabilirsiniz." },
      { title: "Model bilgisiyle işlem kapsamını sorun", text: "Gaggenau teknik servis talebinizde cihaz türü, model ve bulunduğunuz ilçe birlikte ele alınmalıdır. Değerlendirmenin nasıl yapılacağını, hangi bilgilerin gerekli olduğunu ve ücretlendirme şeklini görüşmede sorun. Erişimle ilgili ayrıntıları belirtmek planlamaya yardımcı olabilir; cihaz görülmeden belirli bir işlem süresi veya parça bulunabilirliği kesin kabul edilmemelidir." },
    ],
    questions: [["Gaggenau model etiketine ulaşamıyorsam cihazı çıkarmalı mıyım?", "Hayır. Kullanım belgesindeki bilgileri veya bildiğiniz cihaz türünü paylaşabilirsiniz. Erişim kısıtını görüşmede açıklamanız yeterlidir."]],
  },
  "grundig-servisi": {
    title: "Grundig teknik servis görüşmesinde gözleminizi paylaşın",
    sections: [
      { title: "Önceki çalışma ile bugünkü farkı anlatın", text: "Grundig cihazınızın normal kullanımda nasıl çalıştığını ve şimdi neyin değiştiğini açıklayın. Bir sesin artması, işlemin tamamlanmaması veya ekran mesajı gibi gözlemleri ayrı ayrı belirtin. ‘Motor arızası’ gibi bir teşhis koymanız gerekmez. Kendi sözcüklerinizle yapılan karşılaştırma, talebin daha açık anlaşılmasına yardımcı olur." },
      { title: "Cihaz türünü başvurunun başında belirtin", text: "Grundig servisi için görüşürken marka adının yanında cihaz türünü ve varsa modelini söyleyin. İzmir veya Aydın’daki ilçenizi paylaşarak talep kapsamını sorabilirsiniz. Hangi değerlendirmenin gerektiğini ve olası işlem giderlerini görüşmede netleştirin; benzer belirtiler her cihazda aynı parçadan kaynaklanmayabilir." },
    ],
    questions: [["Grundig arızasını teknik adını bilmeden anlatabilir miyim?", "Evet. Cihazın önce nasıl çalıştığını ve şimdi hangi farkı gördüğünüzü anlatın. Bir parça adı veya arıza teşhisi belirtmeniz gerekmez."]],
  },
  "hoover-servisi": {
    title: "Hoover servisi için birden fazla belirtiyi ayırın",
    sections: [
      { title: "Belirtilerin sırası ve birlikte görülmesi", text: "Hoover cihazınızda hem çalışma sonucu değiştiyse hem de yeni bir ses oluştuysa iki durumu ayrı anlatın. Hangisini önce fark ettiğinizi ve aynı anda görülüp görülmediğini belirtin. İki şikâyetin ortak bir nedeni olabileceği gibi farklı değerlendirmeler de gerekebilir. Görüşmede bunları tek bir parça arızası olarak birleştirmeyin." },
      { title: "Başvuruda öncelikli sorununuzu açıklayın", text: "Hoover teknik servis talebinizde kullanımınızı en çok etkileyen durumu söyleyin, diğer gözlemleri de ekleyin. Model, ilçe ve varsa geçmiş işlem bilgisi başvuruyu tamamlar. Değerlendirme kapsamı, işçilik ve olası parça ihtiyacını görüşmede sorabilirsiniz. Birden fazla belirti, aynı sayıda parça değişeceği anlamına gelmez." },
    ],
    questions: [["Hoover cihazımda iki sorun varsa iki ayrı talep mi anlatmalıyım?", "Aynı görüşmede her belirtiyi ayrı açıklayabilirsiniz. Ne zaman başladıklarını ve birlikte görülüp görülmediklerini söyleyin; aralarındaki ilişki teknik değerlendirmeyle netleşir."]],
  },
  "indesit-servisi": {
    title: "Indesit servis talebinde ekran mesajını doğru aktarın",
    sections: [
      { title: "Görünen mesaj ile çalışma durumunu birlikte paylaşın", text: "Indesit cihazında harf, rakam veya bir uyarı ışığı görüyorsanız bunu belirtin. Işığın sabit mi yanıp sönen mi olduğunu yalnızca mevcut gözleminizden anlatın. Ekranda mesaj olmaması durumunda da sorunun görüldüğü aşamayı paylaşabilirsiniz. Sırf aynı mesajı tekrar görmek için cihazı yeniden çalıştırmanız gerekmez." },
      { title: "Modeli güvenle öğrenebildiğiniz bilgilerle belirtin", text: "Indesit teknik servis görüşmesinde kullanım belgesindeki model veya bildiğiniz cihaz türüyle başlayabilirsiniz. Cihazın iç parçalarına erişerek bilgi aramayın. İlçenizi ve belirtinin başlangıcını paylaşarak değerlendirme adımlarını sorun. Kodun kendisi kesin fiyat, parça ihtiyacı veya onarım süresi belirlemek için tek başına yeterli değildir." },
    ],
    questions: [["Indesit ekranındaki mesaj kaybolduysa yine anlatmalı mıyım?", "Hatırladığınız mesajı ve hangi koşulda göründüğünü paylaşın. Mesajdan emin değilseniz bunu belirtin; tahmini bir kodu kesin bilgi gibi aktarmayın."]],
  },
  "lg-servisi": {
    title: "LG teknik servis başvurusunda cihazları ayrı tanımlayın",
    sections: [
      { title: "Birden fazla LG cihazınız varsa", text: "Aynı markaya ait iki cihaz için görüşecekseniz model ve belirtileri ayrı not edin. Bir cihazın hata mesajını diğerinin sorunuyla karıştırmamak, talebin anlaşılması açısından önemlidir. Her cihaz için neyin değiştiğini ve ne zamandır sürdüğünü açıklayın. Aynı marka altında olması, cihazların aynı teknik değerlendirmeyi gerektirdiği anlamına gelmez." },
      { title: "Her talebin kapsamını ayrı sorun", text: "LG servisi görüşmesinde hangi cihaz hakkında konuştuğunuzu netleştirerek değerlendirme ve ücret sorularınızı iletin. İzmir ve Aydın hizmet bölgelerindeki başvurunuzda ilçenizi de belirtin. Bir cihaz için konuşulan işlem, süre veya olası parça bilgisi diğer cihaz için otomatik olarak geçerli kabul edilmemelidir." },
    ],
    questions: [["İki LG cihazı için aynı görüşmede bilgi alabilir miyim?", "Her cihazın türünü, modelini ve belirtisini ayrı aktarabilirsiniz. Değerlendirme kapsamını ve süreçle ilgili bilgileri de her cihaz için ayrı netleştirin."]],
  },
  "mitsubishi-electric-servisi": {
    title: "Mitsubishi Electric servis talebinde doğru marka kaydı",
    sections: [
      { title: "Electric adını tam olarak belirtin", text: "Mitsubishi Electric ile Mitsubishi Heavy Industries site içinde ayrı marka kayıtlarıdır. Cihazınıza ait belgede hangi adın yazdığını kontrol ederek başvurunuzu o adla iletin. Yalnızca ‘Mitsubishi’ demek modelin ve marka kaydının anlaşılması için yeterli olmayabilir. Emin olmadığınız bilgiyi görüşmede açıkça belirtin." },
      { title: "Model ve sorunu aynı kayıtta birleştirin", text: "Mitsubishi Electric teknik servis talebinde tam marka adına ek olarak cihaz türü, model ve mevcut belirtiyi paylaşın. Başka bir marka kaydı için anlatılan işlem veya kod bilgisini kendi cihazınıza doğrudan uyarlamayın. İlçenizi belirterek başvuru kapsamını, değerlendirme adımlarını ve zamanlama konusunu görüşebilirsiniz." },
    ],
    questions: [["Cihaz belgesinde Mitsubishi Heavy Industries yazıyorsa bu sayfayı mı kullanmalıyım?", "Marka dizinindeki Mitsubishi Heavy Industries kaydını seçin. İki marka ayrı tutulur; cihaz belgesindeki tam adı görüşmede de belirtin."]],
  },
  "mitsubishi-heavy-industries-servisi": {
    title: "Mitsubishi Heavy Industries teknik servis başvurusu",
    sections: [
      { title: "Uzun marka adını kısaltmadan aktarın", text: "Mitsubishi Heavy Industries cihazınız için görüşürken marka adının tamamını belirtin. Elinizdeki belgede Mitsubishi Electric yazıyorsa o markanın ayrı sayfasını kullanın. Benzer isimler, model bilgilerinin birbirinin yerine kullanılabileceği anlamına gelmez. Cihazı tanımlarken belgedeki ifadeyi esas almak başvurudaki karışıklığı azaltır." },
      { title: "Cihaz bilgisi ile talep kapsamını eşleştirin", text: "Mitsubishi Heavy Industries servis talebinizde modeli ve hangi konuda destek istediğinizi birlikte açıklayın. Varsa ekran mesajını değiştirmeden aktarın. İlçe, kullanım durumu ve önceki işlem bilgisi görüşmeyi tamamlar. Yapılabilecek işlemleri ve ücretlendirme şeklini sorun; diğer marka veya modeller için verilen açıklamaları kesin teşhis olarak kabul etmeyin." },
    ],
    questions: [["Sadece Mitsubishi adını söylemem yeterli olur mu?", "Tam adı paylaşmanız daha açıklayıcıdır. Mitsubishi Heavy Industries ve Mitsubishi Electric kayıtları ayrıdır; kullanım belgesinde hangisi yazıyorsa onu belirtin."]],
  },
  "profilo-servisi": {
    title: "Profilo servisi için bölge ve cihaz bilgisini birlikte paylaşın",
    sections: [
      { title: "İlçenizi başvurunun başında belirtin", text: "Profilo servis talebinizde cihazın bulunduğu il ve ilçeyi söyleyin. Hizmet bölgeleri sayfasındaki kapsamı kontrol etmek, görüşmede konumun daha açık anlaşılmasını sağlar. İşletme adresi ile cihazınızın bulunduğu yer farklı bilgiler olduğundan talebinizin yapılacağı konumu belirtin. Kapsam dışındaki bir adres için planlama yapılacağını varsaymayın." },
      { title: "Bölge teyidinden sonra teknik ihtiyacı anlatın", text: "Profilo cihazınızın türünü, modelini ve sorunun başlangıcını paylaşın. Cihazın değerlendirilmesi, işçilik ve olası parça ihtiyacı hakkında sorularınızı iletin. Hizmet bölgesinde bulunmak, belirli bir saat veya aynı gün onarım garantisi değildir. Zamanlama ve işlem kapsamı, başvurunun ayrıntıları görüşüldüğünde netleştirilmelidir." },
    ],
    questions: [["Profilo servisi için yalnızca İzmir demem yeterli mi?", "İlçeyi de belirtmeniz gerekir. Hizmet kapsamı ilçe bazında listelenir; cihazın bulunduğu yeri açıkça paylaşarak talebinizi görüşün."]],
  },
  "regal-servisi": {
    title: "Regal teknik servis görüşmesinde doğru soruları sorun",
    sections: [
      { title: "Önce ne öğrenmek istediğinizi belirleyin", text: "Regal cihazınız için aradığınızda yalnızca arızayı bildirmek değil, değerlendirme sürecini öğrenmek de isteyebilirsiniz. Cihaz türü ve belirtiden sonra işlem kapsamı, ücretlendirme veya hizmet bölgesiyle ilgili sorularınızı iletin. Birden fazla soruyu ayrı sormak, görüşmede hangi konunun netleştiğini takip etmeyi kolaylaştırır." },
      { title: "İlk bilgi ile kesin işlem kararını ayırın", text: "Regal servisi talebinde verilen ilk bilgiler cihazın durumuna göre ayrıntılandırılır. Model ve sorunu açıklamadan belirli bir parçanın fiyatını sormak, toplam işlem hakkında yeterli bilgi vermeyebilir. Değerlendirme ve işçilik kalemlerini de sorun; kesin işlem ihtiyacını cihazın mevcut durumu üzerinden görüşün." },
    ],
    questions: [["Regal cihazım için ilk görüşmede hangi ücretleri sormalıyım?", "Değerlendirme, işçilik ve olası parça bedellerinin nasıl ele alındığını sorabilirsiniz. Tek bir parça fiyatını bütün servis işleminin toplam bedeli olarak kabul etmeyin."]],
  },
  "samsung-servisi": {
    title: "Samsung servis talebinde gerekli cihaz bilgileri",
    sections: [
      { title: "Model ve belirtiye odaklanan bir başvuru", text: "Samsung teknik servis görüşmesine cihaz türünü, modelini ve yaşadığınız sorunu anlatarak başlayabilirsiniz. Ekrandaki bir mesajı paylaşacaksanız cihazla ilgili kısmını belirtin. Hesap parolaları veya ilgisiz kişisel belgeler, arızayı anlatmak için gerekli değildir. Cihazın hangi kullanımında sorun görüldüğünü söylemeniz daha yararlı bir ön bilgi sağlar." },
      { title: "Sorunun nerede görüldüğünü açıklayın", text: "Samsung cihazınızda belirli bir işlevde yaşanan sorunla tüm çalışmayı etkileyen durumu ayırın. Tek bir kullanımda mı yoksa her seferinde mi görüldüğünü belirtin. İlçe ve modelinizle birlikte talebin kapsamını, değerlendirme adımlarını ve ücretlendirme şeklini görüşebilirsiniz. Sorunun kaynağı, yalnızca marka adından veya tek bir mesajdan kesinleştirilemez." },
    ],
    questions: [["Samsung servis görüşmesinde hesap şifremi vermeli miyim?", "Hayır. İlk başvuruda cihaz türü, model ve belirtiye odaklanın. Hesap parolalarını veya cihazla ilgisiz kişisel belgeleri paylaşmanız gerekmez."]],
  },
  "siemens-servisi": {
    title: "Siemens servisi: parça tahmini yerine belirti bilgisi",
    sections: [
      { title: "İnternette görülen teşhisi kesin kabul etmeyin", text: "Siemens cihazınızla aynı belirtiyi anlatan bir içerik, sizin modelinizde aynı parçanın arızalı olduğunu kanıtlamaz. Servis görüşmesinde cihazın ne yaptığını veya yapmadığını anlatın. Hangi parçanın değişmesi gerektiğini önceden seçmek yerine model, hata mesajı ve çalışma aşamasını paylaşmak talebin daha doğru anlaşılmasını sağlar." },
      { title: "Parça değişimi ile işlem kapsamını ayrı konuşun", text: "Siemens teknik servis talebinizde gerekli değerlendirmenin nasıl yapılacağını ve ücretlendirme şeklini sorun. Parça ihtiyacı ortaya çıkarsa hangi model için konuşulduğunu netleştirin. İzmir veya Aydın’daki ilçeniz ve cihaz bilgileriniz üzerinden başvurunuzu iletebilirsiniz; tek belirtiyle kesin onarım bedeli veya tamamlanma süresi varsaymayın." },
    ],
    questions: [["Siemens cihazım için değişecek parçayı önceden belirlemeli miyim?", "Hayır. Belirtiyi, modeli ve varsa mesajı paylaşın. Hangi işlemin gerektiği cihazın değerlendirilmesiyle netleşmelidir."]],
  },
  "sub-zero-servisi": {
    title: "Sub-Zero teknik servis talebinde eksik bilgileri belirtin",
    sections: [
      { title: "Bilinmeyen model veya kullanım geçmişi", text: "Sub-Zero cihazınızın modelini ya da önceki işlem geçmişini bilmiyorsanız bunu açıkça söyleyin. Tahmini bir tarih veya parça adı vermek yerine bildiğiniz cihaz türü ve mevcut belirtiden başlayın. Kullanım belgesi elinizdeyse model bilgisini oradan aktarabilirsiniz. Bilgi eksikliği, ilk görüşmede yaşadığınız sorunu anlatmanıza engel değildir." },
      { title: "Değerlendirme ve parça sorularını netleştirin", text: "Sub-Zero servisi için başvururken cihazın nasıl değerlendirileceğini, model bilgisinin nasıl tamamlanacağını ve olası işlem kapsamını sorun. Parça bulunabilirliği veya kesin fiyat, yalnızca marka adına bakılarak varsayılmamalıdır. İlçenizi ve gözlemlerinizi paylaşarak talebinizle ilgili sonraki adımları görüşebilirsiniz." },
    ],
    questions: [["Sub-Zero cihazının geçmişini bilmiyorsam talep iletebilir miyim?", "Mevcut gözleminizi ve bildiğiniz cihaz bilgilerini paylaşabilirsiniz. Önceki işlemlerden emin değilseniz bunu söyleyin; eksik bilgiyi tahminle doldurmayın."]],
  },
  "toshiba-servisi": {
    title: "Toshiba servisi için sorunun görüldüğü koşullar",
    sections: [
      { title: "Hangi kullanım sırasında değişiklik oldu?", text: "Toshiba cihazınızda sorunu ilk açılışta mı, bir süre kullandıktan sonra mı yoksa belirli bir işlevde mi gördüğünüzü anlatın. Önceki günlerde aynı koşullarda normal çalışıp çalışmadığını hatırlıyorsanız paylaşın. Kullanım koşulları talebi açıklamaya yardımcı olur; ancak bu bilgilerden tek başına kesin arıza nedeni çıkarılamaz." },
      { title: "Tekrarlama sıklığını teknik görüşmeye ekleyin", text: "Toshiba teknik servis başvurusunda belirtinin sürekli mi aralıklı mı olduğunu söyleyin. Sorunu yeniden üretmek için cihazı çalıştırmanız gerekmez. Model ve ilçenizle birlikte değerlendirme sürecini ve işlem giderlerini görüşebilirsiniz. Aynı belirtinin farklı modellerde aynı parça veya aynı onarım süresi gerektireceği varsayılmamalıdır." },
    ],
    questions: [["Toshiba sorunu yalnızca bazen gösteriyorsa neyi not etmeliyim?", "Hangi kullanım sırasında olduğunu, ne kadar sürdüğünü ve varsa görünen mesajı not edebilirsiniz. Cihazı yeniden denemek yerine önceki gözlemlerinizi paylaşın."]],
  },
  "vaillant-servisi": {
    title: "Vaillant servis talebinde işlem kapsamını netleştirin",
    sections: [
      { title: "Bakım, değerlendirme ve onarım aynı şey değildir", text: "Vaillant cihazınız için bakım hakkında bilgi istiyorsanız bunu belirtin; mevcut çalışma şikâyetinizi ayrıca açıklayın. Teknik değerlendirme, yapılabilecek işlemleri anlamaya yöneliktir ve tek başına belirli bir onarımın kesin yapılacağı anlamına gelmez. Model, belirti ve varsa önceki işlem bilgileriyle hangi desteği aradığınızı açıkça ifade edin." },
      { title: "Süre ve masraf sorularını doğru aşamada sorun", text: "Vaillant teknik servis görüşmesinde ücretin hangi kalemlerden oluştuğunu ve işlem kapsamının ne zaman netleşeceğini öğrenebilirsiniz. Cihaz görülmeden kesin parça ihtiyacı veya tamamlanma süresi beklemeyin. İlçenizi paylaşarak hizmet bölgesi ve başvuru adımlarını görüşün; çağrı merkezinin ulaşılabilirliği ile yerinde işlem zamanı farklı konulardır." },
    ],
    questions: [["Vaillant bakım talebi onarım işlemini de kapsar mı?", "Bunu görüşmede ayrıca sormalısınız. Bakım talebinizin yanında mevcut çalışma sorununu da anlatın; onarım gerekip gerekmediği ve kapsamı ayrı netleştirilir."]],
  },
  "vestel-servisi": {
    title: "Vestel servisi için başvurunuzu cihaz ve konumla tamamlayın",
    sections: [
      { title: "Cihaz türünü başta söylemek neden yararlıdır?", text: "Vestel servis talebinde marka adıyla birlikte hangi cihazı kullandığınızı belirtin. Birden fazla cihazınız varsa sorun yaşanan cihazı netleştirin. Model ve arıza belirtisi, ilk görüşmenin doğru konu üzerinde ilerlemesini sağlar. Elinizde model bilgisi yoksa kullanım sırasında gördüğünüz değişiklikleri anlatmanızla başlayabilirsiniz." },
      { title: "İlçe ve değerlendirme adımlarını görüşün", text: "Cihazın bulunduğu ilçeyi paylaşarak hizmet bölgesini teyit edin. Vestel teknik destek görüşmesinde değerlendirme, olası işlem ve ücret kalemleri hakkında sorularınızı iletebilirsiniz. Başvuru bilgisi verilmesi, belirli bir saatte işlem yapılacağı garantisi değildir. Talebin kapsamı ve zamanlamasını cihazınızın durumu üzerinden netleştirin." },
    ],
    questions: [["Vestel talebinde cihaz türü ile ilçeyi neden birlikte vermeliyim?", "Cihaz bilgisi teknik ihtiyacı, ilçe bilgisi ise hizmet konumunu açıklar. İkisini birlikte paylaşmak başvurunun kapsamını konuşmayı kolaylaştırır."]],
  },
  "viessmann-servisi": {
    title: "Viessmann teknik servis görüşmesinde mevcut kayıtlar",
    sections: [
      { title: "Kullanım belgesi ve önceki işlem kaydı", text: "Viessmann cihazına ait belgeler elinizdeyse model ve önceki işlemle ilgili bilgileri hazırlayabilirsiniz. Belgenin tamamını göndermek yerine görüşmede sorulan cihaz bilgisini paylaşın. İşlem tarihinden veya ayrıntısından emin değilseniz bunu belirtin. Önceki kayıt, mevcut sorunun mutlaka aynı nedene bağlı olduğunu göstermez." },
      { title: "Kayıtları bugünkü gözleminizle tamamlayın", text: "Viessmann servisi başvurusunda yalnızca eski işlemden söz etmek yerine şu anda ne yaşadığınızı da anlatın. Sorunun başlangıcını, tekrarını ve varsa ekran mesajını paylaşın. Model ve ilçeniz üzerinden değerlendirme adımlarını görüşebilirsiniz. Yapılacak işlemler, olası parça ihtiyacı ve ücretlendirme mevcut cihaz durumu dikkate alınarak ele alınmalıdır." },
    ],
    questions: [["Viessmann servis talebi için belgenin tamamını göndermem gerekir mi?", "İlk görüşmede model ve işlemle ilgili bilgileri aktarmanız yeterli bir başlangıçtır. İlgisiz kişisel bilgileri paylaşmayın; hangi cihaz ayrıntısına ihtiyaç olduğunu sorun."]],
  },
  "whirlpool-servisi": {
    title: "Whirlpool servis görüşmesi için soru listenizi hazırlayın",
    sections: [
      { title: "Belirti ile süreç sorularını birlikte ele alın", text: "Whirlpool cihazınızın türünü, modelini ve sorunun başlangıcını anlattıktan sonra süreçle ilgili sorularınızı sorabilirsiniz. Değerlendirme nasıl yapılacak, hangi bilgiler gerekli ve ücret hangi kalemlerden oluşuyor? Soruları ayrı iletmek, görüşme sonunda hangi konuların açık kaldığını anlamanıza yardımcı olur. Teknik teşhis koymanız gerekmez." },
      { title: "Talep bilgisi ile kesin sonucu birbirinden ayırın", text: "Whirlpool teknik servis başvurusu, cihazınıza ilişkin ihtiyacın açıklanmasıyla başlar. Onarım imkânı, parça gereksinimi ve tamamlanma süresi cihazın durumuna göre değerlendirilir. İzmir veya Aydın’daki ilçenizi belirtip hizmet kapsamını görüşün. İlk telefon görüşmesini, cihaz incelenmeden verilmiş kesin fiyat veya onarım garantisi olarak değerlendirmeyin." },
    ],
    questions: [["Whirlpool için aramadan önce hangi soruları hazırlayabilirim?", "Hizmet bölgesi, değerlendirme adımları, ücretlendirme ve cihaz bilgisiyle ilgili sorularınızı not edebilirsiniz. Parça ve süre konularının hangi aşamada netleşeceğini de sorun."]],
  },
};
