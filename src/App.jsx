import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Lifecycle from './components/Lifecycle.jsx'
import Founders from './components/Founders.jsx'
import Features from './components/Features.jsx'
import Stats from './components/Stats.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // Each parallax section runs its own rAF loop and mutates the DOM directly,
  // so nothing here re-renders on scroll.
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Lifecycle />
        <Founders />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
