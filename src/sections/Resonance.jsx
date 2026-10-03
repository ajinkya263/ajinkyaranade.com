import { FadeUp, Words } from '../components/Reveal'
import SoundWave from '../components/SoundWave'
import Magnetic from '../components/Magnetic'
import { Mail, WhatsApp, Instagram } from '../components/icons'
import { resonance } from '../data/content'
import { config } from '../data/config'

export default function Resonance() {
  return (
    <section className="resonance" id="resonance">
      <div className="wrap">
        <div className="res-top">
          <FadeUp className="res-logo-box">
            <img src="/img/rs-logo.png" alt="Resonance Studios logo" />
          </FadeUp>

          <div className="res-intro">
            <FadeUp>
              <span className="eyebrow">{resonance.eyebrow}</span>
            </FadeUp>
            <h2>
              <Words text={resonance.title} />
            </h2>
            <FadeUp delay={0.15} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <SoundWave bars={7} height={20} color="var(--accent)" />
              <span className="res-tagline">{resonance.tagline}</span>
            </FadeUp>
          </div>
        </div>

        <div className="res-mission">
          <FadeUp>
            <p>{resonance.mission}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <span className="sig">{resonance.signature}</span>
          </FadeUp>
        </div>

        <div className="pillars" id="classes">
          {resonance.pillars.map((p, i) => (
            <FadeUp className={`pillar ${p.featured ? 'featured' : ''}`} key={p.n} delay={i * 0.08}>
              {p.featured && <span className="pillar-badge">Featured</span>}
              <span className="n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="res-cta" delay={0.1}>
          <span className="ri-label">For Class Inquiries</span>
          <span className="ri-locations">In-person classes in Santa Clara &amp; the East Bay</span>
          <p className="res-cta-text">
            Message or call{' '}
            <a
              className="ri-link"
              href={`https://wa.me/${config.contact.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.contact.phone}
            </a>{' '}
            on WhatsApp, or DM{' '}
            <a
              className="ri-link"
              href={config.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.socials.instagramHandle}
            </a>{' '}
            on Instagram.
          </p>
          <div className="res-cta-actions">
            <Magnetic strength={0.3}>
              <a
                className="btn btn-accent"
                href={`https://wa.me/${config.contact.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp /> WhatsApp
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                className="btn"
                href={config.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram /> Instagram DM
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn" href={resonance.mailingList} target="_blank" rel="noopener noreferrer">
                <Mail /> Join the mailing list
              </a>
            </Magnetic>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
