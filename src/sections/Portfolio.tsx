import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalProject, setModalProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === 'all'
    ? CONFIG.projects
    : CONFIG.projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-card', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const handleFilter = (key: string) => {
    if (key === activeFilter) return;
    setActiveFilter(key);
  };

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        style={{
          backgroundColor: 'var(--white)',
          padding: '120px 0',
        }}
      >
        <div className="content-offset">
          <div className="max-w-[1100px] mx-auto">
            {/* Header */}
            <div className="section-label">{t('SELECTED WORK', 'KARYA PILIHAN')}</div>
            <h2
              className="font-display mt-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--black)',
              }}
            >
              {t('Projects & Research', 'Proyek & Penelitian')}
            </h2>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CONFIG.projectCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleFilter(cat.key)}
                  className="px-4 py-2 rounded-full transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    border: activeFilter === cat.key
                      ? '1px solid var(--mid)'
                      : '1px solid var(--border-color)',
                    backgroundColor: activeFilter === cat.key ? 'var(--mid)' : 'transparent',
                    color: activeFilter === cat.key ? 'var(--white)' : 'var(--black)',
                  }}
                >
                  {t(cat.labelEN, cat.labelID)}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div
              ref={gridRef}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredProjects.map((project, i) => (
                <div
                  key={`${activeFilter}-${i}`}
                  className="portfolio-card group cursor-pointer"
                  onClick={() => setModalProject(CONFIG.projects.indexOf(project))}
                >
                  {/* Image */}
                  <div
                    className="overflow-hidden rounded-sm"
                    style={{ aspectRatio: '16/10' }}
                  >
                    <img
                      src={project.image}
                      alt={lang === 'en' ? project.title : project.titleID}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-4">
                    <span
                      className="uppercase tracking-wider"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        color: 'var(--mid)',
                      }}
                    >
                      {project.category}
                    </span>
                    <h3
                      className="font-heading mt-1"
                      style={{
                        fontSize: '18px',
                        color: 'var(--black)',
                      }}
                    >
                      {lang === 'en' ? project.title : project.titleID}
                    </h3>
                    <p
                      className="mt-2 line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: 'var(--black)',
                        opacity: 0.6,
                      }}
                    >
                      {lang === 'en' ? project.description : project.descriptionID}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-0.5 rounded-sm"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '10px',
                            backgroundColor: 'var(--light)',
                            color: 'var(--mid)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 mt-3">
                      <span
                        className="transition-all duration-200 hover:underline"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: 'var(--mid)',
                        }}
                      >
                        {t('Live Demo', 'Demo')}
                      </span>
                      <span
                        className="transition-all duration-200 hover:underline"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: 'var(--mid)',
                        }}
                      >
                        GitHub
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {modalProject !== null && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-sm overflow-hidden"
            style={{
              backgroundColor: 'var(--dark)',
              animation: 'modalFadeIn 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'var(--white)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image */}
            <div style={{ maxHeight: '50vh', overflow: 'hidden' }}>
              <img
                src={CONFIG.projects[modalProject].image}
                alt={lang === 'en' ? CONFIG.projects[modalProject].title : CONFIG.projects[modalProject].titleID}
                className="w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3
                className="font-heading"
                style={{
                  fontSize: '24px',
                  color: 'var(--white)',
                }}
              >
                {lang === 'en' ? CONFIG.projects[modalProject].title : CONFIG.projects[modalProject].titleID}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--white)',
                  opacity: 0.8,
                }}
              >
                {CONFIG.projects[modalProject].detail}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {CONFIG.projects[modalProject].tags.map((tag, j) => (
                  <span
                    key={j}
                    className="px-2.5 py-0.5 rounded-sm"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      backgroundColor: 'var(--mid)',
                      color: 'var(--white)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}