/* =============================================================================
   RESONANCE ASSISTANT · Knowledge Base
   -----------------------------------------------------------------------------
   This is the brain of the little chat assistant on the site. It runs ENTIRELY
   in the visitor's browser, no server, no API keys, no tokens, no cost. Ever.

   HOW IT WORKS
   Each entry below has:
     • tags  , words/phrases a visitor might type. If their question contains
                these, this entry scores higher. Add as many synonyms as you like.
     • answer, what the assistant replies. Keep it warm and short.
     • actions (optional), buttons shown under the answer (links / email / etc.)
     • hint   (optional), soft context words that disambiguate similar intents.

   TO TEACH IT SOMETHING NEW
     Just copy an entry, change the tags + answer, done. No code knowledge needed.
     More specific entries should have more specific tags so they win.
   ========================================================================== */

import { config } from './config'
import { resonance } from './content'
import { EXTRA_FAQS } from './faqs'

const C = config.contact
const whatsapp = `https://wa.me/${C.phoneRaw}`
const email = `mailto:${C.musicEmail}`
const businessMail = `mailto:${C.businessEmail}`
const mailingList = resonance.mailingList
const studentPortal = config.studentPortal
const PHONE = C.phone
const MUSIC_EMAIL = C.musicEmail
const BUSINESS_EMAIL = C.businessEmail

/* The welcome message + the suggested starter chips shown when it opens. */
export const greeting =
  "Namaste! I'm the Resonance assistant, ask me anything about Ajinkya, learning the Tabla, booking a concert, or joining classes."

export const suggestions = [
  'How do I join classes?',
  'How can I book him for a concert?',
  'Where are classes held?',
  'How long has he been playing?',
  'What is a kaida?',
]

/* The reply when nothing matches well. Always routes to a human. */
export const fallback = {
  answer: `That's a great question, I don't have a set answer for it, but Ajinkya would love to help directly. You can reach him on WhatsApp/call at ${PHONE} or by email at ${MUSIC_EMAIL}.`,
  actions: [
    { label: 'Message on WhatsApp', href: whatsapp },
    { label: 'Email Ajinkya', href: email },
  ],
}

/* Grounding for the optional on-device AI (Chrome's Prompt API / Gemini Nano).
   Used only when the visitor's browser already has a local model — open-ended
   answers at zero API/token cost, since it runs entirely on their machine. */
export const ASSISTANT_SYSTEM_PROMPT = `You are the warm, knowledgeable Resonance assistant for Ajinkya Ranade, a versatile Tabla artist and percussionist based in Santa Clara, California, and the founder of Resonance Studios.

You help visitors with: the Tabla (North Indian / Hindustani classical hand drums), Ajinkya himself, joining his Tabla classes, and booking him for a concert or collaboration.

About Ajinkya: he began the Tabla at age 6 under Ustad Surinder Mann and has trained under Pandit Yogesh Samsi and Shri Yashwant Vaishnav, with 13+ years in music. He teaches in person in Santa Clara and the East Bay through Resonance Studios (classes, workshops, concerts). To join classes or ask anything, the best contact is WhatsApp/call ${PHONE} or email ${MUSIC_EMAIL}; there is also a mailing list for openings and events.

Reliable tabla facts: the tabla is a pair of drums — the small wooden treble dayan (right hand) and the large metal bass bayan (left hand), whose pitch bends under the heel of the palm; the black circle is the syahi. Rhythm is organised in cycles (taal) of beats (matra); the first beat is the sam. Bols are spoken syllables (Dha, Dhin, Na, Tin). The six gharanas are Delhi, Ajrada, Lucknow, Farrukhabad, Benares and Punjab. Teentaal has 16 beats.

Style: reply in 2-4 warm, clear sentences. Be accurate about the tabla and music. For specifics like exact pricing or schedules, suggest contacting Ajinkya directly. Keep the focus on the tabla, learning, and Ajinkya's music. Never invent facts about real people.`

