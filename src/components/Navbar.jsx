import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme.js'

const links = [
  { href: '#about', label: 'About' },
  { href: '#lifecycle', label: 'Life Cycle' },
  { href: '#founders', label: 'Founders' },
  { href: '#features', label: 'What We Do' },
  { href: '#contact', label: 'Contact' },
]

// little school of fish that swims across the navbar
const fish = ['🐟', '🐠', '🐡', '🦈', '🐟', '🐠']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      {/* school of fish drifting across the bar */}
      <div className="nav__fish" aria-hidden="true">
        {fish.map((f, i) => (
          <span key={i} style={{ '--i': i }}>{f}</span>
        ))}
      </div>

      <a className="nav__brand" href="#top">
        <span className="nav__logo" aria-hidden="true">🐙</span>
        <span>Octovate</span>
      </a>

      <nav className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="nav__cta" href="#contact" onClick={() => setOpen(false)}>
          Dive In
        </a>
      </nav>

      <div className="nav__tools">
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className="theme-toggle__icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="theme-toggle__label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
