import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate progress bars
      gsap.utils.toArray<HTMLElement>('.skill-progress-fill').forEach((fill) => {
        const targetWidth = fill.dataset.percent;
        gsap.to(fill, {
          width: targetWidth + '%',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: fill.closest('.skill-card'),
            start: 'top 85%',
            once: true,
          },
        });
      });

      // Stagger cards
      gsap.from('.skill-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });

      // Soft skill tags
      gsap.from('.soft-skill-tag', {
        y: 15, opacity: 0, duration: 0.4, stagger: 0.06,
        scrollTrigger: { trigger: '.soft-skills-container', start: 'top 85%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--light)',
        padding: '80px 0',
      }}
    >
      <div className="content-offset px-4 md:px-0">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="section-label">{t('EXPERTISE', 'KEAHLIAN')}</div>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--black)',
            }}
          >
            {t('Technical Proficiency', 'Keahlian Teknis')}
          </h2>

          {/* Technical Skills Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.skills.technical.map((skill, i) => (
              <div
                key={i}
                className="skill-card rounded-sm p-6"
                style={{ backgroundColor: 'var(--white)' }}
              >
                <h3
                  className="font-heading"
                  style={{
                    fontSize: '16px',
                    color: 'var(--black)',
                  }}
                >
                  {lang === 'en' ? skill.name : (skill.nameID || skill.name)}
                </h3>
                <div className="skill-progress-track mt-3">
                  <div
                    className="skill-progress-fill"
                    data-percent={skill.percent}
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="mt-2 text-right">
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'var(--mid)',
                    }}
                  >
                    {skill.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tools Section */}
          <h3
            className="font-heading mt-12"
            style={{
              fontSize: '20px',
              color: 'var(--black)',
            }}
          >
            {t('Tools', 'Alat')}
          </h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONFIG.skills.tools.map((tool, i) => (
              <div
                key={i}
                className="skill-card rounded-sm p-6"
                style={{ backgroundColor: 'var(--white)' }}
              >
                <h3
                  className="font-heading"
                  style={{
                    fontSize: '16px',
                    color: 'var(--black)',
                  }}
                >
                  {lang === 'en' ? tool.name : (tool.nameID || tool.name)}
                </h3>
                <div className="skill-progress-track mt-3">
                  <div
                    className="skill-progress-fill"
                    data-percent={tool.percent}
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="mt-2 text-right">
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'var(--mid)',
                    }}
                  >
                    {tool.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="soft-skills-container mt-12">
            <h3
              className="font-heading mb-4"
              style={{
                fontSize: '20px',
                color: 'var(--black)',
              }}
            >
              {t('Soft Skills', 'Keahlian Non-Teknis')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {CONFIG.skills.soft.map((skill, i) => (
                <span key={i} className="soft-skill-tag">
                  {lang === 'en' ? skill.name : skill.nameID}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}