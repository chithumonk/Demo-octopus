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

  // Combine the reveal ref and our own ref onto the same <section>.
  const setSectionRef = (el) => {
    sectionRef.current = el
    revealRef.current = el
  }

  const onFrame = useStableCallback(({ mx, my }) => {
    const el = sectionRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top // +ve below viewport, -ve above

    // Octopus drifts vertically on scroll and tilts in 3D toward the pointer.
    if (octoRef.current) {
      octoRef.current.style.transform =
        `perspective(900px) translate3d(${mx * 26}px, ${top * 0.08 - my * 18}px, 0) ` +
        `rotateX(${-my * 9}deg) rotateY(${mx * 14}deg)`
    }
    // Two glow layers move at different speeds = depth behind the scene.
    if (glowFarRef.current) glowFarRef.current.style.transform = `translateY(${top * 0.16}px)`
    if (glowNearRef.current) glowNearRef.current.style.transform = `translateY(${top * -0.12}px)`
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
