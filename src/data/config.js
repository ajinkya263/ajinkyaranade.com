/* =============================================================================
   EDIT ME  ·  All of Ajinkya's links live here.
   This is the ONLY file you need to touch to plug in real videos / streaming.
   ========================================================================== */

export const config = {
  name: 'Ajinkya Ranade',
  role: ['Tabla Artist', '& Percussionist'],
  location: 'Santa Clara, CA',

  // -------------------------------------------------------------------------
  // VIDEOS  ·  paste YouTube video IDs (the part after  watch?v=  )
  // e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ   ->   'dQw4w9WgXcQ'
  // Add or remove items freely. Leave the array empty to hide the video grid.
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // VIDEO FILES (best quality / on-brand)  ·  drop .mp4 files into public/video/
  // and list them here. `poster` (optional) is a thumbnail shown before play —
  // put it in public/img/. Set `portrait: true` for vertical (9:16) clips.
  // Leave the array empty to hide.
  // -------------------------------------------------------------------------
  localVideos: [
    {
      src: '/video/clip-2.mp4',
      title: 'A Tribute to Ustad Zakir Hussain',
      poster: '/img/poster-2.jpg',
    },
    {
      src: '/video/clip-1.mp4',
      title: 'Tabla Solo in Mumbai',
      poster: '/img/poster-1.jpg',
    },
    {
      src: '/video/clip-3.mp4',
      title: 'Tabla Solo, Baithak',
      poster: '/img/poster-3.jpg',
    },
  ],

  // -------------------------------------------------------------------------
  // YOUTUBE  ·  paste video IDs (the part after  watch?v=  ). Empty array hides.
  // -------------------------------------------------------------------------
  videos: [
    // { id: 'dQw4w9WgXcQ', title: 'Live Performance' },
  ],

  // -------------------------------------------------------------------------
  // INSTAGRAM  ·  paste full public Reel/Post links (one per line).
  // e.g. 'https://www.instagram.com/reel/ABC123xyz/'
  // Only PUBLIC posts embed. Leave the array empty to hide this block.
  // -------------------------------------------------------------------------
  instagram: [
    // NOTE: Instagram now often shows "post may be broken/removed" to visitors
    // who aren't logged into Instagram, even for public reels. Re-enable by
    // uncommenting if you've confirmed it displays for logged-OUT viewers.
    // 'https://www.instagram.com/reel/DAzy_YiJhYt/',
  ],

  // -------------------------------------------------------------------------
  // STREAMING  ·  paste the full share links to your released song.
  // Leave a value as '' (empty) to hide that button.
  // -------------------------------------------------------------------------
  streaming: {
    spotify: 'https://open.spotify.com/track/0GVTG38LP6mhx9ILDb9HsC',
    appleMusic: 'https://music.apple.com/us/album/mishra-kirwani-music-of-joy-and-beyond-live-feat/1801551334',
    // Optional: the Spotify track ID for the inline player
    // e.g. https://open.spotify.com/track/THIS_PART  ->  'THIS_PART'
    spotifyEmbedId: '0GVTG38LP6mhx9ILDb9HsC',
  },

  // -------------------------------------------------------------------------
  // CONTACT
  // -------------------------------------------------------------------------
  contact: {
    musicEmail: 'ar.resonancestudios@gmail.com',
    businessEmail: 'zaxisventuresllc@gmail.com',
    phone: '+1 (669) 588-7804',
    phoneRaw: '16695887804', // for the WhatsApp link
    base: 'Santa Clara, CA',
  },

  // -------------------------------------------------------------------------
  // SOCIALS  ·  paste profile URLs, or leave '' to hide.
  // -------------------------------------------------------------------------
  socials: {
    instagram: 'https://www.instagram.com/ajinkyaranademusic/',
    instagramHandle: '@ajinkyaranademusic',
    youtube: '',
    resonanceInstagram: '',
  },
}
