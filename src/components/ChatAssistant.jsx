import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { findAnswer, greeting, suggestions, fallback } from '../data/knowledge'
import { probeLocalAI, localAIReady, askLocalAI } from '../lib/localAI'
import {
  sttSupported,
  ttsSupported,
  createRecognizer,
  speak,
  cancelSpeech,
  warmUpSpeech,
} from '../lib/voice'
import { ArrowUpRight } from './icons'

/* A little tabla glyph for the launcher. */
const Tabla = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <ellipse cx="8" cy="7" rx="4" ry="1.6" />
    <path d="M4 7v6c0 .9 1.8 1.6 4 1.6s4-.7 4-1.6V7" strokeLinecap="round" />
    <circle cx="8" cy="7" r="1.1" fill="currentColor" stroke="none" />
    <ellipse cx="17" cy="9" rx="3.2" ry="1.3" />
    <path d="M13.8 9v4.5c0 .8 1.4 1.4 3.2 1.4s3.2-.6 3.2-1.4V9" strokeLinecap="round" />
  </svg>
)

const Close = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
)

const Send = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M5 12h13M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Mic = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
  </svg>
)

const StopIco = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
  </svg>
)

const SpeakerOn = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12" strokeLinecap="round" />
  </svg>
)

const SpeakerOff = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" strokeLinejoin="round" />
    <path d="M16 9l5 5M21 9l-5 5" strokeLinecap="round" />
  </svg>
)

