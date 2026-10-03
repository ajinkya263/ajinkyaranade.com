import { useState } from 'react'
import { FadeUp } from '../components/Reveal'

const PHOTOS = [
  { src: '/img/concert.jpg', alt: 'Ajinkya performing a Tabla solo on stage' },
  {
    src: '/img/surinder-mann.jpg',
    alt: 'A young Ajinkya learning Tabla',
    caption: 'With Ustad Surinder Mann Saheb',
  },
  { src: '/img/audience.jpg', alt: 'A full auditorium at a performance' },
  {
    src: '/img/teaching.jpg',
    alt: 'Ajinkya learning from Pandit Yogesh Samsi',
    caption: 'With Pandit Yogesh Samsi Ji in London',
  },
  { src: '/img/speaking.jpg', alt: 'Ajinkya addressing the audience at a Resonance Studios event' },
  { src: '/img/concert-pov.jpg', alt: 'A performer’s view of the crowd from behind the Tabla' },
]

function FlipPhoto({ src, alt, caption, delay }) {
  const [flipped, setFlipped] = useState(false)
  const toggle = () => setFlipped((f) => !f)
  return (
    <FadeUp
      className={`gphoto flip ${flipped ? 'flipped' : ''}`}
      delay={delay}
      y={36}
      role="button"
      tabIndex={0}
      aria-label={`${alt}. Activate to ${flipped ? 'hide' : 'reveal'} the caption.`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <div className="flip-inner">
        <div className="flip-front">
          <img src={src} alt={alt} loading="lazy" />
        </div>
        <div className="flip-back" aria-hidden={!flipped}>
          <span className="flip-back-text">
            <span className="accent">✦ The Lineage</span>
            {caption}
          </span>
        </div>
      </div>
    </FadeUp>
  )
}

export default function Gallery() {
  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-h">
      <div className="wrap">
        <h2 id="gallery-h" className="visually-hidden">On Stage — Gallery</h2>
        <div className="gallery-head">
          <FadeUp>
            <span className="eyebrow">On Stage</span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="body-text" style={{ maxWidth: 360 }}>
              From intimate baithaks to packed auditoriums across continents.
            </p>
          </FadeUp>
        </div>

        <div className="gallery-grid">
          {PHOTOS.map((p, i) =>
            p.caption ? (
              <FlipPhoto key={i} {...p} delay={(i % 3) * 0.06} />
            ) : (
              <FadeUp className="gphoto" key={i} delay={(i % 3) * 0.06} y={36}>
                <img src={p.src} alt={p.alt} loading="lazy" />
              </FadeUp>
            )
          )}
        </div>
      </div>
    </section>
  )
}
