import { useRef } from 'react'
import Octopus from './Octopus.jsx'
import { founders } from '../data/founders.js'
import { useReveal, useParallax, useStableCallback } from '../hooks/useScrollProgress.js'

// Direction each card sits relative to the octopus in the centre of the 3x3
// grid. Order matches the data file, filling the grid around the centre cell:
//   0 1 2
//   3 🐙 4
//   5 6 7
const dirs = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1], [0, 1], [1, 1],
]

// The centerpiece: the octopus surrounded by its eight founders.
// • Reveal: an IntersectionObserver fades/slides the cards in once and uncurls
//   the arms — so the founders always end up fully visible (no clipping).
// • Parallax: a rAF loop drifts the octopus and the glow layers as you scroll,
//   and tilts the octopus in 3D toward the cursor.
export default function Founders() {
  const [revealRef, visible] = useReveal({ threshold: 0.2 })
  const sectionRef = useRef(null)
  const octoRef = useRef(null)
  const glowFarRef = useRef(null)
  const glowNearRef = useRef(null)
  const cardRefs = useRef([])

  // Combine the reveal ref and our own ref onto the same <section>.
  const setSectionRef = (el) => {
    sectionRef.current = el
    revealRef.current = el
  }

  const onFrame = useStableCallback(({ mx, my }) => {
    const el = sectionRef.current
    if (!el) return
    // How far the section's centre is from the viewport centre, normalised.
    const rect = el.getBoundingClientRect()
    const dist = (rect.top + rect.height / 2 - window.innerHeight / 2)

    // Octopus drifts vertically on scroll and tilts in 3D toward the pointer.
    if (octoRef.current) {
      octoRef.current.style.transform =
        `perspective(900px) translate3d(${mx * 26}px, ${dist * 0.06 - my * 18}px, 0) ` +
        `rotateX(${-my * 9}deg) rotateY(${mx * 14}deg)`
    }
    // Glow layers move at different speeds = depth behind the scene.
    if (glowFarRef.current) glowFarRef.current.style.transform = `translateY(${dist * 0.12}px)`
    if (glowNearRef.current) glowNearRef.current.style.transform = `translateY(${dist * -0.16}px)`

    // Each founder card drifts based on its position around the octopus:
    // the ring expands/contracts as you scroll past = clear parallax.
    const p = dist / window.innerHeight // ~ -1 .. 1 across the section
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const dx = dirs[i][0]
      const dy = dirs[i][1]
      const ox = dx * p * 70 + mx * dx * 10
      const oy = dy * p * 90 + my * dy * 8
      card.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0)`
    })
  })

  useParallax(onFrame)

  return (
    <section
      className={`founders ${visible ? 'is-visible' : ''}`}
      id="founders"
      ref={setSectionRef}
    >
      {/* parallax glow layers */}
      <span className="founders__glow founders__glow--far" ref={glowFarRef} aria-hidden="true" />
      <span className="founders__glow founders__glow--near" ref={glowNearRef} aria-hidden="true" />

      <div className="founders__inner">
        <div className="founders__head">
          <p className="section__eyebrow">Eight arms, one vision</p>
          <h2 className="section__title">Meet the founders</h2>
          <p className="founders__hint">One founder for every arm of the octopus 🐙</p>
        </div>

        <div className="founders__grid">
          {founders.map((f, i) => (
            <article
              key={f.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className="founder"
              style={{
                '--accent': f.color,
                '--dx': dirs[i][0],
                '--dy': dirs[i][1],
                '--i': i,
                gridColumn: dirs[i][0] + 2,
                gridRow: dirs[i][1] + 2,
              }}
            >
              <div className="founder__avatar" aria-hidden="true">
                {f.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="founder__info">
                <span className="founder__arm">Arm {i + 1} · {f.arm}</span>
                <h3>{f.name}</h3>
                <p className="founder__role">{f.role}</p>
                <p className="founder__bio">{f.bio}</p>
              </div>
            </article>
          ))}

          <div className="founders__octopus" ref={octoRef}>
            <div style={{ '--arm': visible ? 1 : 0 }}>
              <Octopus useVar className="founders__octopus-svg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
