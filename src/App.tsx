import { lazy, Suspense, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';
import Hero from './sections/Hero';
import Navbar from './components/Navbar';
import './App.css';

// Below-the-fold sections are code-split so they don't block
// the initial JS parse/execution. They load as the user scrolls.
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Remove CSS smooth scrolling since Lenis will handle it
    document.documentElement.style.scrollBehavior = 'auto';

    let cleanupGSAP: (() => void) | null = null;
    
    import('lenis').then(({ default: Lenis }) => {
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisInstance.on('scroll', ScrollTrigger.update);

      const update = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      cleanupGSAP = () => {
        gsap.ticker.remove(update);
        lenisInstance?.destroy();
      };
    });

    // Removed manual ScrollTrigger.refresh() to eliminate forced reflows during hydration.
    // ScrollTrigger automatically refreshes its metrics when new triggers are created.

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      if (cleanupGSAP) cleanupGSAP();
    };
  }, []);

  return (
    <div className="app bg-[#fafafa] dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} />
      <main id="main-content">
        {/* Hero is eagerly loaded — it's the LCP element */}
        <Hero />

        {/* Everything below fold is lazy-loaded to reduce initial JS */}
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
