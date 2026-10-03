import { useEffect, useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'

/* Seamless infinite marquee. Content is rendered twice; we translate the
   track and wrap by the width of a single copy. Static for reduced-motion. */
export default function Marquee({ items, speed = 40, direction = -1, className }) {
  const x = useMotionValue(0)
  const trackRef = useRef(null)
  const halfWidth = useRef(0)
  const reduce = useReducedMotion()

  const measure = () => {
    if (trackRef.current) halfWidth.current = trackRef.current.scrollWidth / 2
  }

  // Measure after fonts settle and whenever the viewport resizes, so the
  // display-font cities don't desync the wrap point.
  useEffect(() => {
    measure()
    let ro
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      ro = new ResizeObserver(measure)
      ro.observe(trackRef.current)
    }
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const hw = halfWidth.current
    if (!hw) {
      measure()
      return
    }
    let next = x.get() + (direction * speed * delta) / 1000
    if (next <= -hw) next += hw
    if (next >= 0) next -= hw
    x.set(next)
  })

  const Row = ({ ariaHidden }) =>
    items.map((it, i) => (
      <span className="marquee-item" key={i} aria-hidden={ariaHidden}>
        {it}
      </span>
    ))

  return (
    <div className={`marquee ${className || ''}`}>
      <motion.div className="marquee-track" ref={trackRef} style={{ x }}>
        <Row />
        <Row ariaHidden />
      </motion.div>
    </div>
  )
}
