import { scrollToId } from '../lib/scroll'
import Magnetic from './Magnetic'

/* Abstract "resonance" mark: a ring, a struck center, sound radiating out. */
export default function Logo() {
  return (
    <Magnetic strength={0.35}>
      <a
        className="logo"
        href="#top"
        aria-label="Ajinkya Ranade — back to top"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('top')
        }}
      >
        <svg className="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden>
          <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
          <circle cx="15" cy="20" r="3.2" fill="currentColor" />
          <path d="M22 14.5c2.6 1.4 2.6 9.6 0 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M26 11.5c4.6 2.4 4.6 14.6 0 17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
        </svg>
        <span className="logo-name">
          Ajinkya Ranade
          <span>Tabla · Percussion</span>
        </span>
      </a>
    </Magnetic>
  )
}
