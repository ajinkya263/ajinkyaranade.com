import { useEffect, useRef } from 'react'

/* Decorative dot + trailing ring. Purely cosmetic; never blocks clicks.
   Native cursor is only hidden once this mounts, so no-JS keeps a cursor. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    document.body.classList.add('cursor-custom')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const INTERACTIVE = 'a, button, .pill, .gphoto, .video-card'
    const grow = () => ring.current && (ring.current.style.scale = '1.8')
    const shrink = () => ring.current && (ring.current.style.scale = '1')

    // Delegated hover detection — survives late-mounted elements, no leaks.
    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) grow()
    }
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE)) shrink()
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
      document.body.classList.remove('cursor-custom')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden style={{ transition: 'scale .3s ease' }} />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  )
}
