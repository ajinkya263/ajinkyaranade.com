import { forwardRef, Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/* Generic fade-up that fires once when scrolled into view.
   For reduced-motion users it renders fully visible immediately. */
export const FadeUp = forwardRef(function FadeUp(
  { children, delay = 0, y = 28, className, as = 'div', ...rest },
  ref
) {
  const reduce = useReducedMotion()
  const M = motion[as] || motion.div
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12% 0px' },
        transition: { duration: 0.9, ease: EASE, delay },
      }
  return (
    <M ref={ref} className={className} {...anim} {...rest}>
      {children}
    </M>
  )
})

/* Word-by-word masked reveal for headings. Pass a string.
   For reduced-motion users words render in place, fully visible. */
export function Words({ text, className, delay = 0, stagger = 0.06, accent = [] }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              paddingBottom: '0.16em',
              marginBottom: '-0.16em',
            }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              className={accent.includes(i) ? 'accent-word' : undefined}
              initial={reduce ? false : { y: '110%' }}
              whileInView={reduce ? undefined : { y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, ease: EASE, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </span>
  )
}
