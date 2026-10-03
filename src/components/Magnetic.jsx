import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Wrap a child so it drifts toward the cursor on hover. Disabled on touch. */
export default function Magnetic({ children, strength = 0.4 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.3 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  )
}
