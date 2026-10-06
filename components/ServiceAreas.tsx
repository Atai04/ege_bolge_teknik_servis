import { SERVICE_PROVINCES } from "../lib/regions";

export function ProvinceSummary() {
  return <div className="province-summary">
    {SERVICE_PROVINCES.map(province => <div key={province.id}>
      <h3>{province.name}</h3>
      <p>{province.id === "izmir"
        ? `İzmir’de listelenen ${province.districts.length} ilçede teknik servis desteği.`
        : `Aydın’ın ${province.districts.length} ilçesinin tamamında teknik servis desteği.`}</p>
      {province.exclusions.length > 0 && <p className="province-exclusions">{province.exclusions.join(", ").replace(/, ([^,]*)$/, " ve $1")} hizmet kapsamımız dışındadır.</p>}
    </div>)}
  </div>;
}

export function ServiceAreas() {
  return <section className="section container service-regions">
    <p className="eyebrow">Hizmet Bölgeleri</p>
    <h1>İzmir ve Aydın Hizmet Bölgeleri</h1>
    <p className="lead small">İzmir’de aşağıda listelenen 20 ilçede ve Aydın’ın 17 ilçesinin tamamında teknik servis hizmeti sunuyoruz. Cihazınızı ve bulunduğunuz ilçeyi paylaşarak servis talebinizi iletebilirsiniz.</p>
    <p>İşletmemiz Buca / İzmir adresindedir. Aydın hizmet bölgemizdir; Aydın’da şubemiz bulunmamaktadır.</p>
    <div className="province-grid">
      {SERVICE_PROVINCES.map(province => <section className="province-card" key={province.id} aria-labelledby={`province-${province.id}`}>
        <p className="eyebrow">{province.districts.length} hizmet ilçesi</p>
        <h2 id={`province-${province.id}`}>{province.name}</h2>
        <ul className="province-districts">{province.districts.map(name => <li key={name}>{name}</li>)}</ul>
        {province.exclusions.length > 0 && <p className="province-exclusions">Beydağ, Kiraz ve Ödemiş hizmet kapsamımız dışındadır.</p>}
      </section>)}
    </div>
    <p className="disclaimer light-disclaimer">Ege Bölge Teknik Servis Hizmetleri bağımsız özel teknik servis hizmeti sunmaktadır. Listelenen markaların yetkili servisi değildir.</p>
  </section>;
}
