import type { ServiceSlug } from "./brands";

export type PageGuide = {
  title: string;
  sections: readonly { title: string; text: string }[];
  questions: readonly (readonly [string, string])[];
};

// Editorial information, not a diagnosis or a promise of repair, price or availability.
export const SERVICE_GUIDES: Record<ServiceSlug, PageGuide> = {
  "buzdolabi-servisi": {
    title: "Buzdolabı soğutmuyor: servis talebinde hangi bilgiler önemli?",
    sections: [
      { title: "Soğutucu ve dondurucu bölümünü ayrı anlatın", text: "Buzdolabı tamiri için başvururken yalnızca cihazın çalıştığını söylemek yerine hangi bölümde sorun olduğunu belirtin. Soğutucu bölüm yeterince soğutmuyor ama dondurucu çalışıyorsa bunu ayrı bir belirti olarak paylaşın. Ekranda görünen değer ile içeride gözlemlediğiniz durum farklıysa ikisini de anlatın. Motor sesi duyulması veya ışığın yanması, soğutmanın normal olduğu anlamına tek başına gelmez." },
      { title: "Buzlanma, su birikmesi ve çalışma sesi", text: "Buzlanmanın hangi rafta veya bölümde oluştuğu, suyun cihazın içinde mi altında mı görüldüğü ve sesin sürekli mi aralıklı mı olduğu, buzdolabı servisi görüşmesini daha anlaşılır kılar. Son günlerde taşınma ya da uzun elektrik kesintisi yaşandıysa bunu da belirtin. Bu bilgilerden hareketle parça değişimi kararı verilemez; cihazın modeli ve teknik değerlendirme gerekir." },
      { title: "Buzdolabı onarımı ve ücret bilgisi", text: "Servis ücreti sorarken değerlendirme, işçilik ve olası parça bedelinin nasıl ele alındığını öğrenin. Aynı soğutmama şikâyeti farklı modellerde farklı işlemler gerektirebilir. İzmir ve Aydın’daki talebiniz için ilçenizi, marka/modeli ve sorunun başlangıcını paylaşarak işlem kapsamını görüşebilirsiniz. Cihaz incelenmeden kesin fiyat veya tamamlanma süresi varsaymayın." },
    ],
    questions: [
      ["Buzdolabının ışığı yanıyor ama soğutmuyor; hangi bilgiyi vermeliyim?", "Soğutucu ve dondurucu bölümlerindeki durumu, varsa ekran mesajını ve sorunun ne zamandır sürdüğünü paylaşın. Işığın yanması, soğutma sisteminin çalıştığını doğrulamaz; yalnızca bu belirtiyle kesin arıza tespiti yapılamaz."],
      ["Buzlanma için mutlaka parça değişimi gerekir mi?", "Buzlanma tek başına parça değişimi gerektiğini göstermez. Buzlanmanın yeri, model ve kullanım koşulları birlikte değerlendirilmelidir. Görüşmede gözleminizi anlatın; onarım kapsamını değerlendirme sonucuna göre sorun."],
    ],
  },
  "camasir-makinesi-servisi": {
    title: "Çamaşır makinesi tamirinde program ve belirti bilgisi",
    sections: [
      { title: "Su almama, yıkama ve tahliye sorunları", text: "Çamaşır makinesi servisi talebinde programın hangi aşamada kaldığını anlatmak yararlıdır. Makine hiç başlamıyor mu, su aldıktan sonra mı duruyor, yoksa yıkama sonunda suyu boşaltamıyor mu? Bunlar aynı şikâyet gibi görünse de ayrı gözlemlerdir. Ekranda hata kodu varsa harf ve rakamları aynen aktarın; kodun anlamını modelden bağımsız yorumlamayın." },
      { title: "Sıkma yapmama ve ses şikâyeti", text: "Çamaşırlar program sonunda çok ıslak kalıyorsa sıkma aşamasının başlayıp başlamadığını, makinenin içinde su görüp görmediğinizi belirtin. Ses veya titreşim için hangi programda ve hangi aşamada ortaya çıktığını paylaşın. Çamaşır makinesi tamiri öncesinde bir parçayı kendiniz teşhis etmeye çalışmanız gerekmez; kullanım sırasında fark ettiğiniz değişiklikleri tarif etmeniz yeterlidir." },
      { title: "Servis görüşmesine nasıl hazırlanabilirsiniz?", text: "Marka/model, seçilen program ve varsa önceki işlem bilgisi talebin açıklanmasına yardımcı olur. Farklı zamanlarda görülen sorunları tek bir arıza gibi birleştirmeden aktarın. İşçilik, değerlendirme ve olası parça giderlerini görüşmede ayrı ayrı sorun. İşlemin kapsamı ve süresi makinenin durumuna göre netleşir; yalnızca marka adı kesin onarım bilgisi vermez." },
    ],
    questions: [
      ["Çamaşır makinesi sıkmıyorsa servis için ne söylemeliyim?", "Program adını, tamburda su kalıp kalmadığını ve varsa hata mesajını belirtin. Sıkmanın hiç başlamaması ile başlayıp yarıda durması farklı gözlemlerdir; ikisini birbirinden ayırarak anlatın."],
      ["Program yarıda kalınca hata kodu olmaması önemli mi?", "Hata kodu görünmemesi sorun olmadığı anlamına gelmez. Programın kaldığı aşama ve makinenin o sırada ne yaptığı da teknik servis talebinde kullanılabilecek bilgilerdir."],
    ],
  },
  "bulasik-makinesi-servisi": {
    title: "Bulaşık makinesi servisi: yıkama, tahliye ve kurutma şikâyetleri",
    sections: [
      { title: "Temiz yıkamama ile programın durmasını ayırın", text: "Bulaşıklar program sonunda kirli çıkıyorsa programın tamamlanıp tamamlanmadığını da belirtin. Bulaşık makinesinin su almaması, çalışırken durması ve yıkama sonucunun yetersiz olması farklı durumlardır. Hangi programı kullandığınızı ve belirtinin her seferinde mi oluştuğunu paylaşmak, servis talebinin doğru anlaşılmasına yardımcı olur. Tek bir yıkama sonucu kesin arıza nedeni göstermez." },
      { title: "Makinede su kalması ve sızıntı", text: "Tahliye sorunu için suyun program sonunda mı kaldığını, sızıntı içinse suyun nerede görüldüğünü anlatın. Bulaşık makinesi tamiri görüşmesinde cihazın ankastre veya serbest duran bir model olduğunu belirtmek de faydalıdır. Model etiketine ulaşmak için cihazı yerinden çıkarmayın; elinizdeki kullanım belgesi veya mevcut cihaz bilgisiyle başvurabilirsiniz." },
      { title: "Kurutma sonucu ve servis değerlendirmesi", text: "Yıkama tamamlandığı hâlde bulaşıkların ıslak kalmasıyla cihazın programı tamamlayamaması aynı durum değildir. Kurutma şikâyetini yıkama sonucundan ayrı aktarın. İzmir ve Aydın hizmet bölgelerindeki talebiniz için ilçe ve model bilgisini paylaşabilir; değerlendirme, işçilik ve parça ihtiyacının nasıl netleştirileceğini görüşmede sorabilirsiniz." },
    ],
    questions: [
      ["Bulaşık makinem su boşaltmıyor; model bilgisi gerekli mi?", "Model bilgisi varsa paylaşmanız faydalıdır. Bilmiyorsanız cihaz türü, programın kaldığı aşama ve görünen hata mesajıyla görüşmeye başlayabilirsiniz; modeli öğrenmek için cihazı sökmeniz gerekmez."],
      ["Bulaşıkların ıslak çıkması kesin bir arıza mı?", "Yalnızca bu sonuçla kesin arıza denilemez. Kullanılan programı, programın tamamlanıp tamamlanmadığını ve sorunun yeni başlayıp başlamadığını belirtin. Değerlendirme cihazın modeline ve durumuna göre yapılır."],
    ],
  },
  "kurutma-makinesi-servisi": {
    title: "Kurutma makinesi tamiri için şikâyetinizi nasıl anlatabilirsiniz?",
    sections: [
      { title: "Uzayan program ve nemli kalan çamaşırlar", text: "Kurutma makinesi servisi ararken çamaşırların nemli kaldığını belirtmenin yanında programın normal şekilde bitip bitmediğini de anlatın. Süre uzuyor, cihaz erken duruyor veya aynı program farklı sonuç veriyorsa bunları ayrı gözlemler olarak paylaşın. Seçilen program ve yükün türü görüşmeye yardımcı olur; yalnızca uzun çalışma süresinden bir parçanın arızalı olduğu sonucuna varılmaz." },
      { title: "Isıtma, ses ve ekran uyarıları", text: "Isınmama şikâyetiyle birlikte görülen bir uyarı varsa mesajı aynen aktarın. Su haznesi veya bakım göstergesi gibi ifadeleri, cihazın kullanım belgesinde nasıl yazıyorsa o şekilde paylaşabilirsiniz. Kurutma makinesi tamiri talebinde teknik terimler kullanmak zorunda değilsiniz. Cihazın önceki çalışmasıyla bugünkü durumunu karşılaştırmanız, sorunun anlaşılmasını kolaylaştırır." },
      { title: "Bakım talebi ve onarım talebi", text: "Düzenli bakım hakkında bilgi almakla yeni ortaya çıkan çalışma sorununu bildirmek farklı ihtiyaçlardır. Son bakım tarihini biliyorsanız belirtin, ancak arıza şikâyetini yalnızca bakım talebi olarak geçiştirmeyin. Yapılabilecek işlemleri, değerlendirme ücretini ve olası parça sürecini model bilginizle birlikte görüşün; kesin süre cihaz değerlendirilmeden belirlenemez." },
    ],
    questions: [
      ["Kurutma makinesi programı bitiriyor ama çamaşırlar nemli kalıyor; ne belirtmeliyim?", "Program adını, sonucun ne zamandır değiştiğini ve cihazda bir uyarı görüp görmediğinizi aktarın. Programın bitmesi ile beklenen kurutma sonucunun alınması farklı bilgilerdir; ikisini birlikte paylaşın."],
      ["Ekrandaki bakım uyarısı onarım gerektiği anlamına gelir mi?", "Uyarının anlamı modele göre değişebilir. Mesajı ve model bilgisini paylaşın; bir göstergeyi tek başına parça arızası olarak yorumlamayın."],
    ],
  },
  "klima-servisi": {
    title: "Klima bakımı ve klima tamiri için doğru servis talebi",
    sections: [
      { title: "Klima soğutmuyor veya ısıtmıyor", text: "Klima servisi görüşmesinde hangi çalışma modunu kullandığınızı ve sorunun tüm kullanım boyunca mı görüldüğünü belirtin. Cihazın hiç başlamaması, hava üfleyip ortamı yeterince soğutmaması ve kısa süre çalışıp durması farklı belirtilerdir. Marka/model ile varsa hata mesajını birlikte aktarın. Soğutma performansındaki düşüş, tek başına gaz dolumu gerektiğini göstermez." },
      { title: "Su akıntısı, ses ve koku", text: "Suyun iç üniteden mi başka bir noktadan mı geldiğini, sesin nereden duyulduğunu ve belirtinin ne zaman başladığını anlatın. İç ve dış üniteyi güvenle göremiyorsanız bilgi toplamak için tehlikeli bir konuma çıkmayın. Klima tamiri için telefonla verilen bilgiler ön görüşmeyi destekler; sorunun nedeni ve gerekli işlem teknik değerlendirmeyle netleşir." },
      { title: "Klima bakımını arıza talebinden ayırın", text: "Klima bakımı hakkında görüşürken son bakım zamanını, kullanım yoğunluğunu ve varsa ek şikâyetleri paylaşın. Bakıma hangi işlemlerin dahil olduğunu ve ayrıca değerlendirilmesi gereken bir arıza olup olmadığını sorun. İzmir ve Aydın’daki talebinizde ilçe bilgisini belirtin; çağrı merkezine ulaşabilmeniz, aynı saatte yerinde işlem yapılacağı anlamına gelmez." },
    ],
    questions: [
      ["Klima soğutmuyorsa doğrudan gaz dolumu istemeli miyim?", "Soğutmama tek başına gaz eksikliğini kanıtlamaz. Model, çalışma modu ve diğer belirtiler değerlendirilmeden belirli bir işlem veya parça hakkında kesin karar verilmez."],
      ["Klima bakımı her çalışma sorununu giderir mi?", "Bakım ile arıza onarımı aynı işlem değildir. Mevcut şikâyetinizi bakım talebine ek olarak anlatın; bakım kapsamını ve onarım gerekip gerekmediğini değerlendirme sırasında netleştirin."],
    ],
  },
  "kombi-servisi": {
    title: "Kombi tamiri ve bakımında sıcak su ile ısıtma sorunları",
    sections: [
      { title: "Sıcak su ve petek ısıtmasını ayrı değerlendirin", text: "Kombi servisi talebinde sıcak suyun mu, petek ısıtmasının mı yoksa ikisinin birden mi etkilendiğini belirtin. Cihazın çalışmaya başlamaması, bir süre sonra durması ve sıcaklığın dalgalanması ayrı gözlemlerdir. Model ve ekrandaki hata mesajını paylaşmanız görüşmeyi kolaylaştırır. Aynı kodun farklı cihazlarda aynı işlem gerektirdiği varsayılmamalıdır." },
      { title: "Basınç göstergesi ve tekrar eden hata", text: "Basıncın sürekli değiştiğini fark ettiyseniz gördüğünüz değerleri ve değişimin ne kadar sürede olduğunu anlatın. Kombi tamiri öncesinde kapağı açmanız, iç parçalara müdahale etmeniz veya hatayı tekrar tekrar sıfırlamanız gerekmez. Daha önce gözlemlediğiniz durumu aktarmanız yeterlidir. Hata kodu tek başına hangi parçanın değişeceğini belirlemez." },
      { title: "Kombi bakımında kapsam ve ücret soruları", text: "Kombi bakımı için son bakım tarihi, cihaz modeli ve mevcut çalışma sorunlarını paylaşın. Bakımın hangi işlemleri kapsadığını, arıza değerlendirmesinin ayrı olup olmadığını ve ücretin hangi kalemlerden oluştuğunu sorun. Cihaz incelenmeden sabit bir parça ihtiyacı, kesin onarım süresi ya da sorunun yalnızca bakımla çözüleceği sonucu çıkarılamaz." },
    ],
    questions: [
      ["Kombi sıcak su veriyor ama petekler ısınmıyor; nasıl anlatmalıyım?", "Sıcak suyun çalıştığını, petek tarafındaki sorunu ve varsa ekran mesajını ayrı ayrı belirtin. Model bilgisiyle birlikte verilen bu ayrım, servis talebinizin anlaşılmasına yardımcı olur."],
      ["Kombi hata kodu için telefonda kesin fiyat alabilir miyim?", "Kod tek başına yapılacak işlemi belirlemez. İlk görüşmede ücretlendirme şeklini sorabilirsiniz; kesin işlem ve parça kapsamı için cihazın durumunun değerlendirilmesi gerekir."],
    ],
  },
  "tv-tamiri": {
    title: "Televizyon tamiri: görüntü, ses ve açılma sorunlarını ayırın",
    sections: [
      { title: "Ses var görüntü yok veya görüntü kesiliyor", text: "TV tamiri talebinde sesin devam edip etmediğini ve ekranda menü dahil herhangi bir görüntü görünüp görünmediğini belirtin. Görüntünün tamamen kaybolması, kararması ve aralıklı gidip gelmesi farklı gözlemlerdir. Bu belirtilerden yalnızca birine bakılarak panel, aydınlatma veya başka bir parça hakkında kesin karar verilemez. Televizyonun marka/model bilgisini paylaşın." },
      { title: "Smart TV bağlantısı ile ekran arızası aynı değildir", text: "Sorun yalnızca bir uygulamada, bir kanalda veya harici kaynakta görülüyorsa bunu televizyon servisi görüşmesinde özellikle belirtin. Tüm görüntü kaynaklarında yaşanan sorunla tek uygulamadaki sorun aynı şekilde tarif edilmemelidir. Hesap şifresi paylaşmanız gerekmez; ekrandaki mesaj, kullanılan kaynak ve sorunun başlangıç zamanı yeterli bir ön bilgi sağlar." },
      { title: "TV onarımı için model ve fiziksel durum", text: "Ekran boyutunu ve modelini biliyorsanız aktarın. Düşme, darbe veya sıvı teması yaşandıysa bunu gizlemeden belirtin; bunlar değerlendirme açısından önemlidir. Model etiketine ulaşmak için duvara monte televizyonu tek başınıza indirmeyin. Yapılabilecek işlemleri, cihazın nasıl değerlendirileceğini ve olası masrafları ilk görüşmede sorun." },
    ],
    questions: [
      ["Televizyonun sesi geliyor ama ekran karanlık; panel mi değişecek?", "Bu belirti tek başına panel değişimi gerektiğini göstermez. Model, görüntünün davranışı ve teknik inceleme birlikte değerlendirilmeden parça hakkında kesin yorum yapılamaz."],
      ["Yalnızca bir Smart TV uygulamasında sorun varsa servis talebi açabilir miyim?", "Sorunu paylaşabilirsiniz. Hangi uygulama veya kaynakta görüldüğünü ve diğer ekranların normal olup olmadığını belirtin; talebin kapsamını görüşmede netleştirin."],
    ],
  },
  "beyaz-esya-servisi": {
    title: "Beyaz eşya tamiri için doğru cihaz sayfasını seçin",
    sections: [
      { title: "Her cihazın çalışma sorunu farklıdır", text: "Beyaz eşya servisi; buzdolabı, çamaşır makinesi, bulaşık makinesi ve kurutma makinesi gibi farklı cihazlara ilişkin talepleri kapsar. Soğutmama, su almama, tahliye etmeme veya kurutmama gibi belirtileri cihaz türüyle birlikte belirtin. Bu sayfadaki cihaz bağlantılarından ilgili ayrıntılara ulaşabilirsiniz. Aynı marka altında birden fazla cihaz bulunması, bütün sorunların aynı işlemle çözüleceği anlamına gelmez." },
      { title: "Birden fazla cihaz için servis talebi", text: "İki cihazınızda sorun varsa her birinin marka/modelini ve belirtisini ayrı not edin. Çamaşır makinesindeki sıkma sorunu ile buzdolabındaki soğutma sorununu tek bir açıklamada karıştırmadan iletin. Beyaz eşya tamiri görüşmesinde önce hangi cihaz için destek istediğinizi söylemeniz, talebin kapsamını ve değerlendirme adımlarını daha net konuşmanızı sağlar." },
      { title: "Bölge, işlem kapsamı ve ücretlendirme", text: "İzmir ve Aydın’da bulunduğunuz ilçeyi paylaşarak hizmet bölgesini teyit edin. İlk görüşmede değerlendirme, işçilik ve olası parça bedellerinin nasıl ele alındığını sorabilirsiniz. Cihaz incelenmeden her arıza için aynı fiyat veya aynı gün onarım sonucu beklenmemelidir. Çağrı merkezimizle iletişim kurarak cihazınıza ilişkin başvurunun ayrıntılarını görüşebilirsiniz." },
    ],
    questions: [
      ["Hangi beyaz eşya için hangi sayfayı incelemeliyim?", "Soğutma sorunları için buzdolabı, yıkama ve sıkma için çamaşır makinesi, bulaşık yıkama için bulaşık makinesi, çamaşır kurutma için kurutma makinesi sayfasını seçebilirsiniz. Her sayfada o cihaz için paylaşılabilecek belirtiler anlatılır."],
      ["Bir aramada iki farklı cihaz için bilgi verebilir miyim?", "Her cihazın modelini ve sorununu ayrı ayrı paylaşabilirsiniz. Cihazlara ilişkin işlem kapsamını ve değerlendirme planını görüşmede ayrı netleştirin."],
    ],
  },
  "isi-pompasi-servisi": {
    title: "Isı pompası servisi için sistem ve çalışma bilgileri",
    sections: [
      { title: "Isıtma, soğutma veya sıcak su talebini belirtin", text: "Isı pompası servisi görüşmesinde sorun yaşanan işlevi açıklayın. Sistemin hangi amaçla kullanıldığını, sorunun bütün kullanımda mı belirli zamanlarda mı görüldüğünü ve varsa kontrol ekranındaki mesajı paylaşın. Isıtma ya da sıcak su performansına ilişkin tek bir gözlem, arızanın kaynağını belirlemeye yetmez. Marka/model ve kurulumla ilgili bilinen bilgiler birlikte değerlendirilir." },
      { title: "Kontrol ekranı ile cihaz bilgisini birlikte aktarın", text: "Görünen mesajı değiştirmeden not edin; kumanda ayarlarına veya tesisat bağlantılarına müdahale ederek sorunu yeniden üretmeye çalışmayın. Önceki bakım ve işlem kayıtlarını biliyorsanız görüşmede belirtin. Isı pompası tamiri için başvururken sistemin daha önce nasıl çalıştığını ve neyin değiştiğini anlatmak, belirli bir parçanın arızalı olduğunu tahmin etmekten daha yararlıdır." },
      { title: "Bakım ve teknik değerlendirme kapsamı", text: "Isı pompası bakımında hangi ekipmanların değerlendirileceğini ve mevcut çalışma şikâyetinin ayrıca ele alınıp alınmayacağını sorun. Model, kurulum koşulları ve ihtiyacınız netleşmeden kesin işlem veya süre bilgisi verilemez. Hizmet bölgelerindeki talebiniz için ilçe ve sistem bilgisini paylaşarak başvuru adımlarını görüşebilirsiniz." },
    ],
    questions: [
      ["Isı pompası talebinde sadece marka adı yeterli mi?", "Markaya ek olarak model, sistemin hangi amaçla kullanıldığı ve sorunun görüldüğü işlevi paylaşmanız faydalıdır. Bildiğiniz bilgileri aktarın; eksik ayrıntılar için teknik bağlantılara müdahale etmeyin."],
      ["Bakım talebi verirken çalışma sorununu da söylemeli miyim?", "Evet. Düzenli bakım ihtiyacı ile mevcut ısıtma veya sıcak su sorunu ayrı değerlendirmeler gerektirebilir. İkisini de ilk görüşmede açıklayın."],
    ],
  },
  "vrf-servisi": {
    title: "VRF klima servisi: etkilenen alanı ve üniteleri tarif edin",
    sections: [
      { title: "Tek alan mı, birden fazla alan mı etkileniyor?", text: "VRF servisi talebinde sorunun tek bir iç ünitede mi yoksa birden fazla alanda mı görüldüğünü belirtin. Bütün sistemin durmasıyla belirli bir odadaki performans düşüşü aynı durum değildir. Biliyorsanız etkilenen ünite sayısını ve sorunun başlangıç zamanını paylaşın. Bu ayrım, teknik değerlendirme için başvurunun doğru açıklanmasına yardımcı olur." },
      { title: "Merkezi kontrol ve hata mesajları", text: "Kontrol ekranında görünen mesajı ve hangi alana ait olduğunu not edin. Marka/model, önceki işlem bilgisi ve binada sistemden sorumlu kişinin iletişim durumu görüşmeyi kolaylaştırabilir. VRF klima tamiri için bilinmeyen servis ayarlarını değiştirmeyin; ilk talepte mevcut gözleminizi aktarın. Aynı hata ifadesi model ve sistem yapısından bağımsız yorumlanmamalıdır." },
      { title: "VRF bakım talebinin kapsamını netleştirin", text: "Bakım görüşmesinde değerlendirilecek alanları, erişim koşullarını ve varsa çalışma saati kısıtlarını belirtin. İşlem kapsamı sistemin yapısına ve ihtiyacına göre ele alınır; tek bir ev tipi klima için konuşulan işlem planı bütün bir VRF sisteme doğrudan uygulanamaz. İlçeniz ve mevcut sistem bilgisiyle talebin ayrıntılarını paylaşabilirsiniz." },
    ],
    questions: [
      ["VRF sisteminde yalnızca bir oda etkileniyorsa bunu belirtmeli miyim?", "Evet. Etkilenen alanların sayısı ve diğer ünitelerin durumu önemli ön bilgilerdir. Bütün sistem arızalıymış gibi genellemek yerine gözlemlediğiniz alanı tarif edin."],
      ["VRF bakımı için ünite sayısını bilmek zorunlu mu?", "Biliyorsanız paylaşın. Bilmiyorsanız hizmet almak istediğiniz alanı ve mevcut kontrol bilgilerini anlatabilirsiniz; sistemin kapsamı değerlendirme sırasında netleştirilir."],
    ],
  },
};
