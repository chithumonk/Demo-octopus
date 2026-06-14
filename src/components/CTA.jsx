import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
  }

  return (
    <section className="cta" id="contact">
      <div className="cta__inner">
        <span className="cta__emoji" aria-hidden="true">🐙</span>
        <h2 className="section__title">Ready to dive in with us?</h2>
        <p className="cta__sub">
          Join the waitlist and we’ll reach out — probably with more than one arm.
        </p>
        {sent ? (
          <p className="cta__thanks">🎉 You’re in the tank! We’ll be in touch soon.</p>
        ) : (
          <form className="cta__form" onSubmit={submit}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button className="btn btn--primary" type="submit">Get early access</button>
          </form>
        )}
      </div>
    </section>
  )
}
