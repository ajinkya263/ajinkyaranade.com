import { FadeUp, Words } from '../components/Reveal'
import Magnetic from '../components/Magnetic'
import SoundWave from '../components/SoundWave'
import InstagramGrid from '../components/InstagramEmbed'
import { Play, Spotify, Apple, Instagram } from '../components/icons'
import { music } from '../data/content'
import { config } from '../data/config'

const isReal = (v) => v && !String(v).startsWith('PASTE')

function VideoCard({ id, title }) {
  return (
    <FadeUp className="video-card">
      <div className="video-frame">
        {isReal(id) ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-placeholder">
            <div className="play">
              <Play style={{ width: 18, height: 18, marginLeft: 2 }} />
            </div>
            <small>Performance video coming soon</small>
          </div>
        )}
      </div>
      <div className="vtitle">{title}</div>
    </FadeUp>
  )
}

function StreamButton({ href, icon: Icon, label, accent }) {
  const real = isReal(href)
  // Don't render a button for a link that isn't set yet.
  if (!real) return null
  return (
    <Magnetic strength={0.3}>
      <a
        className={`btn ${accent ? 'btn-accent' : ''}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon />
        {label}
      </a>
    </Magnetic>
  )
}

export default function Music() {
  const { videos, streaming } = config
  const hasStream = isReal(streaming.spotify) || isReal(streaming.appleMusic)
  return (
    <section className="music" id="music">
      <div className="wrap">
        <div className="music-head">
          <FadeUp>
            <span className="eyebrow">{music.eyebrow}</span>
          </FadeUp>
          <h2 className="section-title">
            <Words text={music.title} />
          </h2>
          <FadeUp delay={0.1}>
            <p className="body-text" style={{ marginTop: 22, maxWidth: 620 }}>
              {music.body}
            </p>
          </FadeUp>
        </div>

        {config.localVideos?.length > 0 && (
          <div className="video-grid">
            {config.localVideos.map((v, i) => (
              <FadeUp className="video-card" key={i}>
                <div className={`video-frame ${v.portrait ? 'portrait' : ''}`}>
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
                {v.title && <div className="vtitle">{v.title}</div>}
              </FadeUp>
            ))}
          </div>
        )}

        {videos.length > 0 && (
          <div className="video-grid">
            {videos.map((v, i) => (
              <VideoCard key={i} id={v.id} title={v.title} />
            ))}
          </div>
        )}

        {config.instagram?.length > 0 && (
          <FadeUp className="ig-block">
            <div className="ig-head">
              <Instagram style={{ width: 16, height: 16 }} />
              <span>From Instagram</span>
            </div>
            <InstagramGrid links={config.instagram} />
          </FadeUp>
        )}

        {isReal(streaming.spotifyEmbedId) && (
          <FadeUp className="spotify-embed">
            <iframe
              title="Spotify player"
              src={`https://open.spotify.com/embed/track/${streaming.spotifyEmbedId}?theme=0`}
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </FadeUp>
        )}

        <FadeUp className="stream-row" delay={0.1}>
          {hasStream && (
            <span className="stream-label">
              <SoundWave bars={5} height={14} color="var(--accent)" /> Listen & follow
            </span>
          )}
          <StreamButton href={streaming.spotify} icon={Spotify} label="Spotify" accent />
          <StreamButton href={streaming.appleMusic} icon={Apple} label="Apple Music" />
          <StreamButton href={config.socials.instagram} icon={Instagram} label="Instagram" />
        </FadeUp>
      </div>
    </section>
  )
}
