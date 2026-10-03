import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Logo from './Logo'
import { scrollToId } from '../lib/scroll'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'lineage', label: 'Journey' },
  { id: 'music', label: 'Listen' },
  { id: 'resonance', label: 'Resonance' },
  { id: 'classes', label: 'Classes' },
]
const CONTACT = { id: 'contact', label: 'Contact' }
const ALL_LINKS = [...NAV_LINKS, CONTACT]

const EASE = [0.22, 1, 0.36, 1]
const fade = {
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  hide: { opacity: 0, y: -18, transition: { duration: 0.4, ease: EASE } },
}

export default function Topbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const toggleRef = useRef(null)
  const drawerRef = useRef(null)
  const lastFocus = useRef(null)

  // Hide logo + main nav on scroll down; reveal on the slightest scroll up.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    const diff = y - prev
    if (y < 80) {
      setHidden(false)
      return
    }
    if (diff > 4) setHidden(true)
    else if (diff < -4) setHidden(false)
  })

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 260 : 0)
  }

  // Accessibility for the mobile drawer: focus trap, Escape, inert background.
  useEffect(() => {
    const main = document.querySelector('main')
    if (open) {
      lastFocus.current = document.activeElement
      if (main) main.inert = true
      const t = setTimeout(() => drawerRef.current?.querySelector('a')?.focus(), 60)
      const onKey = (e) => {
        if (e.key === 'Escape') {
          setOpen(false)
          return
        }
        if (e.key === 'Tab') {
          const f = [toggleRef.current, ...(drawerRef.current?.querySelectorAll('a') || [])].filter(Boolean)
          if (!f.length) return
          const idx = f.indexOf(document.activeElement)
          e.preventDefault()
          const dir = e.shiftKey ? -1 : 1
          f[(idx + dir + f.length) % f.length].focus()
        }
      }
      document.addEventListener('keydown', onKey)
      return () => {
        clearTimeout(t)
        document.removeEventListener('keydown', onKey)
        if (main) main.inert = false
        lastFocus.current?.focus?.()
      }
    }
  }, [open])

  return (
    <>
      <header className="topbar">
        <motion.div
          className="logo-wrap"
          variants={fade}
          animate={hidden ? 'hide' : 'show'}
          style={{ pointerEvents: hidden ? 'none' : 'auto' }}
        >
          <Logo />
        </motion.div>

        <nav className="nav" aria-label="Primary">
          <motion.div
            className="nav-links"
            variants={fade}
            animate={hidden ? 'hide' : 'show'}
            style={{ pointerEvents: hidden ? 'none' : 'auto' }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.id)
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>

          <a
            className="nav-contact"
            href={`#${CONTACT.id}`}
            onClick={(e) => {
              e.preventDefault()
              go(CONTACT.id)
            }}
          >
            {CONTACT.label}
          </a>
        </nav>

        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls="mobile-drawer"
          onClick={() => setOpen((o) => !o)}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }} />
          <motion.span animate={{ opacity: open ? 0 : 1 }} />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            ref={drawerRef}
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {ALL_LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: EASE }}
                onClick={(e) => {
                  e.preventDefault()
                  go(l.id)
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
