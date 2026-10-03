# Ajinkya Ranade — Personal Site

A single-page, scroll-animated portfolio for **Ajinkya Ranade** — tabla artist,
percussionist, vocalist, and founder of **Resonance Studios**.

Built with **Vite + React + Framer Motion + Lenis** (buttery smooth scrolling).

---

## ▶️ Run it locally

```bash
cd ajinkya-ranade-site
npm install        # first time only
npm run dev        # open the printed http://localhost:5173 URL
```

To make a production build:

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## ✏️ The ONE file you edit: `src/data/config.js`

Everything you'll want to plug in lives in **`src/data/config.js`**. You don't
need to touch any other file.

### 1. Add your videos

**Best quality — your own files:** drop `.mp4` files into `public/video/` and list them:
```js
localVideos: [
  { src: '/video/clip-1.mp4', title: 'Tabla Solo', poster: '/img/concert.jpg', portrait: false },
],
```
`portrait: true` for vertical clips. `poster` (optional) is the thumbnail shown before play.

**YouTube:** copy the ID (the part after `watch?v=`) and paste it:

```js
// https://www.youtube.com/watch?v=dQw4w9WgXcQ   →   id: 'dQw4w9WgXcQ'
videos: [
  { id: 'dQw4w9WgXcQ', title: 'Tabla Solo — Teentaal' },
  { id: 'aBcDeFgHiJk', title: 'Live Performance' },
],
```
Add or remove entries freely.

**Instagram reels/posts** — paste full public links into the `instagram` array
(only public posts embed):
```js
instagram: [
  'https://www.instagram.com/reel/ABC123xyz/',
  'https://www.instagram.com/reel/DEF456uvw/',
],
```
These render as Instagram's own embed cards under a "From Instagram" block.

### 2. Add your streaming links
Paste the share links to your released song:

```js
streaming: {
  spotify: 'https://open.spotify.com/track/XXXXXXXX',
  appleMusic: 'https://music.apple.com/us/album/your-song/XXXX',
  spotifyEmbedId: 'XXXXXXXX',   // optional: the ID from the Spotify track URL
                                // → shows an inline playable Spotify player
},
```
Buttons whose link is still a `PASTE_...` placeholder appear dimmed/disabled, so
nothing looks broken before you fill them in.

### 3. Socials (optional)
```js
socials: {
  instagram: 'https://instagram.com/yourhandle',
  youtube:   'https://youtube.com/@yourhandle',
},
```
Empty values are simply hidden.

### Contact details
Already set to:
- **Music:** ar.resonancestudios@gmail.com
- **Business:** zaxisventuresllc@gmail.com
- **Phone / WhatsApp:** +1 (669) 588-7804
- **Based in:** Santa Clara, CA

---

## 📝 Editing the words
All copy (bio, journey, Resonance mission, section titles) lives in
**`src/data/content.js`**.

## 🖼️ Swapping photos
Images live in **`public/img/`**. Replace a file with the same name to swap it,
or add a new one and reference `/img/yourfile.jpg` in the relevant section.

---

## 🚀 Deploying (free options)

**Easiest — Netlify or Vercel drag-and-drop:**
1. `npm run build`
2. Drag the generated **`dist/`** folder onto [app.netlify.com/drop](https://app.netlify.com/drop)
   (or import the repo in Vercel — framework preset: **Vite**).

**GitHub Pages / any static host:** upload the contents of `dist/`.

---

## 🗂️ Structure
```
src/
  data/config.js     ← EDIT links, videos, contact here
  data/content.js    ← EDIT copy here
  sections/          ← Hero, Statement, About, Lineage, Versatility,
                        Music, Resonance, Gallery, Contact
  components/        ← reusable animated pieces (nav, cursor, reveals, marquee…)
  styles.css         ← design system
public/img/          ← all photos
```
