import { useReveal } from '../hooks/useScrollProgress.js'

const features = [
  { icon: '🤖', title: 'Adaptive AI', text: 'Models that reshape themselves to the data in front of them — no two deployments alike.' },
  { icon: '🔗', title: 'Resilient infra', text: 'Eight-way redundancy. Lose an arm, keep swimming. Nothing takes us fully down.' },
  { icon: '📈', title: 'Real-time insight', text: 'Sense the current before it turns. Dashboards that feel the tide shifting.' },
  { icon: '🛡️', title: 'Ink-cloud security', text: 'Privacy-first by design. When threatened, we vanish behind a screen of encryption.' },
  { icon: '⚡', title: 'Jet-propelled speed', text: 'Edge-deployed and frighteningly fast. Latency measured in heartbeats — all three of them.' },
  { icon: '🧩', title: 'Modular by design', text: 'Plug an arm into your stack. Each capability stands — and ships — on its own.' },
]

export default function Features() {
  const [ref, visible] = useReveal()
  return (
    <section className="features" id="features" ref={ref}>
      <div className="features__head">
        <p className="section__eyebrow">What we do</p>
        <h2 className="section__title">Tools with a mind of their own</h2>
      </div>
      <div className={`features__grid reveal ${visible ? 'reveal--in' : ''}`}>
        {features.map((f, i) => (
          <article className="feature" key={f.title} style={{ '--d': `${i * 70}ms` }}>
            <span className="feature__icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