export const knowledge = [
  /* ================================================================ CLASSES */
  {
    id: 'join-classes',
    tags: [
      'join', 'sign up', 'signup', 'enroll', 'enrol', 'register', 'start classes',
      'start learning', 'take classes', 'how do i join', 'become a student',
      'join classes', 'learn from you', 'learn from ajinkya', 'get started',
      'how to join', 'how do i start', 'take lessons', 'want to learn tabla',
    ],
    answer:
      "Love it. The best first step is to join the mailing list, Ajinkya personally reaches out with openings, schedules, and details. You can also message him directly on WhatsApp or by email to introduce yourself.",
    actions: [
      { label: 'Join the mailing list', href: mailingList },
      { label: 'Message on WhatsApp', href: whatsapp },
    ],
  },
  {
    id: 'location',
    tags: [
      'where', 'location', 'located', 'city', 'where are classes', 'where do you teach',
      'santa clara', 'east bay', 'bay area', 'near me', 'in person', 'in-person',
      'place', 'studio location', 'which area', 'what city',
    ],
    answer:
      "Classes are taught in person in two spots: Santa Clara and the East Bay. Ajinkya is based in Santa Clara, CA. Let him know which is easier for you and he'll help you figure out the best fit.",
    actions: [{ label: 'Ask about a location', href: whatsapp }],
  },
  {
    id: 'beginners',
    tags: [
      'beginner', 'new to tabla', 'never played', 'no experience', 'first time',
      'start from scratch', 'absolute beginner', 'teach beginners', 'complete beginner',
      'is it for beginners', 'can i learn with no experience',
    ],
    answer:
      "Absolutely, beginners are welcome, no experience needed. Ajinkya started on the Tabla at age 6 and teaches students of many ages and levels, building up the fundamentals step by step. Whether you're a curious adult or a young first-timer, there's a place for you.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },
  {
    id: 'kids-age',
    tags: [
      'kids', 'child', 'children', 'my son', 'my daughter', 'how old', 'what age',
      'age to start', 'youngest', 'too young', 'minimum age', 'for my kid',
      'teach children', 'young learner', 'age requirement',
    ],
    answer:
      "Children are very welcome, Ajinkya himself began at age 6. There's no strict cutoff; what matters most is genuine interest and a little patience. Reach out with your child's age and he'll let you know the best way to start.",
    actions: [{ label: 'Ask about your child', href: whatsapp }],
  },
  {
    id: 'adults',
    tags: [
      'adult', 'adults', 'too old', 'too late', 'am i too old', 'learn as an adult',
      'older beginner', 'start as an adult', 'late to start',
    ],
    answer:
      "It's never too late, adults make wonderful Tabla students, and many start later in life purely for the love of it. Ajinkya meets you where you are and builds from there, at a pace that fits your life.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },
  {
    id: 'online',
    tags: [
      'online', 'remote', 'virtual', 'zoom', 'over video', 'long distance',
      'out of state', 'not in bay area', 'can i learn online', 'distance learning',
      'online lessons', 'online classes',
    ],
    answer:
      "Classes are primarily taught in person in Santa Clara and the East Bay, which is really where the Tabla is best learned. If you're outside the area, message Ajinkya, it's worth asking what might be possible.",
    actions: [{ label: 'Ask Ajinkya', href: whatsapp }],
  },
  {
    id: 'cost',
    tags: [
      'cost', 'price', 'pricing', 'fee', 'fees', 'how much', 'tuition', 'rate',
      'rates', 'expensive', 'afford', 'per class', 'per lesson', 'monthly',
      'what does it cost', 'charge', 'how much does it cost',
    ],
    answer:
      "Pricing depends on format and frequency, so Ajinkya shares the details directly once he understands what you're looking for. Reach out on WhatsApp or join the mailing list and he'll walk you through the options.",
    actions: [
      { label: 'Ask about pricing', href: whatsapp },
      { label: 'Join the mailing list', href: mailingList },
    ],
  },
  {
    id: 'schedule',
    tags: [
      'schedule', 'what days', 'times', 'timing', 'how often', 'weekly',
      'frequency', 'availability', 'available', 'slots', 'openings', 'when are classes',
      'days and times', 'current openings',
    ],
    answer:
      "Schedules and openings change over time, so the mailing list is the best way to catch availability, Ajinkya sends out details there. You can also ask him directly about current slots.",
    actions: [
      { label: 'Join the mailing list', href: mailingList },
      { label: 'Ask about openings', href: whatsapp },
    ],
  },
  {
    id: 'what-learn',
    tags: [
      'what will i learn', 'curriculum', 'what do you teach', 'syllabus',
      'learn to play', 'what is taught', 'what do classes cover', 'course content',
      'lesson plan', 'what you teach',
    ],
    answer:
      "Classes build genuine fluency in the language of the Tabla, its bols (the spoken syllables), taals (rhythmic cycles), technique, and repertoire. You'll grow both as a solo player and as an accompanist, grounded in a real traditional foundation.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },
  {
    id: 'private-vs-group',
    tags: [
      'private', 'one on one', 'one-on-one', 'group', 'group class', 'solo lesson',
      'individual', 'private lesson', 'group or private', 'class size',
    ],
    answer:
      "Ajinkya tailors instruction to each student, so the format can vary. The best way to find the right fit, private attention or learning alongside others, is to tell him your goals and he'll recommend what works.",
    actions: [{ label: 'Ask about format', href: whatsapp }],
  },
  {
    id: 'trial',
    tags: [
      'trial', 'trial class', 'first lesson', 'first class', 'try a class',
      'intro class', 'try it out', 'free lesson', 'sample class', 'try before',
    ],
    answer:
      "The best way to see if it's a fit is to reach out and have a conversation with Ajinkya about your goals. Message him on WhatsApp or email and he'll help you take the first step.",
    actions: [
      { label: 'Message on WhatsApp', href: whatsapp },
      { label: 'Email Ajinkya', href: email },
    ],
  },
  {
    id: 'what-to-bring',
    tags: [
      'what to bring', 'what do i need', 'do i need my own tabla', 'need my own',
      'need an instrument', 'bring my own', 'do i need equipment', 'what should i bring',
    ],
    answer:
      "To really progress you'll want your own Tabla to practice on at home, but don't let that stop you from reaching out first, Ajinkya guides new students on what to get so you don't buy the wrong set. Bring curiosity and a willingness to practice.",
    actions: [{ label: 'Ask what to get', href: whatsapp }],
  },
  {
    id: 'levels',
    tags: [
      'levels', 'level', 'progress', 'how do i progress', 'advanced', 'intermediate',
      'exams', 'grades', 'certification', 'certificate', 'how far can i go',
      'advanced students',
    ],
    answer:
      "Students progress from the fundamentals toward real fluency, solo repertoire and accompaniment, at their own pace. Whether you want a casual hobby or a serious path, Ajinkya shapes the journey around your goals.",
    actions: [{ label: 'Ask about the path', href: whatsapp }],
  },
  {
    id: 'student-performance',
    tags: [
      'perform as a student', 'student performance', 'recital', 'showcase',
      'play on stage', 'performance opportunity', 'do students perform',
      'can i perform', 'student concert', 'students perform', 'can students perform',
      'will i get to perform',
    ],
    answer:
      "Yes, performing is part of growing as a musician, and Resonance Studios curates concerts and gatherings where the Tabla is featured. As you develop, Ajinkya helps you find the right moments to share your playing.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'class-length',
    tags: [
      'how long is a class', 'class length', 'lesson length', 'how long are lessons',
      'duration of class', 'how long does a lesson last', 'class duration',
    ],
    answer:
      "Lesson length can vary with level and format, so Ajinkya sets this up with you directly based on what you're aiming for. Message him and he'll lay out the options.",
    actions: [{ label: 'Ask Ajinkya', href: whatsapp }],
  },
  {
    id: 'practice-expectation',
    tags: [
      'how much practice', 'practice time', 'how often practice', 'practice at home',
      'homework', 'time commitment', 'how much time', 'daily practice needed',
    ],
    answer:
      "Even 20-30 focused minutes a day, done consistently, goes a long way, Tabla rewards steady practice far more than occasional long sessions. Ajinkya helps you build a realistic routine you can actually keep.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },

  /* ====================================================== CONTACT & BOOKING */
  {
    id: 'concert-booking',
    tags: [
      'book a concert', 'book him for a concert', 'contact him for a concert',
      'hire for a concert', 'perform at my', 'book a performance', 'book for an event',
      'hire him', 'book him', 'invite him to perform', 'have him perform',
      'book ajinkya', 'concert booking', 'performance booking', 'live performance booking',
      'how can i contact him for a concert', 'get him to perform',
    ],
    hint: ['concert', 'perform', 'book', 'event', 'show', 'hire', 'stage'],
    answer: `To book Ajinkya for a concert or performance, reach out directly: call or WhatsApp ${PHONE}, or email ${MUSIC_EMAIL}. Share your date, venue, and what you have in mind, and he'll take it from there.`,
    actions: [
      { label: `Call / WhatsApp ${PHONE}`, href: whatsapp },
      { label: 'Email for booking', href: email },
    ],
  },
  {
    id: 'booking-events',
    tags: [
      'wedding', 'private event', 'party', 'function', 'ceremony', 'house concert',
      'baithak', 'play at my wedding', 'play at my event', 'book for a wedding',
      'cultural event', 'festival',
    ],
    hint: ['wedding', 'event', 'party', 'perform', 'book'],
    answer: `Ajinkya performs at weddings, private events, baithaks, and cultural functions. The quickest way to arrange it is WhatsApp/call at ${PHONE} or email ${MUSIC_EMAIL} with your date and details.`,
    actions: [
      { label: `Call / WhatsApp ${PHONE}`, href: whatsapp },
      { label: 'Email Ajinkya', href: email },
    ],
  },
  {
    id: 'collaboration',
    tags: [
      'collaborate', 'collaboration', 'play together', 'jam', 'accompany me',
      'session musician', 'feature on my track', 'record with', 'work together',
      'musical collaboration', 'guest artist',
    ],
    answer: `Ajinkya loves collaborating, accompaniment, studio sessions, cross-genre projects, and more. Reach out on WhatsApp at ${PHONE} or email ${MUSIC_EMAIL} and tell him about your project.`,
    actions: [
      { label: 'Message on WhatsApp', href: whatsapp },
      { label: 'Email Ajinkya', href: email },
    ],
  },
  {
    id: 'contact',
    tags: [
      'contact', 'reach', 'reach you', 'reach him', 'get in touch', 'how do i contact',
      'contact info', 'contact details', 'talk to', 'how to reach', 'get a hold of',
    ],
    answer: `The best ways to reach Ajinkya: WhatsApp or call ${PHONE}, or email ${MUSIC_EMAIL}.`,
    actions: [
      { label: `Call / WhatsApp ${PHONE}`, href: whatsapp },
      { label: 'Email Ajinkya', href: email },
    ],
  },
  {
    id: 'phone',
    tags: [
      'phone', 'number', 'phone number', 'call', 'whatsapp', 'his number',
      'whats his number', 'what is his number', 'text him', 'mobile',
    ],
    answer: `You can reach Ajinkya at ${PHONE}, call or message on WhatsApp anytime.`,
    actions: [{ label: `Call / WhatsApp ${PHONE}`, href: whatsapp }],
  },
  {
    id: 'email',
    tags: [
      'email', 'email address', 'his email', 'whats his email', 'what is his email',
      'mail him', 'e-mail', 'send an email',
    ],
    answer: `For music, classes, and performances, email ${MUSIC_EMAIL}. For business and ventures, use ${BUSINESS_EMAIL}.`,
    actions: [
      { label: 'Email (music & classes)', href: email },
      { label: 'Email (business)', href: businessMail },
    ],
  },
  {
    id: 'business',
    tags: [
      'business', 'business inquiry', 'business inquiries', 'venture', 'ventures',
      'partnership', 'sponsor', 'sponsorship', 'investment', 'brand', 'company',
    ],
    answer: `For business, partnerships, and ventures, email ${BUSINESS_EMAIL}. For anything music or performance related, use ${MUSIC_EMAIL}.`,
    actions: [{ label: 'Email (business)', href: businessMail }],
  },
  {
    id: 'press',
    tags: [
      'press', 'media', 'interview', 'feature', 'journalist', 'podcast', 'article',
      'press inquiry', 'media inquiry', 'write about',
    ],
    answer: `For press, interviews, and media features, reach Ajinkya at ${MUSIC_EMAIL} or on WhatsApp at ${PHONE}.`,
    actions: [
      { label: 'Email Ajinkya', href: email },
      { label: 'Message on WhatsApp', href: whatsapp },
    ],
  },
  {
    id: 'social-media',
    tags: [
      'social media', 'instagram', 'facebook', 'insta', 'follow', 'twitter', 'tiktok',
      'do you have instagram', 'social', 'handle', 'profile',
    ],
    answer: `The best way to stay connected with Ajinkya is the mailing list, plus WhatsApp (${PHONE}) and email, that's where he's most responsive.`,
    actions: [
      { label: 'Join the mailing list', href: mailingList },
      { label: 'Message on WhatsApp', href: whatsapp },
    ],
  },

  /* ================================================== RESONANCE STUDIOS */
  {
    id: 'resonance',
    tags: [
      'resonance', 'resonance studios', 'what is resonance', 'the studio', 'initiative',
      'what is the studio', 'tell me about resonance', 'resonance studio',
    ],
    answer:
      "Resonance Studios is Ajinkya's initiative to grow a deeper, more informed appreciation of the Tabla in the community, through Classes, Workshops, and Concerts. It was born from a trip to India immersed in music, with the goal of creating an inspiring space for learners to truly explore the art form.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'workshops',
    tags: [
      'workshop', 'workshops', 'visiting artist', 'guest artist', 'masterclass',
      'special session', 'guest teacher', 'upcoming workshop',
    ],
    answer:
      "Resonance Studios hosts workshops led by visiting artists, bringing fresh perspectives and lineages to the community. Join the mailing list to hear about upcoming ones first.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'concerts',
    tags: [
      'concerts', 'upcoming shows', 'upcoming concerts', 'events', 'when is the next show',
      'see him live', 'next concert', 'live shows', 'upcoming events', 'performances coming up',
    ],
    hint: ['upcoming', 'next', 'see', 'attend', 'tickets'],
    answer:
      "Resonance Studios curates concerts with a special emphasis on programs where the Tabla is featured. The mailing list is the best way to hear about upcoming performances before anyone else.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'mailing-list',
    tags: [
      'mailing list', 'newsletter', 'updates', 'email list', 'subscribe', 'stay updated',
      'notify', 'join list', 'keep me posted', 'sign up for updates',
      'join the mailing list', 'get on the mailing list', 'sign up for the mailing list',
      'add me to the list',
    ],
    answer:
      "Joining the mailing list is the best way to stay in the loop on class openings, workshops, and concerts, it's also how Ajinkya reaches out to interested students.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'get-involved',
    tags: [
      'get involved', 'volunteer', 'help out', 'support', 'contribute', 'host',
      'host a concert', 'bring to my community', 'partner with', 'donate',
    ],
    answer:
      "Love the enthusiasm! Whether you want to host a concert, help grow the community, or partner with Resonance Studios, Ajinkya would be glad to hear your idea, reach out and let's talk.",
    actions: [
      { label: 'Message on WhatsApp', href: whatsapp },
      { label: 'Email Ajinkya', href: email },
    ],
  },
  {
    id: 'student-portal',
    tags: [
      'student portal', 'portal', 'log in', 'login', 'sign in', 'my account',
      'student login', 'current student', 'already a student', 'enrolled',
      'class portal', 'student site', 'dashboard', 'course materials', 'my classes',
      'my lessons', 'access my',
    ],
    answer:
      "If you're already one of Ajinkya's students, you can head to the Student Portal for your class materials, resources, and updates.",
    actions: [{ label: 'Open the Student Portal', href: studentPortal }],
  },

  /* ======================================================= ABOUT AJINKYA */
  {
    id: 'about',
    tags: [
      'who is', 'who is ajinkya', 'about ajinkya', 'about you', 'tell me about him',
      'tell me about ajinkya', 'bio', 'background', 'who are you', 'ajinkya ranade',
      'about him', 'introduce', 'who is he',
    ],
    answer:
      "Ajinkya Ranade is a versatile musician based in Santa Clara, CA, with 13+ years in music. He began the Tabla at age 6 under Ustad Surinder Mann, and has since learned from Pandit Yogesh Samsi and Shri Yashwant Vaishnav. He's performed across LA, Texas, Canada, Philadelphia, New Jersey, and Mumbai, and is the founder of Resonance Studios.",
    actions: [{ label: 'Read his full story', href: '#about' }],
  },
  {
    id: 'experience',
    tags: [
      'how long has he', 'how long has ajinkya', 'how long have you been',
      'how long has he been', 'been playing', 'been learning', 'been doing',
      'how long playing', 'how long has he been playing', 'years of experience',
      'how many years has', 'when did he start', 'when did he begin', 'how long tabla',
      'his experience', 'experienced', 'how experienced', 'started playing',
      'started learning', 'playing for', 'learning for', 'how old was he',
      'what age did he start',
    ],
    hint: ['he', 'his', 'him', 'ajinkya', 'started', 'experience'],
    answer:
      "Ajinkya has been immersed in music for 13+ years. He began the Tabla at just 6 years old under Ustad Surinder Mann, and has trained ever since, including under Pandit Yogesh Samsi and Shri Yashwant Vaishnav, with a month of intensive gurukul-style study in Mumbai. In short: a lifetime of Tabla, and still going.",
    actions: [{ label: 'Read his full story', href: '#about' }],
  },
  {
    id: 'gurus',
    tags: [
      'guru', 'gurus', 'teacher of ajinkya', 'who taught him', 'who trained him',
      'trained under', 'lineage', 'surinder mann', 'yogesh samsi', 'yashwant vaishnav',
      'who taught', 'mentor', 'his teacher', 'studied under',
    ],
    hint: ['he', 'his', 'him', 'ajinkya', 'taught', 'guru'],
    answer:
      "Ajinkya's Tabla lineage runs deep: he began with Ustad Surinder Mann in Sunnyvale at age 6, and has continued under Pandit Yogesh Samsi, one of the foremost Tabla maestros of his generation, and Shri Yashwant Vaishnav, including a month of intensive gurukul-style study in Mumbai.",
  },
  {
    id: 'his-gharana',
    tags: [
      'his gharana', 'which gharana', 'what gharana', 'ajinkya gharana', 'style of tabla',
      'his style', 'tradition he', 'his tradition', 'punjab gharana',
    ],
    hint: ['he', 'his', 'ajinkya'],
    answer:
      "Through his training under Pandit Yogesh Samsi, a torchbearer of the Punjab gharana, Ajinkya's playing is rooted in that rich lineage, while his broader study gives him a versatile, well-rounded voice on the instrument.",
  },
  {
    id: 'where-from',
    tags: [
      'where is he from', 'where is he based', 'where does he live', 'his hometown',
      'where from', 'based in', 'origin', 'where is ajinkya from', 'located',
    ],
    hint: ['he', 'his', 'ajinkya', 'from', 'based'],
    answer:
      "Ajinkya is based in Santa Clara, California, in the San Francisco Bay Area, where he teaches, performs, and runs Resonance Studios.",
  },
  {
    id: 'education',
    tags: [
      'education', 'college', 'university', 'study', 'student at', 'degree',
      'computer science', 'scu', 'santa clara university', 'school', 'does he study',
      'what does he study', 'go to college', 'does he go to college', 'in college',
    ],
    hint: ['he', 'his', 'ajinkya', 'study', 'college', 'university', 'school'],
    answer:
      "Alongside music, Ajinkya is pursuing a Bachelor's degree in Computer Science at Santa Clara University, balancing the discipline of code with the artistry of the Tabla.",
  },
  {
    id: 'vocals',
    tags: [
      'sing', 'singing', 'vocals', 'voice', 'choir', 'does he sing', 'vocalist',
      'can he sing', 'choral',
    ],
    hint: ['he', 'his', 'ajinkya', 'sing', 'voice'],
    answer:
      "Yes, Ajinkya found vocal music through his high school choir, which took him to Chicago, Hawaii, and NYC to perform. Choir deepened his love of musicals and a wide range of genres, making him more versatile as a musician.",
  },
  {
    id: 'versatility',
    tags: [
      'other instruments', 'what else does he play', 'percussion', 'djembe', 'timpani',
      'cajon', 'congas', 'drums', 'drum kit', 'western', 'versatile', 'besides tabla',
      'other drums', 'xylophone', 'glockenspiel', 'what instruments',
    ],
    hint: ['he', 'his', 'ajinkya', 'play', 'instrument'],
    answer:
      "Beyond the Tabla, Ajinkya plays a wide range of percussion, Djembe, Timpani, Cajón, Congas, Drum Kit, Xylophone, Glockenspiel and more, and is fluent in Western music, both in his thinking and his performance.",
  },
  {
    id: 'performances',
    tags: [
      'where has he performed', 'performed where', 'venues', 'performance history',
      'where played', 'played where', 'cities', 'toured', 'stages', 'where has he played',
    ],
    hint: ['he', 'his', 'ajinkya', 'performed', 'played'],
    answer:
      "Ajinkya has performed across many cities and venues, from LA, Texas, and Canada to Philadelphia, New Jersey, and Mumbai, among others. You can watch some of these moments in the Listen section of the site.",
    actions: [{ label: 'Watch performances', href: '#music' }],
  },
  {
    id: 'music-releases',
    tags: [
      'music', 'song', 'songs', 'spotify', 'apple music', 'listen', 'streaming',
      'released music', 'albums', 'tracks', 'where can i listen', 'his music',
      'hear his music',
    ],
    answer:
      "You can stream Ajinkya's released music on Spotify and Apple Music, and watch performance clips in the Listen section of the site.",
    actions: [
      { label: 'Listen on Spotify', href: config.streaming.spotify },
      { label: 'Listen on Apple Music', href: config.streaming.appleMusic },
    ],
  },
  {
    id: 'zakir-tribute',
    tags: [
      'zakir', 'zakir hussain', 'tribute', 'tribute to zakir', 'ustad zakir',
    ],
    answer:
      "Ajinkya has paid tribute to the legendary Ustad Zakir Hussain in performance, you can find a tribute among the clips in the Listen section of the site.",
    actions: [{ label: 'Watch the tribute', href: '#music' }],
  },

  /* ===================================================== TABLA KNOWLEDGE */
  {
    id: 'what-is-tabla',
    tags: [
      'what is tabla', 'what is the tabla', 'what are tabla', 'tabla meaning',
      'explain tabla', 'about tabla', 'what is a tabla', 'describe tabla',
    ],
    answer:
      "The Tabla is the primary percussion instrument of North Indian (Hindustani) classical music, a pair of hand drums. The smaller wooden drum (the dayan) plays the melodic, higher tones; the larger metal drum (the bayan) gives the deep bass. Together they speak an incredibly rich rhythmic language.",
  },
  {
    id: 'dayan-bayan',
    tags: [
      'dayan', 'bayan', 'dayan and bayan', 'two drums', 'which drum', 'left drum',
      'right drum', 'the pair', 'bass drum', 'treble drum', 'daya', 'baya',
    ],
    answer:
      "A Tabla set is a pair: the dayan (right hand) is the smaller wooden drum that produces the tuned, higher melodic tones, and the bayan (left hand) is the larger metal drum that gives the deep, bending bass. Together they create the Tabla's full voice.",
  },
  {
    id: 'bols',
    tags: [
      'bol', 'bols', 'syllable', 'syllables', 'dha', 'dhin', 'tin', 'tirakita',
      'what are bols', 'tabla language', 'strokes', 'na', 'tabla words',
    ],
    answer:
      "Bols are the spoken syllables of the Tabla, 'words' like dha, dhin, na, tin, and tirakita. Each one names a specific stroke and sound. Tabla is essentially a language: you learn to speak these rhythms before and while you play them.",
  },
  {
    id: 'taal',
    tags: [
      'taal', 'tala', 'rhythmic cycle', 'cycle', 'beats', 'what is taal', 'time cycle',
      'matra', 'rhythm cycle', 'what is a taal',
    ],
    answer:
      "A taal is a rhythmic cycle, the repeating framework of beats a piece lives in. Each taal has a fixed number of beats (matras) and a structure of claps and waves that give it character. The cycle, and its first beat (sam), anchor everything.",
  },
  {
    id: 'common-taals',
    tags: [
      'teental', 'tintal', 'tintaal', 'jhaptaal', 'ektaal', 'rupak', 'dadra', 'keherwa',
      'common taals', 'which taal first', 'popular taal', '16 beats', 'types of taal',
    ],
    answer:
      "Teental (16 beats) is the most common and a great first taal to learn. Others you'll meet include Jhaptaal (10), Ektaal (12), Rupak (7), Dadra (6) and Keherwa (8), each with its own feel and uses.",
  },
  {
    id: 'kaida',
    tags: [
      'kaida', 'qaida', 'what is a kaida', 'theme and variations', 'relo', 'rela',
      'peshkar', 'tukda', 'chakradar', 'composition types', 'what is a tukda',
    ],
    answer:
      "A kaida is a theme-and-variations form, one of the core building blocks of Tabla solo. You start with a fixed phrase, then develop it through structured variations that always return home. It trains your technique, your math, and your creativity all at once.",
  },
  {
    id: 'tihai',
    tags: [
      'tihai', 'what is a tihai', 'three times', 'cadence', 'ending phrase',
      'landing on sam',
    ],
    answer:
      "A tihai is a phrase repeated three times so that its final stroke lands exactly on the sam (the first beat of the cycle). It's a satisfying rhythmic cadence used to resolve a passage, a bit like a musical 'full stop'.",
  },
  {
    id: 'theka',
    tags: [
      'theka', 'what is theka', 'basic pattern', 'time keeping', 'keeping time',
      'accompaniment pattern',
    ],
    answer:
      "The theka is the basic, recognizable pattern of bols that defines a taal and keeps time, the foundation a Tabla player returns to when accompanying. Learn the theka and you can hold the cycle for any musician.",
  },
  {
    id: 'gharana',
    tags: [
      'what is a gharana', 'gharana meaning', 'gharanas', 'schools of tabla',
      'styles of tabla', 'tabla traditions', 'what are gharanas', 'delhi gharana',
      'punjab gharana', 'ajrada',
    ],
    answer:
      "A gharana is a stylistic lineage or 'school' of Tabla, each with its own technique, repertoire, and aesthetic, the six main ones are Delhi, Ajrada, Lucknow, Farukhabad, Benares, and Punjab. They're passed down guru to student across generations.",
  },
  {
    id: 'history',
    tags: [
      'history of tabla', 'origin of tabla', 'where did tabla come from', 'tabla history',
      'who invented tabla', 'how old is the tabla', 'where does tabla come from',
    ],
    answer:
      "The Tabla as we know it took shape in North India a few centuries ago, growing out of the region's older drumming traditions. It became the leading percussion instrument of Hindustani classical music and has since traveled the world.",
  },
  {
    id: 'famous-players',
    tags: [
      'famous tabla players', 'best tabla player', 'legends', 'greatest tabla',
      'who is the best', 'famous players', 'tabla maestro', 'alla rakha',
    ],
    answer:
      "The Tabla's modern icons include Ustad Zakir Hussain and his father Ustad Alla Rakha, among many greats, and Ajinkya's own guru, Pandit Yogesh Samsi, is one of the foremost maestros of his generation.",
  },
  {
    id: 'how-made',
    tags: [
      'how is tabla made', 'what is tabla made of', 'materials', 'syahi', 'the black dot',
      'black circle', 'skin', 'gab', 'what is the black spot', 'how its made',
    ],
    answer:
      "The dayan is carved from wood and the bayan is usually metal, each topped with a goat-skin head. The dark circle you see, the syahi, is a tuning paste that shapes the drum's distinctive, pitched tone. It's a remarkably crafted instrument.",
  },
  {
    id: 'tuning',
    tags: [
      'tune', 'tuning', 'how to tune', 'hammer', 'pitch', 'maintenance', 'take care',
      'care for tabla', 'how do you tune', 'tune the tabla',
    ],
    answer:
      "The Tabla is tuned with a small hammer, tapping the blocks and the rim to raise or lower the pitch of the dayan to a chosen note. It takes a feel that develops with time, tuning is one of the first practical skills Ajinkya helps students get comfortable with.",
  },
  {
    id: 'practice',
    tags: [
      'practice', 'practice tips', 'improve', 'riyaz', 'riyaaz', 'get better',
      'how to practice', 'how do i get better', 'practice advice',
    ],
    answer:
      "The secret is riyaz, regular, focused practice. Even 20-30 minutes a day, done consistently, beats long occasional sessions. Slow and clean first, speed later. In classes, Ajinkya helps you build a practice routine that actually sticks.",
  },
  {
    id: 'buy-tabla',
    tags: [
      'buy', 'buy a tabla', 'purchase', 'what tabla', 'which tabla', 'equipment',
      'where to buy', 'get a tabla', 'own tabla', 'recommend a tabla', 'good tabla',
      'cost of a tabla', 'how much is a tabla',
    ],
    answer:
      "There's a real range in Tabla quality, so it's worth getting guidance before buying, a bad set can hold you back. Ajinkya points new students toward good options so you don't waste money, and you don't need your own to start the conversation.",
    actions: [{ label: 'Ask what to buy', href: whatsapp }],
  },
  {
    id: 'how-long-to-learn',
    tags: [
      'how long to learn', 'how long does it take', 'how long until', 'how long before',
      'time to learn', 'learn quickly', 'learn fast', 'how fast can i learn',
      'how long to get good', 'how many years to learn', 'master it',
      'become proficient', 'get good at tabla', 'pick it up',
    ],
    hint: ['learn', 'take', 'me', 'beginner', 'master', 'proficient', 'start'],
    answer:
      "Honestly, Tabla is a lifelong art, even maestros say they're still learning. But you don't have to wait years to enjoy it: with steady weekly practice, beginners often play their first simple compositions within a couple of months. Consistency matters far more than talent.",
    actions: [{ label: 'Start your journey', href: whatsapp }],
  },
  {
    id: 'is-it-hard',
    tags: [
      'is tabla hard', 'is it difficult', 'how hard', 'is it easy', 'difficulty',
      'is tabla difficult to learn', 'hard to learn', 'tough to learn',
    ],
    answer:
      "The Tabla is deep, but it's absolutely learnable, especially with good guidance. Early wins come quickly, and the beauty is there's always another layer to explore. With steady practice and the right teacher, anyone genuinely interested can play.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },
  {
    id: 'posture',
    tags: [
      'how to sit', 'posture', 'how to play', 'hand position', 'how do you play',
      'sitting position', 'how to hold', 'technique basics', 'where to hit',
      'sit', 'sitting', 'sit to play', 'how do you sit', 'how is it played',
    ],
    answer:
      "Tabla is played seated on the floor with the drums angled toward you, the dayan by your right hand, the bayan by your left. Good posture and relaxed hands are the foundation of clean sound, and they're among the first things Ajinkya sets right for new students.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },
  {
    id: 'solo-vs-accompaniment',
    tags: [
      'solo', 'accompaniment', 'accompany', 'solo vs accompaniment', 'sangat',
      'play with others', 'accompany a singer', 'what is solo tabla', 'difference solo',
    ],
    answer:
      "Tabla lives in two worlds: solo playing, where the drums take center stage with forms like kaidas and tukdas, and accompaniment (sangat), where the Tabla supports vocalists, instrumentalists, or dancers. Ajinkya's classes develop both.",
    actions: [{ label: 'Ask about joining', href: whatsapp }],
  },
  {
    id: 'laya',
    tags: [
      'laya', 'tempo', 'speed', 'vilambit', 'madhya', 'drut', 'slow medium fast',
      'what is laya', 'rhythm speed',
    ],
    answer:
      "Laya is tempo, the speed of the rhythm. It's traditionally grouped into vilambit (slow), madhya (medium), and drut (fast). A big part of Tabla training is holding steady laya and moving cleanly between speeds.",
  },
  {
    id: 'sam-matra',
    tags: [
      'sam', 'what is sam', 'first beat', 'matra', 'what is a matra', 'downbeat',
      'the one', 'beat one',
    ],
    answer:
      "A matra is a single beat of the cycle, and the sam is the all-important first beat, the point of resolution that phrases land on. Musicians feel the sam together; it's the heartbeat of the whole performance.",
  },
  {
    id: 'tabla-vs-drums',
    tags: [
      'tabla vs drums', 'difference between tabla and drums', 'tabla or drum set',
      'how is tabla different', 'tabla vs drum kit', 'compared to drums',
      'tabla versus',
    ],
    answer:
      "Unlike a Western drum kit, the Tabla is tuned to a specific pitch and 'speaks' in syllables (bols), producing melodic, bending tones with the fingers and palms rather than sticks. It's as much a melodic-rhythmic language as a percussion instrument.",
  },
  {
    id: 'notation',
    tags: [
      'notation', 'how is tabla written', 'written down', 'sheet music', 'read tabla',
      'tabla notation', 'write bols', 'how do you notate',
    ],
    answer:
      "Tabla is traditionally learned and written through its bols, the spoken syllables, often laid out across the beats of a taal. Systems like Bhatkhande notation capture this on paper, but the oral tradition of reciting bols remains at the heart of learning.",
  },

  /* ================================================ CONVERSATIONAL NICETIES */
  {
    id: 'greeting',
    tags: [
      'hi', 'hello', 'hey', 'namaste', 'yo', 'hiya', 'good morning', 'good evening',
      'whats up', 'greetings', 'hey there',
    ],
    answer:
      "Namaste! Happy to help. You can ask me about learning the Tabla, joining classes, booking Ajinkya for a concert, his background, or how to get in touch.",
  },
  {
    id: 'thanks',
    tags: ['thank', 'thanks', 'thank you', 'appreciate', 'awesome', 'cool', 'perfect', 'great help'],
    answer:
      "Anytime! If you're thinking about learning or booking a performance, Ajinkya is always happy to hear from you directly, and the mailing list is a great way to stay connected.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'who-are-you',
    tags: ['who are you', 'what are you', 'your name', 'are you a bot', 'are you ai', 'are you real', 'do you have a name', 'who is this'],
    answer:
      "I'm Ajinkya's assistant, a friendly guide that runs right here in your browser to answer questions about Ajinkya, the Tabla, joining classes, and booking a performance. Ask me anything!",
  },
  {
    id: 'what-can-you-do',
    tags: ['what can you do', 'what do you do', 'how can you help', 'what can i ask', 'help me', 'what should i ask', 'how does this work', 'what do you know', 'what are you for'],
    answer:
      "I can tell you about Ajinkya, help you join Tabla classes or book a concert, and answer questions about the Tabla itself, its bols, taals, compositions, gharanas and more. Try asking, or reach Ajinkya directly anytime.",
    actions: [{ label: 'Join the mailing list', href: mailingList }],
  },
  {
    id: 'how-are-you',
    tags: ['how are you', 'hows it going', 'how are things', 'how do you do', 'you good', 'how is it going'],
    answer:
      "I'm doing great, thanks for asking, always happy to talk Tabla! What would you like to know about Ajinkya, classes, or the instrument?",
  },
  {
    id: 'bye',
    tags: ['bye', 'goodbye', 'see you', 'later', 'thats all', 'nothing else', 'take care'],
    answer: `Take care, and thanks for stopping by! Whenever you're ready, Ajinkya is reachable at ${PHONE} or ${MUSIC_EMAIL}.`,
    actions: [{ label: 'Message on WhatsApp', href: whatsapp }],
  },

  /* Bulk tabla FAQ pack (300+ Q&A), shared with the music-school assistant. */
  ...EXTRA_FAQS.map(([t, a], i) => ({ id: `xfaq-${i}`, tags: t.split('|'), answer: a })),
]

/* =============================================================================
   THE MATCHER  ·  pure, in-browser, zero-cost.
   Scores each entry against the visitor's text by keyword/phrase overlap (with
   light stemming + disambiguation hints) and returns the best answer, or the
   fallback if nothing is confident enough.
   ========================================================================== */

const STOP = new Set([
  'the', 'a', 'an', 'is', 'are', 'do', 'does', 'did', 'i', 'to', 'of', 'for',
  'in', 'on', 'and', 'or', 'can', 'could', 'would', 'how', 'what', 'where',
  'when', 'with', 'about', 'please', 'tell', 'it', 'be', 'at', 'as', 'that',
  'this', 'there', 'here', 'get', 'got', 'any', 'some', 'will', 'was',
])

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Light stemmer so "learning", "plays", "years", "classes" all match their
// base word. Deliberately crude, good enough for keyword matching, no deps.
const stemWord = (w) =>
  w.length <= 3
    ? w
    : w
        .replace(/ing$/, '')
        .replace(/ed$/, '')
        .replace(/ies$/, 'y')
        .replace(/es$/, '')
        .replace(/s$/, '')

const stemText = (s) => normalize(s).split(' ').map(stemWord).join(' ')

// Common, correctly-spelled English words that must NEVER be "corrected" into a
// tabla term (e.g. "there"->"dhere"). The fuzzy corrector only fires on words
// outside STOP ∪ COMMON ∪ VOCAB.
const COMMON = new Set([
  'forms', 'form', 'want', 'need', 'know', 'learn', 'play', 'good', 'best',
  'time', 'long', 'hard', 'easy', 'start', 'help', 'make', 'take', 'year',
  'show', 'cost', 'price', 'free', 'name', 'read', 'list', 'type', 'part',
  'more', 'most', 'very', 'much', 'many', 'well', 'like', 'their', 'they',
  'then', 'than', 'have', 'who', 'why', 'our', 'all', 'one', 'two', 'your',
  'kind', 'thing', 'different', 'people', 'online', 'near', 'first', 'last',
  'book', 'music', 'song', 'sound', 'class', 'lesson', 'teacher', 'student',
])

// Every meaningful single word across all tags, stemmed (for typo correction).
const VOCAB = (() => {
  const v = new Set()
  for (const entry of knowledge) {
    for (const tag of entry.tags) {
      for (const w of stemText(tag).split(' ')) {
        if (w.length >= 3 && !STOP.has(w)) v.add(w)
      }
    }
  }
  return v
})()

function levenshtein(a, b) {
  const m = a.length, n = b.length
  if (Math.abs(m - n) > 2) return 3
  const row = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = 1; i <= m; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return row[n]
}

function fuzzyCorrect(word) {
  if (word.length < 4 || VOCAB.has(word) || STOP.has(word) || COMMON.has(word)) return word
  const maxDist = word.length >= 7 ? 2 : 1
  let best = word, bestD = maxDist + 1
  for (const v of VOCAB) {
    if (Math.abs(v.length - word.length) > maxDist) continue
    const d = levenshtein(word, v)
    if (d < bestD) { bestD = d; best = v; if (d === 1) break }
  }
  return bestD <= maxDist ? best : word
}

const correctText = (s) => s.split(' ').map(fuzzyCorrect).join(' ')

export function findAnswer(rawInput) {
  if (!normalize(rawInput)) return fallback

  const stext = correctText(stemText(rawInput)) // stemmed + typo-corrected
  const words = new Set(stext.split(' ').filter((w) => w && !STOP.has(w)))

  let best = null
  let bestScore = 0

  for (const entry of knowledge) {
    let score = 0

    for (const tag of entry.tags) {
      const t = stemText(tag)
      if (!t) continue
      if (t.includes(' ')) {
        // multi-word phrase → strong, length-weighted signal when it appears
        if (stext.includes(t)) score += 4 + t.split(' ').length
      } else if (words.has(t)) {
        score += 2.5
      } else if (t.length > 4 && stext.includes(t)) {
        score += 1
      }
    }

    // hints are soft context words that disambiguate similar intents
    // (e.g. "he/his" → his experience vs "me/learn" → how long to learn)
    if (entry.hint) {
      for (const h of entry.hint) {
        if (words.has(stemWord(h))) score += 1.5
      }
    }

    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  return bestScore >= 2.5 ? best : fallback
}
