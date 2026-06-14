import { useEffect, useState } from 'react'

// Full-screen intro loader: a snail slowly crawls across the seabed while the
// page gets ready, then the whole thing fades away. It manages its own
// lifecycle and locks scrolling until it's gone.
export default function Loader() {
  const [hiding, setHiding] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t1 = setTimeout(() => setHiding(true), 2600) // start fade
    const t2 = setTimeout(() => {
      setGone(true)
      document.body.style.overflow = ''
    }, 3300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null

  return (
    <div className={`loader ${hiding ? 'loader--hide' : ''}`} role="status" aria-live="polite">
      <div className="loader__scene">
        <div className="loader__track">
          <div className="loader__slime" />
          <div className="loader__snail">
            <Snail />
          </div>
        </div>
        <p className="loader__text">Slowly crawling into the deep…</p>
      </div>
    </div>
  )
}

function Snail() {
  return (
    <svg viewBox="0 0 120 90" width="120" height="90" aria-label="A crawling snail">
      <defs>
        <linearGradient id="snail-shell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="snail-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* foot / body */}
      <path
        className="snail__body"
        d="M8 74 q6 -16 30 -16 h30 q22 0 30 12 q-4 8 -16 8 H16 q-8 0 -8 -4 Z"
        fill="url(#snail-body)"
      />
      {/* head + eye stalks */}
      <g className="snail__head">
        <circle cx="96" cy="58" r="9" fill="url(#snail-body)" />
        <line x1="98" y1="50" x2="103" y2="34" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="50" x2="89" y2="36" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        <circle cx="104" cy="32" r="3.5" fill="#fff" />
        <circle cx="88" cy="34" r="3.5" fill="#fff" />
        <circle cx="105" cy="32" r="1.6" fill="#1e1b4b" />
        <circle cx="89" cy="34" r="1.6" fill="#1e1b4b" />
      </g>
      {/* spiral shell */}
      <g>
        <circle cx="48" cy="44" r="28" fill="url(#snail-shell)" />
        <circle cx="48" cy="44" r="20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
        <circle cx="50" cy="46" r="12" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="3" />
        <circle cx="52" cy="48" r="5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
      </g>
    </svg>
  )
}
