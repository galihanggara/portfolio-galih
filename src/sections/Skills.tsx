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
      // Stagger tags
      gsap.from('.soft-skill-tag', {
        y: 15, opacity: 0, duration: 0.4, stagger: 0.06,
        scrollTrigger: { trigger: section, start: 'top 85%', once: true },
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
      <div className="content-offset">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="section-label">{t('EXPERTISE', 'KEAHLIAN')}</div>
          <h2
            className="font-display mt-4 mb-8"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--black)',
            }}
          >
            {t('Methodological Expertise', 'Keahlian Metodologis')}
          </h2>

          {/* Technical Skills Grid -> Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {CONFIG.skills.technical.map((skill, i) => (
              <span key={i} className="soft-skill-tag" style={{ backgroundColor: 'var(--white)', color: 'var(--black)', border: '1px solid var(--border-color)' }}>
                {lang === 'en' ? skill.name : (skill.nameID || skill.name)}
              </span>
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