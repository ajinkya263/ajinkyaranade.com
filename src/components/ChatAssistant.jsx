import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { findAnswer, greeting, suggestions } from '../data/knowledge'
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

let idSeq = 0
const nextId = () => ++idSeq

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: nextId(), from: 'bot', text: greeting },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

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

    // tiny, local "typing" delay so it feels considered (no network, no tokens)
    window.setTimeout(() => {
      const res = findAnswer(text)
      setThinking(false)
      setMessages((m) => [
        ...m,
        { id: nextId(), from: 'bot', text: res.answer, actions: res.actions },
      ])
    }, 420)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    ask(input)
  }

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
              <button type="submit" aria-label="Send" disabled={!input.trim()}>
                <Send width="18" height="18" />
              </button>
            </form>

            <p className="chat-foot">
              Instant answers · no account needed
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
