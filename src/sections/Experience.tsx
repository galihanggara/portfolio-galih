import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.timeline-left-item', {
        x: -30, opacity: 0, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.from('.timeline-right-item', {
        x: 30, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.1,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--light)',
        padding: '120px 0',
      }}
    >
      <div className="content-offset px-4 md:px-0">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="section-label">{t('JOURNEY', 'PERJALANAN')}</div>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--black)',
            }}
          >
            {t('Experience & Education', 'Pengalaman & Pendidikan')}
          </h2>

          {/* Two Column Layout */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Experience Column */}
            <div className="relative">
              <h3
                className="font-heading mb-8"
                style={{
                  fontSize: '20px',
                  color: 'var(--black)',
                }}
              >
                {t('Work Experience', 'Pengalaman Kerja')}
              </h3>

              {/* Timeline Line */}
              <div
                className="absolute left-0 top-16 bottom-0 w-px"
                style={{
                  backgroundColor: 'var(--mid)',
                  opacity: 0.3,
                }}
              />

              {CONFIG.experience.map((exp, i) => (
                <div key={i} className="timeline-left-item relative pl-6 pb-8">
                  {/* Node */}
                  <div
                    className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1/2"
                    style={{
                      border: '2px solid var(--mid)',
                      backgroundColor: 'var(--light)',
                    }}
                  />

                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--mid)',
                    }}
                  >
                    {lang === 'en' ? exp.year : exp.yearID}
                  </span>
                  <h4
                    className="font-heading mt-1"
                    style={{
                      fontSize: '16px',
                      color: 'var(--black)',
                    }}
                  >
                    {lang === 'en' ? exp.position : exp.positionID}
                  </h4>
                  <p
                    className="mt-0.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--black)',
                      opacity: 0.7,
                    }}
                  >
                    {lang === 'en' ? exp.company : exp.companyID}
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      lineHeight: 1.5,
                      color: 'var(--black)',
                      opacity: 0.55,
                    }}
                  >
                    {lang === 'en' ? exp.descEN : exp.descID}
                  </p>
                </div>
              ))}
            </div>

            {/* Education Column */}
            <div className="relative">
              <h3
                className="font-heading mb-8"
                style={{
                  fontSize: '20px',
                  color: 'var(--black)',
                }}
              >
                {t('Education', 'Pendidikan')}
              </h3>

              {/* Timeline Line */}
              <div
                className="absolute left-0 top-16 bottom-0 w-px"
                style={{
                  backgroundColor: 'var(--mid)',
                  opacity: 0.3,
                }}
              />

              {CONFIG.education.map((edu, i) => (
                <div key={i} className="timeline-right-item relative pl-6 pb-8">
                  {/* Node */}
                  <div
                    className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1/2"
                    style={{
                      border: '2px solid var(--mid)',
                      backgroundColor: 'var(--light)',
                    }}
                  />

                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--mid)',
                    }}
                  >
                    {edu.year}
                  </span>
                  <h4
                    className="font-heading mt-1"
                    style={{
                      fontSize: '16px',
                      color: 'var(--black)',
                    }}
                  >
                    {lang === 'en' ? edu.degree : edu.degreeID}
                  </h4>
                  <p
                    className="mt-0.5"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--black)',
                      opacity: 0.7,
                    }}
                  >
                    {edu.institution}
                  </p>
                  <span
                    className="inline-block mt-1 px-2 py-0.5 rounded-sm"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      backgroundColor: 'var(--mid)',
                      color: 'var(--white)',
                    }}
                  >
                    {edu.honor}
                  </span>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      lineHeight: 1.5,
                      color: 'var(--black)',
                      opacity: 0.55,
                    }}
                  >
                    {lang === 'en' ? edu.descEN : edu.descID}
                  </p>
                </div>
              ))}

              {/* Certifications */}
              <div className="timeline-right-item relative pl-6 pt-4">
                <div
                  className="absolute left-0 top-6 w-2.5 h-2.5 rounded-full -translate-x-1/2"
                  style={{
                    border: '2px solid var(--mid)',
                    backgroundColor: 'var(--light)',
                  }}
                />
                <h4
                  className="font-heading"
                  style={{
                    fontSize: '18px',
                    color: 'var(--black)',
                  }}
                >
                  {t('Certifications', 'Sertifikasi')}
                </h4>
                <div className="mt-4 space-y-3">
                  {CONFIG.certifications.map((cert, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--mid)',
                          minWidth: '36px',
                        }}
                      >
                        {cert.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--black)',
                          opacity: 0.7,
                        }}
                      >
                        {lang === 'en' ? cert.name : cert.nameID}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}