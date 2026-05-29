import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Publications() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.publication-card', {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="publications"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--white)',
        padding: '80px 0',
      }}
    >
      <div className="content-offset px-4 md:px-0">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="section-label">{t('RESEARCH', 'PENELITIAN')}</div>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--black)',
            }}
          >
            {t('Publications', 'Publikasi')}
          </h2>

          {/* Publication Card */}
          {CONFIG.publications.map((pub, i) => (
            <div
              key={i}
              className="publication-card mt-8 p-6 md:p-8 rounded-sm"
              style={{
                border: '1px solid var(--border-color)',
              }}
            >
              {/* Peer-Reviewed Badge */}
              <span
                className="inline-block px-2.5 py-1 rounded-sm"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  backgroundColor: 'var(--mid)',
                  color: 'var(--white)',
                }}
              >
                PEER-REVIEWED
              </span>

              <h3
                className="font-heading mt-4"
                style={{
                  fontSize: '20px',
                  color: 'var(--black)',
                  lineHeight: 1.4,
                }}
              >
                {lang === 'en' ? pub.titleEN : pub.titleID}
              </h3>

              <p
                className="mt-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--mid)',
                }}
              >
                {pub.journal}, {pub.year}
              </p>

              <p
                className="mt-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'var(--black)',
                  opacity: 0.65,
                }}
              >
                {lang === 'en' ? pub.descEN : pub.descID}
              </p>

              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 transition-all duration-200 hover:underline"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'var(--mid)',
                }}
              >
                {t('View Publication', 'Lihat Publikasi')} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}