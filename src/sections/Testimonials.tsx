import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const { lang, t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 20, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % CONFIG.testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + CONFIG.testimonials.length) % CONFIG.testimonials.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, nextSlide]);

  const testimonial = CONFIG.testimonials[current];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--white)',
        padding: '120px 0',
      }}
    >
      <div className="content-offset px-4 md:px-0">
        <div className="max-w-[700px] mx-auto">
          {/* Header */}
          <div className="section-label">{t('TESTIMONIALS', 'TESTIMONI')}</div>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'var(--black)',
            }}
          >
            {t('What Colleagues Say', 'Apa Kata Rekan Kerja')}
          </h2>

          {/* Testimonial Card */}
          <div
            className="testimonial-card mt-12 rounded-sm p-8 md:p-10 relative"
            style={{ backgroundColor: 'var(--light)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Quote Mark */}
            <span
              className="font-display absolute top-4 left-4"
              style={{
                fontSize: '48px',
                color: 'var(--mid)',
                opacity: 0.3,
                lineHeight: 1,
              }}
            >
              &#10078;
            </span>

            {/* Quote Text */}
            <p
              className="relative z-10 pt-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'var(--black)',
                opacity: 0.8,
                fontStyle: 'italic',
              }}
            >
              {lang === 'en' ? testimonial.quoteEN : testimonial.quoteID}
            </p>

            {/* Author Row */}
            <div
              className="mt-6 pt-4 flex items-center gap-4"
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <h4
                  className="font-heading"
                  style={{
                    fontSize: '14px',
                    color: 'var(--black)',
                  }}
                >
                  {testimonial.name}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--black)',
                    opacity: 0.5,
                  }}
                >
                  {lang === 'en' ? testimonial.position : testimonial.positionID}, {testimonial.company}
                </p>
              </div>
              {/* Star Rating */}
              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="var(--accent)"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid var(--border-color)',
                color: 'var(--black)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--mid)';
                (e.currentTarget as HTMLElement).style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--black)';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid var(--border-color)',
                color: 'var(--black)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--mid)';
                (e.currentTarget as HTMLElement).style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--black)';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}