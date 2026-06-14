import { useRef } from 'react'
import Octopus from './Octopus.jsx'
import { stages } from '../data/lifecycle.js'
import { useParallax, useStableCallback } from '../hooks/useScrollProgress.js'

const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b)

// Sticky scene: as you scroll through the section the octopus grows from a
// tiny egg-sized hatchling to a full adult, the arms uncurl, and the active
// life stage (caption + stepper) updates. All driven by direct DOM writes.
export default function Lifecycle() {
  const sectionRef = useRef(null)
  const octoRef = useRef(null)
  const eggRef = useRef(null)
  const fillRef = useRef(null)
  const captionRefs = useRef([])
  const dotRefs = useRef([])
  const activeRef = useRef(-1)

  const onFrame = useStableCallback(({ mx, my }) => {
    const el = sectionRef.current
    if (!el) return
    const scrollable = el.offsetHeight - window.innerHeight
    const progress = scrollable > 0 ? clamp(-el.getBoundingClientRect().top / scrollable) : 0

    // Octopus grows + arms uncurl + gentle mouse tilt.
    const scale = 0.3 + progress * 0.95
    if (octoRef.current) {
      octoRef.current.style.setProperty('--arm', clamp(progress * 1.4).toFixed(3))
      octoRef.current.style.transform =
        `perspective(900px) translate3d(${mx * 16}px, ${my * -10}px, 0) ` +
        `rotateY(${mx * 12}deg) rotateX(${-my * 8}deg) scale(${scale.toFixed(3)})`
    }
    // The egg fades out as the octopus emerges.
    if (eggRef.current) eggRef.current.style.opacity = clamp(1 - progress * 5).toFixed(3)

    // Progress rail fill.
    if (fillRef.current) fillRef.current.style.width = `${(progress * 100).toFixed(1)}%`

    // Active stage — toggle classes only when it changes.
    const active = clamp(Math.floor(progress * stages.length), 0, stages.length - 1)
    if (active !== activeRef.current) {
      activeRef.current = active
      captionRefs.current.forEach((c, i) => c && c.classList.toggle('is-active', i === active))
      dotRefs.current.forEach((d, i) => {
        if (!d) return
        d.classList.toggle('is-active', i === active)
        d.classList.toggle('is-done', i < active)
      })
    }
  })

  useParallax(onFrame)

  return (
    <section
      className="life"
      id="lifecycle"
      ref={sectionRef}
      style={{ height: `${stages.length * 85}vh` }}
    >
      <div className="life__sticky">
        <div className="life__head">
          <p className="section__eyebrow">From the first egg to the last tide</p>
          <h2 className="section__title">The life of an octopus</h2>
        </div>

        {/* Stepper showing every stage */}
        <div className="life__rail">
          <div className="life__rail-line"><span ref={fillRef} className="life__rail-fill" /></div>
          <ul className="life__steps">
            {stages.map((s, i) => (
              <li
                key={s.key}
                ref={(el) => (dotRefs.current[i] = el)}
                className="life__step"
              >
                <span className="life__dot">{s.emoji}</span>
                <span className="life__step-name">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The growing octopus */}
        <div className="life__stage">
          <div className="life__egg" ref={eggRef} aria-hidden="true" />
          <div className="life__octopus" ref={octoRef}>
            <Octopus useVar className="life__octopus-svg" />
          </div>
        </div>

        {/* Crossfading stage captions */}
        <div className="life__captions">
          {stages.map((s, i) => (
            <div
              key={s.key}
              ref={(el) => (captionRefs.current[i] = el)}
              className={`life__caption ${i === 0 ? 'is-active' : ''}`}
            >
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
