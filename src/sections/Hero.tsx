import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

export default function Hero() {
  const { lang, t } = useLanguage();
  const [typewriterText, setTypewriterText] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2 }); // Wait for preloader

    if (panelRef.current) {
      tl.fromTo(
        panelRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }

    if (statsRef.current) {
      tl.fromTo(
        statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    const titles = CONFIG.title;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeSpeed = 60;
    const deleteSpeed = 30;
    const holdTime = 2500;

    function typeWriter() {
      const current = titles[roleIndex];

      if (isDeleting) {
        setTypewriterText(current.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypewriterText(current.substring(0, charIndex + 1));
        charIndex++;
      }

      let nextSpeed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === current.length) {
        nextSpeed = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % titles.length;
        nextSpeed = 300;
      }

      timeoutId = setTimeout(typeWriter, nextSpeed);
    }

    const startDelay = setTimeout(typeWriter, 3500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startDelay);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/contact-photo.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/aerial-mangrove-hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(27, 67, 50, 0.3) 0%, rgba(27, 67, 50, 0.1) 50%, rgba(27, 67, 50, 0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full content-offset px-4 md:px-0">
        {/* Liquid Glass Panel */}
        <div
          ref={panelRef}
          className="liquid-glass p-6 md:p-8 flex flex-col justify-between"
          style={{
            width: 'clamp(300px, 45vw, 520px)',
            minHeight: 'clamp(260px, 35vw, 380px)',
            borderRadius: '24px',
            opacity: 0,
          }}
        >
          {/* Top Label */}
          <div
            className="tracking-[0.1em] opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              color: 'var(--white)',
            }}
          >
            {CONFIG.nameShort.toUpperCase()}
          </div>

          {/* Title */}
          <div className="my-4 md:my-6">
            <h1
              ref={titleRef}
              className="font-display"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
                lineHeight: 1.1,
                color: 'var(--white)',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
                opacity: 0,
              }}
            >
              {lang === 'en' ? CONFIG.taglineEN : CONFIG.taglineID}
            </h1>

            {/* Typewriter */}
            <div className="mt-3 md:mt-4">
              <span
                ref={typewriterRef}
                className="typewriter-cursor"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--white)',
                  opacity: 0.85,
                }}
              >
                {typewriterText}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3" style={{ opacity: 0 }}>
            <a
              href={CONFIG.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--black)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
              }}
            >
              {t('Download CV', 'Unduh CV')}
            </a>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="px-6 py-2.5 rounded-sm transition-all duration-300 hover:bg-white hover:text-[var(--black)]"
              style={{
                border: '1px solid var(--white)',
                color: 'var(--white)',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
              }}
            >
              {t('View Projects', 'Lihat Proyek')}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-4">
            {[
              { href: CONFIG.social.github, icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              )},
              { href: CONFIG.social.linkedin, icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              )},
              { href: CONFIG.social.instagram, icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              )},
              { href: CONFIG.social.whatsapp, icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              )},
              { href: CONFIG.social.email, icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
              )},
            ].map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-200 hover:opacity-100"
                style={{ color: 'var(--white)', opacity: 0.7 }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-10 content-offset px-4 md:px-0 pb-16 md:pb-20"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-wrap gap-6 md:gap-10">
          {CONFIG.stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  color: 'var(--white)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                {stat.number}
              </div>
              <div
                className="mt-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'var(--white)',
                  opacity: 0.7,
                }}
              >
                {t(stat.labelEN, stat.labelID)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <svg
          className="animate-bounce-gentle"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--white)"
          strokeWidth="2"
          style={{ opacity: 0.5 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            color: 'var(--white)',
            opacity: 0.5,
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  );
}