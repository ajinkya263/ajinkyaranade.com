import { FadeUp, Words } from '../components/Reveal'
import { Instagram, YouTube, MusicNote, Briefcase, WhatsApp, Pin } from '../components/icons'
import { contactCopy } from '../data/content'
import { config } from '../data/config'

const isReal = (v) => v && !String(v).startsWith('PASTE')

export default function Contact() {
  const { contact, socials, name } = config
  const year = new Date().getFullYear()

  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <div className="contact-cta">
          <FadeUp>
            <span className="eyebrow">{contactCopy.eyebrow}</span>
          </FadeUp>
          <h2>
            <Words text={contactCopy.title} />
          </h2>
        </div>

        <div className="contact-grid">
          <div className="cblock">
            <div className="k">
              <MusicNote className="cicon" /> Music Inquiries
            </div>
            <a href={`mailto:${contact.musicEmail}`}>{contact.musicEmail}</a>
            <span className="sub">Performances, lessons & Resonance Studios</span>
          </div>

          <div className="cblock">
            <div className="k">
              <Briefcase className="cicon" /> Business Inquiries
            </div>
            <a href={`mailto:${contact.businessEmail}`}>{contact.businessEmail}</a>
            <span className="sub">Bookings, collaborations & ventures</span>
          </div>

          <div className="cblock">
            <div className="k">
              <WhatsApp className="cicon" /> Call / WhatsApp
            </div>
            <a href={`https://wa.me/${contact.phoneRaw}`} target="_blank" rel="noopener noreferrer">
              {contact.phone}
            </a>
            <span className="sub">Reachable on WhatsApp</span>
          </div>

          <div className="cblock">
            <div className="k">
              <Pin className="cicon" /> Based in
            </div>
            <span className="v">{contact.base}</span>
            <span className="sub">Available across the Bay Area & beyond</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {name}. All rights reserved.
          </span>
          <div className="socials">
            {isReal(socials.instagram) && (
              <a className="social-link" href={socials.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram style={{ width: 16, height: 16 }} />
                {socials.instagramHandle || 'Instagram'}
              </a>
            )}
            {isReal(socials.youtube) && (
              <a className="social-link" href={socials.youtube} target="_blank" rel="noopener noreferrer">
                <YouTube style={{ width: 16, height: 16 }} />
                YouTube
              </a>
            )}
            <span>Designed with resonance.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
