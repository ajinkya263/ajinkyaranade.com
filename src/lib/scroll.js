// Small bridge so nav links can drive the Lenis instance created in App.
let lenisInstance = null

export function setLenis(l) {
  lenisInstance = l
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { duration: 1.25, offset: -10 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
