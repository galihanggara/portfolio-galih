import { useState, useEffect, useCallback } from 'react';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

interface NavigationProps {
  isDark: boolean;
  toggleDark: () => void;
}

const navLinks = [
  { id: 'home', labelEN: 'Home', labelID: 'Beranda' },
  { id: 'about', labelEN: 'About', labelID: 'Tentang' },
  { id: 'skills', labelEN: 'Skills', labelID: 'Keahlian' },
  { id: 'portfolio', labelEN: 'Portfolio', labelID: 'Portofolio' },
  { id: 'gallery', labelEN: 'Gallery', labelID: 'Galeri' },
  { id: 'experience', labelEN: 'Experience', labelID: 'Pengalaman' },
  { id: 'publications', labelEN: 'Publications', labelID: 'Publikasi' },
  { id: 'contact', labelEN: 'Contact', labelID: 'Kontak' },
];

export default function Navigation({ isDark, toggleDark }: NavigationProps) {
  const { lang, toggleLang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-white/85 dark:bg-[var(--dark)]/90 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid var(--border-light)' : 'none' }}
      >
        <div className="flex items-center justify-between h-14 px-4 md:px-8">
          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="text-left">
            <div
              className="text-xs tracking-wider"
              style={{
                fontFamily: 'var(--font-body)',
                color: scrolled ? 'var(--black)' : 'var(--white)',
              }}
            >
              <span className="dark:text-white" style={{ color: 'inherit' }}>GWSA</span>
            </div>
            <div
              className="text-[10px] tracking-[0.05em] opacity-50"
              style={{
                fontFamily: 'var(--font-body)',
                color: scrolled ? 'var(--black)' : 'var(--white)',
              }}
            >
              <span className="dark:text-white dark:opacity-50" style={{ color: 'inherit' }}>
                {CONFIG.nameShort.toUpperCase()}
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, labelEN, labelID }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative transition-colors duration-300 hover:opacity-100"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: scrolled ? 'var(--black)' : 'var(--white)',
                  opacity: activeSection === id ? 1 : 0.7,
                }}
              >
                <span className="dark:text-white" style={{ color: 'inherit' }}>
                  {t(labelEN, labelID)}
                </span>
                {activeSection === id && (
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--mid)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => lang !== 'en' && toggleLang()}
                className="px-1.5 py-0.5 rounded-sm transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  border: lang === 'en'
                    ? `1px solid ${scrolled ? 'var(--black)' : 'var(--white)'}`
                    : '1px solid transparent',
                  opacity: lang === 'en' ? 1 : 0.4,
                  color: scrolled ? 'var(--black)' : 'var(--white)',
                }}
              >
                <span className="dark:text-white" style={{ color: 'inherit' }}>EN</span>
              </button>
              <button
                onClick={() => lang !== 'id' && toggleLang()}
                className="px-1.5 py-0.5 rounded-sm transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  border: lang === 'id'
                    ? `1px solid ${scrolled ? 'var(--black)' : 'var(--white)'}`
                    : '1px solid transparent',
                  opacity: lang === 'id' ? 1 : 0.4,
                  color: scrolled ? 'var(--black)' : 'var(--white)',
                }}
              >
                <span className="dark:text-white" style={{ color: 'inherit' }}>ID</span>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className="hidden md:flex w-5 h-5 rounded-full items-center justify-center transition-transform duration-200 hover:scale-110"
              style={{
                border: `1.5px solid ${scrolled ? 'var(--black)' : 'var(--white)'}`,
                background: isDark
                  ? `linear-gradient(90deg, ${scrolled ? 'var(--black)' : 'var(--white)'} 50%, transparent 50%)`
                  : `linear-gradient(90deg, transparent 50%, ${scrolled ? 'var(--black)' : 'var(--white)'} 50%)`,
              }}
              aria-label="Toggle dark mode"
            />

            {/* View CV Button */}
            <a
              href={CONFIG.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block px-4 py-1.5 rounded-sm transition-all duration-300 hover:bg-[var(--black)] hover:text-white"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                border: `1px solid ${scrolled ? 'var(--black)' : 'var(--white)'}`,
                color: scrolled ? 'var(--black)' : 'var(--white)',
              }}
            >
              <span className="dark:text-white" style={{ color: 'inherit' }}>
                {t('View CV', 'Lihat CV')}
              </span>
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1 p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-[18px] h-[1.5px]"
                  style={{
                    backgroundColor: scrolled ? 'var(--black)' : 'var(--white)',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[2000] flex flex-col"
          style={{ backgroundColor: 'var(--dark)' }}
        >
          {/* Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Nav Links */}
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            {navLinks.map(({ id, labelEN, labelID }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-white transition-opacity duration-200"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  opacity: activeSection === id ? 1 : 0.6,
                }}
              >
                {t(labelEN, labelID)}
              </button>
            ))}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-center gap-6 pb-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { lang !== 'en' && toggleLang(); }}
                className="px-2 py-1 rounded-sm text-white"
                style={{
                  fontSize: '12px',
                  border: lang === 'en' ? '1px solid white' : '1px solid rgba(255,255,255,0.3)',
                  opacity: lang === 'en' ? 1 : 0.4,
                }}
              >
                EN
              </button>
              <button
                onClick={() => { lang !== 'id' && toggleLang(); }}
                className="px-2 py-1 rounded-sm text-white"
                style={{
                  fontSize: '12px',
                  border: lang === 'id' ? '1px solid white' : '1px solid rgba(255,255,255,0.3)',
                  opacity: lang === 'id' ? 1 : 0.4,
                }}
              >
                ID
              </button>
            </div>
            <button
              onClick={() => { toggleDark(); }}
              className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: isDark
                    ? 'linear-gradient(90deg, white 50%, transparent 50%)'
                    : 'linear-gradient(90deg, transparent 50%, white 50%)',
                }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}