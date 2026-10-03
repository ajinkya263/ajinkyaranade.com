import { useEffect } from 'react'

/* Loads Instagram's official embed script once, then renders each public
   Reel/Post link as a native Instagram embed. Only public posts will appear. */

let scriptPromise = null
function loadInstagram() {
  if (window.instgrm) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve) => {
    const s = document.createElement('script')
    s.id = 'instagram-embed-script'
    s.src = 'https://www.instagram.com/embed.js'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => resolve()
    document.body.appendChild(s)
  })
  return scriptPromise
}

export default function InstagramGrid({ links = [] }) {
  useEffect(() => {
    if (!links.length) return
    let cancelled = false
    loadInstagram().then(() => {
      if (!cancelled) window.instgrm?.Embeds?.process()
    })
    return () => {
      cancelled = true
    }
  }, [links])

  if (!links.length) return null

  return (
    <div className="ig-grid">
      {links.map((url) => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ background: '#fff', border: 0, margin: 0, padding: 0, width: '100%' }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            View this performance on Instagram
          </a>
        </blockquote>
      ))}
    </div>
  )
}
