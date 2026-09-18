import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nav, Footer, WhatsAppFab } from './components/chrome'
import { ScrollProgress } from './components/motion'
import Home from './pages/Home'
import Services from './pages/Services'
import Courses from './pages/Courses'
import About from './pages/About'
import Guide from './pages/Guide'
import RegHub from './pages/RegHub'
import { Articles, ArticleOSH } from './pages/Articles'
import Contact from './pages/Contact'
import Locations from './pages/Locations'
import ServiceDetail from './pages/Detail'
import CourseDetail from './pages/CourseDetail'
import { Privacy, Terms, Cookies } from './pages/Legal'

gsap.registerPlugin(ScrollTrigger)

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || '#/')
  useEffect(() => {
    const fn = () => {
      setRoute(window.location.hash || '#/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', fn)
    return () => window.removeEventListener('hashchange', fn)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 })
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  // re-measure after route change
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [route])

  let page: React.ReactNode
  if (route === '#/' || route === '#' || route === '') page = <Home />
  else if (route === '#/services') page = <Services />
  else if (route === '#/courses') page = <Courses />
  else if (route === '#/about') page = <About />
  else if (route === '#/guide') page = <Guide />
  else if (route === '#/regulatory-hub') page = <RegHub />
  else if (route === '#/articles') page = <Articles />
  else if (route === '#/articles/osh-act-2022-10-things') page = <ArticleOSH />
  else if (route === '#/contact') page = <Contact />
  else if (route === '#/locations') page = <Locations />
  else if (route === '#/privacy') page = <Privacy />
  else if (route === '#/terms') page = <Terms />
  else if (route === '#/cookies') page = <Cookies />
  else if (route.startsWith('#/services/')) page = <ServiceDetail slug={route.replace('#/services/', '')} />
  else if (route.startsWith('#/courses/')) page = <CourseDetail slug={route.replace('#/courses/', '')} />
  else page = <Home />

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--paper)]">
      <ScrollProgress />
      <Nav route={route} />
      <main key={route}>{page}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