let idSeq = 0
const nextId = () => ++idSeq

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: nextId(), from: 'bot', text: greeting },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceOn, setVoiceOn] = useState(false)
  const [voiceErr, setVoiceErr] = useState('')
  const [sttOk, setSttOk] = useState(false)
  const [ttsOk, setTtsOk] = useState(false)

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const recognizerRef = useRef(null)
  const lastSpokenRef = useRef(0)

  // Feature-detect voice + probe for an on-device model, all once, locally.
  useEffect(() => {
    setSttOk(sttSupported())
    setTtsOk(ttsSupported())
    probeLocalAI()
  }, [])

  // Speak the newest bot message aloud when voice output is on.
  useEffect(() => {
    if (!voiceOn) return
    const last = messages[messages.length - 1]
    if (last && last.from === 'bot' && last.id > lastSpokenRef.current) {
      lastSpokenRef.current = last.id
      speak(last.text)
    }
  }, [messages, voiceOn])

  // Stop speech / listening when the panel closes.
  useEffect(() => {
    if (!open) {
      cancelSpeech()
      recognizerRef.current?.stop()
    }
  }, [open])

  // keep the transcript pinned to the latest message
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking, open])

  // focus the field when the panel opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 240)
      return () => clearTimeout(t)
    }
  }, [open])

  // Escape to close
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ask = useCallback((raw) => {
    const text = raw.trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { id: nextId(), from: 'user', text }])
    setThinking(true)

    const res = findAnswer(text)
    const pushBot = (r, extra = {}) =>
      setMessages((m) => [
        ...m,
        { id: nextId(), from: 'bot', text: r.answer, actions: r.actions, ...extra },
      ])

    // When the keyword engine has no confident answer AND an on-device model is
    // ready, escalate to it (local, zero tokens). Otherwise the keyword answer
    // stands after a tiny "typing" delay.
    if (res === fallback && localAIReady()) {
      askLocalAI(text)
        .then((aiText) => {
          setThinking(false)
          if (aiText) {
            setMessages((m) => [
              ...m,
              { id: nextId(), from: 'bot', text: aiText, viaAI: true },
            ])
          } else {
            pushBot(res)
          }
        })
        .catch(() => {
          setThinking(false)
          pushBot(res)
        })
      return
    }

    window.setTimeout(() => {
      setThinking(false)
      pushBot(res)
    }, 420)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    ask(input)
  }

  // Voice input: open the mic on an explicit click; the browser transcribes
  // locally. Falls back to typing on any error or unsupported browser.
  const toggleListening = useCallback(() => {
    setVoiceErr('')
    if (!recognizerRef.current) {
      recognizerRef.current = createRecognizer({
        onText: (t) => ask(t),
        onState: (on) => setListening(on),
        onError: (kind) => {
          setListening(false)
          setVoiceErr(
            kind === 'denied'
              ? 'Microphone blocked, you can still type.'
              : kind === 'no-speech'
                ? "Didn't catch that, try again."
                : "Voice input isn't available here, type instead."
          )
        },
      })
    }
    const rec = recognizerRef.current
    if (!rec) {
      setSttOk(false)
      return
    }
    if (listening) rec.stop()
    else {
      cancelSpeech()
      rec.start()
    }
  }, [listening, ask])

  // Voice output: read the assistant's answers aloud.
  const toggleVoice = useCallback(() => {
    setVoiceOn((v) => {
      const next = !v
      if (next) {
        warmUpSpeech()
        lastSpokenRef.current = messages[messages.length - 1]?.id || 0
      } else {
        cancelSpeech()
      }
      return next
    })
  }, [messages])

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        className="chat-fab"
        aria-label={open ? 'Close the Resonance assistant' : 'Open the Resonance assistant'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="chat-fab-pulse" aria-hidden />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              className="chat-fab-ico"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Close width="22" height="22" />
            </motion.span>
          ) : (
            <motion.span
              key="t"
              className="chat-fab-ico"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Tabla width="24" height="24" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            className="chat-panel"
            role="dialog"
            aria-label="Resonance assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <header className="chat-head">
              <span className="chat-head-badge">
                <Tabla width="20" height="20" />
              </span>
              <span className="chat-head-text">
                <strong>Resonance Assistant</strong>
                <em>Ask about Tabla &amp; classes</em>
              </span>
              {ttsOk && (
                <button
                  type="button"
                  className="chat-head-close"
                  aria-label={voiceOn ? 'Turn off spoken answers' : 'Read answers aloud'}
                  title={voiceOn ? 'Voice answers: on' : 'Voice answers: off'}
                  onClick={toggleVoice}
                  style={voiceOn ? { color: 'var(--accent)' } : undefined}
                >
                  {voiceOn ? <SpeakerOn width="18" height="18" /> : <SpeakerOff width="18" height="18" />}
                </button>
              )}
              <button
                type="button"
                className="chat-head-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <Close width="18" height="18" />
              </button>
            </header>

            <div className="chat-scroll" ref={scrollRef}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  className={`chat-row ${m.from}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="chat-bubble">
                    {m.text}
                    {m.viaAI && (
                      <span style={{ display: 'block', marginTop: 6, fontSize: '.68rem', fontStyle: 'italic', opacity: 0.6 }}>
                        Answered on your device
                      </span>
                    )}
                    {m.actions?.length > 0 && (
                      <div className="chat-actions">
                        {m.actions.map((a) => {
                          const internal =
                            a.href.startsWith('#') || a.href.startsWith('mailto:')
                          return (
                            <a
                              key={a.label}
                              className="chat-action"
                              href={a.href}
                              target={internal ? undefined : '_blank'}
                              rel={internal ? undefined : 'noopener noreferrer'}
                              onClick={() => {
                                // in-page jump: close the panel so the section is visible
                                if (a.href.startsWith('#')) setOpen(false)
                              }}
                            >
                              {a.label}
                              <ArrowUpRight width="14" height="14" />
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <div className="chat-row bot">
                  <div className="chat-bubble chat-typing" aria-label="Assistant is typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {messages.length <= 1 && !thinking && (
                <div className="chat-chips">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="chat-chip"
                      onClick={() => ask(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form className="chat-input" onSubmit={onSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Type your question"
                autoComplete="off"
              />
              {sttOk && (
                <button
                  type="button"
                  aria-label={listening ? 'Stop listening' : 'Speak your question'}
                  onClick={toggleListening}
                  style={{
                    background: listening ? 'var(--accent)' : 'transparent',
                    color: listening ? '#0a0a0a' : 'var(--accent)',
                    border: '1px solid var(--accent)',
                  }}
                >
                  {listening ? <StopIco width="16" height="16" /> : <Mic width="18" height="18" />}
                </button>
              )}
              <button type="submit" aria-label="Send" disabled={!input.trim()}>
                <Send width="18" height="18" />
              </button>
            </form>

            <p className="chat-foot">
              {voiceErr
                ? voiceErr
                : listening
                  ? 'Listening… speak now'
                  : sttOk || ttsOk
                    ? 'Voice & text · no account needed'
                    : 'Instant answers · no account needed'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
