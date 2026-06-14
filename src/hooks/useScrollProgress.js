import { useCallback, useEffect, useRef, useState } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * A single rAF loop that tracks scroll position and a *smoothed* pointer
 * position, then hands them to `onFrame` so the caller can mutate the DOM
 * directly. This keeps parallax buttery and — crucially — never triggers a
 * React re-render, which is what made the old state-driven version stutter.
 *
 * `onFrame({ scrollY, mx, my })` where mx/my are eased pointer offsets in
 * the range roughly [-1, 1] from the viewport centre.
 */
export function useParallax(onFrame) {
  useEffect(() => {
    if (prefersReduced()) {
      onFrame({ scrollY: window.scrollY, mx: 0, my: 0 })
      return
    }

    const s = { scrollY: window.scrollY, mx: 0, my: 0, tmx: 0, tmy: 0 }
    let raf

    const loop = () => {
      // Ease the pointer toward its target for a fluid, weighty feel.
      s.mx += (s.tmx - s.mx) * 0.07
      s.my += (s.tmy - s.my) * 0.07
      onFrame(s)
      raf = requestAnimationFrame(loop)
    }

    const onScroll = () => { s.scrollY = window.scrollY }
    const onMove = (e) => {
      s.tmx = (e.clientX / window.innerWidth - 0.5) * 2
      s.tmy = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onLeave = () => { s.tmx = 0; s.tmy = 0 }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [onFrame])
}

/**
 * Reveals an element once it scrolls into view. Returns a ref to attach and a
 * boolean that flips to true the first time the element is visible.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2, ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

/** Small helper so components can keep a stable per-frame callback. */
export function useStableCallback(fn) {
  const ref = useRef(fn)
  ref.current = fn
  return useCallback((...args) => ref.current(...args), [])
}
