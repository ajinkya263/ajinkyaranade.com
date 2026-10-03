import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeUp } from '../components/Reveal'
import Marquee from '../components/Marquee'
import { intro, stats, cities } from '../data/content'

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section className="about" id="about" ref={ref} aria-labelledby="about-h">
      <div className="wrap">
        <h2 id="about-h" className="visually-hidden">About Ajinkya Ranade</h2>
        <div className="about-grid">
          <FadeUp className="about-portrait">
            <motion.img
              src="/img/portrait.jpg"
              alt="Ajinkya Ranade playing Tabla"
              style={{ y: imgY, scale: 1.12 }}
            />
          </FadeUp>

          <div className="about-copy">
            <FadeUp>
              <span className="eyebrow">{intro.eyebrow}</span>
            </FadeUp>
            <FadeUp delay={0.05}>
              <p className="lead">{intro.lead}</p>
            </FadeUp>
            {intro.paragraphs.map((p, i) => (
              <FadeUp key={i} delay={0.08 + i * 0.05}>
                <p className="body-text">{p}</p>
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp>
          <div className="stats">
            {stats.map((s, i) => (
              <div className="stat" key={i}>
                <div className="v">{s.value}</div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      <div style={{ marginTop: 'clamp(56px, 8vw, 110px)' }}>
        <Marquee items={cities} speed={45} />
      </div>
    </section>
  )
}
