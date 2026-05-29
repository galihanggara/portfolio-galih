import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-label', {
        x: -20, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.from('.about-heading', {
        y: 30, opacity: 0, duration: 0.8, delay: 0.1,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.from('.about-paragraph', {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.3,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.from('.about-detail', {
        y: 15, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.5,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.from('.about-image-wrapper', {
        x: 30, opacity: 0, duration: 1, delay: 0.2,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const bioTexts = lang === 'en' ? CONFIG.bioEN : CONFIG.bioID;

  const details = [
    { label: t('Degree', 'Gelar'), value: CONFIG.degree },
    { label: t('University', 'Universitas'), value: 'Universitas Gadjah Mada' },
    { label: t('Location', 'Lokasi'), value: CONFIG.location },
    { label: t('Email', 'Email'), value: CONFIG.email },
    { label: t('Phone', 'Telepon'), value: CONFIG.phone },
    { label: t('Status', 'Status'), value: t(CONFIG.freelanceStatus, CONFIG.freelanceStatusID) },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: 'var(--white)',
        paddingTop: '120px',
        paddingBottom: '80px',
      }}
    >
      <div className="content-offset">
        <div
          className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 md:gap-16"
        >
          {/* Left Column - Text */}
          <div>
            {/* Section Label */}
            <div className="about-label section-label">
              {t('ABOUT', 'TENTANG')}
            </div>

            {/* Heading */}
            <h2
              className="about-heading font-display mt-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--black)',
              }}
            >
              {t('Bridging Science & Fieldwork', 'Menjembatani Sains & Kerja Lapangan')}
            </h2>

            {/* Bio Paragraphs */}
            {bioTexts.map((paragraph, i) => (
              <p
                key={i}
                className="about-paragraph mt-6"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  color: 'var(--black)',
                  opacity: 0.75,
                }}
              >
                {paragraph}
              </p>
            ))}

            {/* Personal Details */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {details.map((detail, i) => (
                <div key={i} className="about-detail">
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'var(--mid)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {detail.label}
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--black)',
                    }}
                  >
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV Button */}
            <a
              href={CONFIG.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-detail inline-block mt-8 px-5 py-2 rounded-sm transition-all duration-300 hover:bg-[var(--black)] hover:text-white"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                border: '1px solid var(--black)',
                color: 'var(--black)',
              }}
            >
              {t('Download CV', 'Unduh CV')}
            </a>
          </div>

          {/* Right Column - Image */}
          <div className="about-image-wrapper">
            <div
              className="overflow-hidden rounded-sm"
              style={{
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
              }}
            >
              <img
                src={CONFIG.aboutPhoto}
                alt={CONFIG.name}
                className="w-full object-cover"
                style={{ aspectRatio: '3/4' }}
                loading="lazy"
              />
            </div>
            <div
              className="px-3 py-2"
              style={{
                backgroundColor: 'var(--light)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'var(--black)',
                  opacity: 0.5,
                }}
              >
                {t('Fieldwork — North Sumatra Coast, 2023', 'Kerja Lapangan — Pesisir Sumatera Utara, 2023')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}