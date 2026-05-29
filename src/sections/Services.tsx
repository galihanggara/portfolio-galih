import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--light)',
        padding: '80px 0',
      }}
    >
      <div className="content-offset px-4 md:px-0">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="section-label">{t('SERVICES', 'LAYANAN')}</div>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--black)',
            }}
          >
            {t('What I Offer', 'Apa yang Saya Tawarkan')}
          </h2>

          {/* Services Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.services.map((service, i) => (
              <div
                key={i}
                className="service-card rounded-sm p-8 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--white)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '32px',
                    color: 'var(--mid)',
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  className="font-heading mt-4"
                  style={{
                    fontSize: '16px',
                    color: 'var(--black)',
                  }}
                >
                  {lang === 'en' ? service.titleEN : service.titleID}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'var(--black)',
                    opacity: 0.6,
                  }}
                >
                  {lang === 'en' ? service.descEN : service.descID}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}