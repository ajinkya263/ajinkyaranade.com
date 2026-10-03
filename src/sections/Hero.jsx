import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Pin, ArrowDown } from '../components/icons'
import SoundWave from '../components/SoundWave'
import { config } from '../data/config'

const EASE = [0.22, 1, 0.36, 1]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // The spotlight photo scales up and fades as you scroll away…
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const photoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  // …into black.
  const veilOpacity = useTransform(scrollYProgress, [0, 0.75], [0, 1])
  // The name lifts and fades on the way out.
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const uiOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-photo-wrap">
        <motion.img
          className="hero-photo"
          src="/img/hero.jpg"
          alt="Ajinkya Ranade performing Tabla under a spotlight"
          style={{ scale: photoScale, opacity: photoOpacity }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          fetchPriority="high"
        />
      </div>

      <motion.div className="hero-veil" style={{ opacity: veilOpacity }} aria-hidden />

      <motion.div className="hero-ui" style={{ opacity: uiOpacity }}>
        <motion.div
          className="hero-meta-left"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        >
          <Pin className="meta-icon" />
          <span className="meta-label">
            Based in
            <br />
            {config.location}
          </span>
        </motion.div>

        <motion.div
          className="hero-meta-right"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
        >
          <ArrowUpRight className="meta-icon" />
          <span className="meta-role">
            {config.role[0]}
            <br />
            <span className="sub">{config.role[1]}</span>
          </span>
        </motion.div>
      </motion.div>

      <motion.h1 className="hero-sign" style={{ y: nameY, opacity: nameOpacity }}>
        <span className="hero-sign-text">
          <motion.span
            style={{ display: 'inline-block' }}
            initial={reduce ? false : { clipPath: 'inset(0 100% -10% 0)' }}
            animate={{ clipPath: 'inset(0 0% -10% 0)' }}
            transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.6 }}
          >
            {config.name}
          </motion.span>
          {!reduce && (
            <motion.span
              className="hero-sign-pen"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.8, ease: 'easeInOut', delay: 0.6 }}
            />
          )}
        </span>
      </motion.h1>

      <motion.div className="hero-scroll-hint" style={{ opacity: uiOpacity }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <SoundWave bars={6} height={16} />
          Scroll
          <ArrowDown style={{ width: 14, height: 14 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
