import { useReveal } from '../hooks/useScrollProgress.js'

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section className="about" id="about" ref={ref}>
      <div className={`about__inner reveal ${visible ? 'reveal--in' : ''}`}>
        <p className="section__eyebrow">Why an octopus?</p>
        <h2 className="section__title">
          The smartest creature in the ocean is also the most adaptable.
        </h2>
        <p className="about__lead">
          An octopus has three hearts, blue blood, and the ability to solve a
          problem with any one of its eight arms — each capable of acting
          independently. That’s exactly how we build. Eight founders, eight
          specialties, fully autonomous yet perfectly coordinated.
        </p>
        <div className="about__grid">
          <div className="about__card">
            <span className="about__icon">🧠</span>
            <h3>Distributed intelligence</h3>
            <p>Decisions happen where the expertise lives — not stuck at a single bottleneck.</p>
          </div>
          <div className="about__card">
            <span className="about__icon">🌊</span>
            <h3>Built to adapt</h3>
            <p>We change shape to fit the problem, squeezing through gaps others can’t.</p>
          </div>
          <div className="about__card">
            <span className="about__icon">💡</span>
            <h3>Curious by nature</h3>
            <p>We open every jar. The interesting answers live in the unexplored trenches.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
