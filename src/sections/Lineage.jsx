import { FadeUp, Words } from '../components/Reveal'
import { lineage } from '../data/content'

export default function Lineage() {
  return (
    <section className="lineage" id="lineage">
      <div className="wrap">
        <div className="lineage-head">
          <div>
            <FadeUp>
              <span className="eyebrow">{lineage.eyebrow}</span>
            </FadeUp>
            <h2 className="section-title">
              <Words text={lineage.title} />
            </h2>
          </div>
          <div className="lineage-media-wrap">
            <FadeUp className="lineage-media" delay={0.1}>
              <img src="/img/ceremony.jpg" alt="Ajinkya with Shri Yashwant Vaishnav in Mumbai" />
            </FadeUp>
            <FadeUp as="figcaption" className="lineage-caption" delay={0.18}>
              Ajinkya with Shri Yashwant Vaishnav after learning Tabla with him in Mumbai for one
              month continuously, in a Gurukul-type setting.
            </FadeUp>
          </div>
        </div>

        <div className="steps">
          {lineage.steps.map((s, i) => (
            <FadeUp className="step" key={i} delay={i * 0.05}>
              <div className="when">{s.when}</div>
              <div>
                <div className="who">{s.who}</div>
                <div className="where">{s.where}</div>
              </div>
              <p className="note">{s.note}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
