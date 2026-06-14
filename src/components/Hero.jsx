import { useRef } from 'react'
import Octopus from './Octopus.jsx'
import { useParallax, useStableCallback } from '../hooks/useScrollProgress.js'

// Innovative parallax hero: every layer reacts to scroll AND the pointer,
// at a different depth. The octopus tilts in 3D toward the cursor while the
// foreground bubbles rush past faster than the distant light rays.
export default function Hero() {
  const rays = useRef(null)
  const mid = useRef(null)
  const octo = useRef(null)
  const content = useRef(null)
  const fore = useRef(null)

  const onFrame = useStableCallback(({ scrollY, mx, my }) => {
    const set = (el, t, extra = '') => {
      if (el) el.style.transform = t + extra
    }
    // Deeper layers move less; closer layers move more (scroll + mouse).
    set(rays.current, `translate3d(${mx * 16}px, ${scrollY * 0.2 + my * 12}px, 0)`)
    set(mid.current, `translate3d(${mx * 38}px, ${scrollY * 0.38 + my * 26}px, 0)`)
    set(fore.current, `translate3d(${mx * 70}px, ${scrollY * 0.72 + my * 44}px, 0)`)

    // Octopus: clear 3D tilt toward the cursor + downward drift on scroll.
    set(
      octo.current,
      `translate3d(${mx * 48}px, ${scrollY * 0.34 - my * 22}px, 0) ` +
        `rotateX(${-my * 12}deg) rotateY(${mx * 16}deg)`,
    )

    // Content lifts and fades out as you scroll past the fold.
    if (content.current) {
      content.current.style.transform = `translate3d(${mx * -10}px, ${scrollY * -0.12}px, 0)`
      content.current.style.opacity = String(Math.max(1 - scrollY / 600, 0))
    }
  })

  useParallax(onFrame)

  return (
    <section className="hero" id="top">
      <div className="hero__layer hero__rays" ref={rays} />

      <div className="hero__layer hero__mid" ref={mid} aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span className="hero__orb" key={i} style={{ '--i': i }} />
        ))}
      </div>

      <div className="hero__octostage">
        <div className="hero__octopus" ref={octo}>
          <Octopus className="hero__octopus-svg" armProgress={1} />
        </div>
      </div>

      <div className="hero__content" ref={content}>
        <p className="hero__eyebrow">Deep-tech, eight arms strong</p>
        <h1 className="hero__title">
          We reach <span className="grad">everywhere</span> at once.
        </h1>
        <p className="hero__sub">
          Octovate is a startup built like an octopus — eight founders, eight
          disciplines, one curious mind moving as a single organism through the
          deep waters of what’s next.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#founders">Meet the 8 founders</a>
          <a className="btn btn--ghost" href="#about">Our story</a>
        </div>
      </div>

      <div className="hero__layer hero__fore" ref={fore} aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span className="hero__bubble" key={i} style={{ '--i': i }} />
        ))}
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll down">
        <span />
      </a>
    </section>
  )
}
