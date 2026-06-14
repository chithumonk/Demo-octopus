export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="nav__logo" aria-hidden="true">🐙</span>
          <span>Octovate</span>
        </div>
        <p className="footer__tag">Eight arms. Three hearts. One vision.</p>
        <nav className="footer__links">
          <a href="#about">About</a>
          <a href="#founders">Founders</a>
          <a href="#features">What We Do</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} Octovate Labs. Made in the deep.
      </p>
    </footer>
  )
}
