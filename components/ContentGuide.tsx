import type { PageGuide } from "../lib/service-guides";

export function ContentGuide({ guide }: { guide: PageGuide }) {
  return <section className="content-guide" aria-labelledby="content-guide-title">
    <div className="container content-guide__inner">
      <p className="eyebrow">Servis rehberi</p>
      <h2 id="content-guide-title">{guide.title}</h2>
      <div className="content-guide__sections">
        {guide.sections.map(section => <div key={section.title} className="content-guide__section">
          <h3>{section.title}</h3>
          <p>{section.text}</p>
        </div>)}
      </div>
    </div>
  </section>;
}

export function GuideQuestions({ guide }: { guide: PageGuide }) {
  return <section className="faq-section" aria-labelledby="service-faq-title">
    <div className="container faq-layout">
      <div><p className="eyebrow">Sık sorulan sorular</p><h2 id="service-faq-title">Servis öncesi merak edilenler</h2></div>
      <div className="faq-list">
        {guide.questions.map(([question, answer]) => <details key={question}>
          <summary>{question}<span aria-hidden="true">+</span></summary>
          <p>{answer}</p>
        </details>)}
      </div>
    </div>
  </section>;
}
