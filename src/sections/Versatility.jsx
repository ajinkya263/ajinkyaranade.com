import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FadeUp } from '../components/Reveal'
import { versatility } from '../data/content'

function ParallaxImg({ src, alt, contain }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  if (contain) {
    return (
      <FadeUp className="vmedia contain" ref={ref}>
        <img src={src} alt={alt} />
      </FadeUp>
    )
  }
  return (
    <FadeUp className="vmedia" ref={ref}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.12 }} />
    </FadeUp>
  )
}

export default function Versatility() {
  const { instruments, choir, education } = versatility
  return (
    <section className="versatility" id="versatility" aria-labelledby="versatility-h">
      <div className="wrap">
        <h2 id="versatility-h" className="visually-hidden">Versatility & Craft</h2>
        {/* Percussion */}
        <div className="vsplit">
          <div className="vtext">
            <FadeUp>
              <span className="eyebrow">{versatility.eyebrow}</span>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h3>{versatility.title}</h3>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="body-text">{versatility.body}</p>
            </FadeUp>
            <FadeUp delay={0.15} className="pill-row">
              {instruments.map((it) => (
                <span className="pill" key={it}>
                  {it}
                </span>
              ))}
            </FadeUp>
          </div>
          <ParallaxImg src="/img/studio.jpg" alt="Ajinkya's percussion studio setup" />
        </div>

        {/* Choir / voice */}
        <div className="vsplit reverse">
          <div className="vtext">
            <FadeUp>
              <span className="eyebrow">Voice</span>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h3>{choir.title}</h3>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="body-text">{choir.body}</p>
            </FadeUp>
            <FadeUp delay={0.15} className="pill-row">
              {choir.places.map((it) => (
                <span className="pill" key={it}>
                  {it}
                </span>
              ))}
            </FadeUp>
          </div>
          <ParallaxImg src="/img/choir.jpg" alt="Ajinkya performing with his school choir" />
        </div>

        {/* Education */}
        <div className="vsplit">
          <div className="vtext">
            <FadeUp>
              <span className="eyebrow">Beyond the stage</span>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h3>{education.title}</h3>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="body-text">{education.body}</p>
            </FadeUp>
          </div>
          <ParallaxImg src="/img/perform-teal.jpg" alt="Ajinkya performing Tabla" contain />
        </div>
      </div>
    </section>
  )
}
