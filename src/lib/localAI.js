/* =============================================================================
   ON-DEVICE AI  ·  Chrome Prompt API (Gemini Nano) — 100% local, 0 tokens
   -----------------------------------------------------------------------------
   Progressive enhancement for the Resonance assistant. When a visitor's browser
   ships an on-device language model, we use it to answer open-ended questions
   the keyword engine can't — grounded in Ajinkya's details. It runs ENTIRELY on
   the visitor's machine: no network, no API key, no tokens, no cost.

   If the API is absent (most browsers today), everything here no-ops and the
   assistant falls back to the local keyword engine. We only USE the model when
   it is already downloaded ("available"), so there is never a surprise download.
   ========================================================================== */

import { ASSISTANT_SYSTEM_PROMPT } from '../data/knowledge'

let availability = 'unknown'
let sessionPromise = null

function getAPI() {
  if (typeof window === 'undefined') return null
  return window.LanguageModel || window.ai?.languageModel || window.ai || null
}

export async function probeLocalAI() {
  const api = getAPI()
  if (!api) {
    availability = 'unsupported'
    return availability
  }
  try {
    if (typeof api.availability === 'function') {
      availability = await api.availability()
    } else if (typeof api.capabilities === 'function') {
      const caps = await api.capabilities()
      availability = caps?.available || 'unavailable'
    } else {
      availability = 'unsupported'
    }
  } catch {
    availability = 'unsupported'
  }
  return availability
}

export function localAIReady() {
  return availability === 'available' || availability === 'readily'
}

async function createSession(api) {
  try {
    return await api.create({
      initialPrompts: [{ role: 'system', content: ASSISTANT_SYSTEM_PROMPT }],
    })
  } catch {
    return await api.create({ systemPrompt: ASSISTANT_SYSTEM_PROMPT })
  }
}

function getSession() {
  const api = getAPI()
  if (!api) return Promise.resolve(null)
  if (!sessionPromise) {
    sessionPromise = createSession(api).catch((e) => {
      sessionPromise = null
      throw e
    })
  }
  return sessionPromise
}

export async function askLocalAI(question) {
  if (!localAIReady()) return null
  try {
    const session = await getSession()
    if (!session) return null
    const text = await session.prompt(question)
    const out = (text || '').trim()
    return out || null
  } catch {
    return null
  }
}
