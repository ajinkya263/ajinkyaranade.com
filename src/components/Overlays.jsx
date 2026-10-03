import { motion, useScroll, useSpring } from 'framer-motion'

export function Frame() {
  return <div className="frame" aria-hidden />
}

export function Grain() {
  return <div className="grain" aria-hidden />
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />
}
