import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion'

import { setLenis } from './lib/scroll'
import { Frame, Grain, ScrollProgress } from './components/Overlays'
import Cursor from './components/Cursor'
import Topbar from './components/Topbar'

import Hero from './sections/Hero'
import Statement from './sections/Statement'
import About from './sections/About'
import Lineage from './sections/Lineage'
import Versatility from './sections/Versatility'
import Music from './sections/Music'
import Resonance from './sections/Resonance'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'

function BgGlow() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['10vh', '80vh'])
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ['-10vw', '40vw', '-5vw'])
  return <motion.div className="bg-glow" style={{ top: y, left: x }} aria-hidden />
}

export default function App() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    setLenis(lenis)

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Frame />
      <Grain />
      <ScrollProgress />
      <BgGlow />
      <Cursor />
      <Topbar />

      <main>
        <Hero />
        <Statement />
        <About />
        <Lineage />
        <Versatility />
        <Music />
        <Resonance />
        <Gallery />
      </main>

      <Contact />
    </MotionConfig>
  )
}
