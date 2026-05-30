import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  // Animations for tags removed to fix opacity/visibility issues

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
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Supervised & Unsupervised Classification",
              "Time-Series Vegetation Indexing",
              "UAV Photogrammetry & Orthomosaic",
              "Geodatabase Architecture",
              "Spatial Clustering",
              "Drone SOP Implementation"
            ].map((skill, i) => (
              <span 
                key={`tech-${i}`} 
                className="soft-skill-tag px-4 py-2 rounded-sm shadow-sm transition-all duration-300 hover:shadow-md opacity-100 visible z-10" 
                style={{ backgroundColor: 'var(--white)', color: 'var(--black)', fontFamily: 'var(--font-body)', fontSize: '13px', border: '1px solid var(--border-color)' }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Soft Skills */}
          <div className="soft-skills-container mt-16">
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
                <span 
                  key={`soft-${i}`} 
                  className="soft-skill-tag px-4 py-2 rounded-sm shadow-sm transition-all duration-300 hover:shadow-md opacity-100 visible z-10"
                  style={{ backgroundColor: 'var(--white)', color: 'var(--black)', fontFamily: 'var(--font-body)', fontSize: '13px', border: '1px solid var(--border-color)' }}
                >
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