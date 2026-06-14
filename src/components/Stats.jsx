import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useScrollProgress.js'

const stats = [
  { value: 8, suffix: '', label: 'Founders, one per arm' },
  { value: 3, suffix: '', label: 'Hearts beating in sync' },
  { value: 40, suffix: 'k+', label: 'Developers in our waters' },
  { value: 99, suffix: '.9%', label: 'Uptime, ink-cloud backed' },
]

function Counter({ value, suffix, run }) {
  const [n, setN] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!run || started.current) return
    started.current = true
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * value))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [run, value])
  return <span>{n}{suffix}</span>
}

export default function Stats() {
  const [ref, visible] = useReveal({ threshold: 0.4 })
  return (
    <section className="stats" ref={ref}>
      <div className="stats__grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__num"><Counter {...s} run={visible} /></div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
