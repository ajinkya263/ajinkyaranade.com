import { motion, useReducedMotion } from 'framer-motion'

/* Animated equalizer bars — the "resonance" motif. Static for reduced-motion. */
export default function SoundWave({ bars = 9, height = 26, color = 'currentColor', play = true }) {
  const reduce = useReducedMotion()
  const animate = play && !reduce
  const width = bars * 5
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const x = i * 5 + 1
        const peak = [0.4, 0.85, 0.55, 1, 0.45, 0.9, 0.6, 0.8, 0.35][i % 9]
        return (
          <motion.rect
            key={i}
            x={x}
            width={2.4}
            rx={1.2}
            fill={color}
            initial={{ height: 4, y: height / 2 - 2 }}
            animate={
              animate
                ? {
                    height: [4, height * peak, 4],
                    y: [height / 2 - 2, height / 2 - (height * peak) / 2, height / 2 - 2],
                  }
                : { height: 4, y: height / 2 - 2 }
            }
            transition={{
              duration: 1 + (i % 4) * 0.18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.08,
            }}
          />
        )
      })}
    </svg>
  )
}
