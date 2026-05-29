import { useState, useCallback } from 'react';
import { LanguageProvider } from '@/hooks/useLanguage';
import { useDarkMode } from '@/hooks/useDarkMode';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import FixedSidebar from '@/components/FixedSidebar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Portfolio from '@/sections/Portfolio';
import Gallery from '@/sections/Gallery';
import Experience from '@/sections/Experience';
import Publications from '@/sections/Publications';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';

function AppContent() {
  const [loaded, setLoaded] = useState(false);
  const { isDark, toggleDark } = useDarkMode();

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Preloader */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navigation */}
      <Navigation isDark={isDark} toggleDark={toggleDark} />

      {/* Fixed Sidebar */}
      <FixedSidebar />

      {/* Main Content */}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Gallery Section */}
        <Gallery />

        {/* Experience & Education Timeline */}
        <Experience />

        {/* Publications Section */}
        <Publications />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />

        {/* Back to Top */}
        <BackToTop />
      </main>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}