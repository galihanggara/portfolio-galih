import { useEffect, useState } from 'react';
import { CONFIG } from '@/config';

const sidebarItems = [
  { id: 'home', image: '/images/project-1.jpg', label: 'Aerial View' },
  { id: 'about', image: CONFIG.aboutPhoto, label: 'Profile' },
  { id: 'skills', image: '/images/project-2.jpg', label: 'GIS Analysis' },
  { id: 'portfolio', image: '/images/project-1.jpg', label: 'Restoration' },
  { id: 'experience', image: '/images/project-3.jpg', label: 'Fieldwork' },
  { id: 'publications', image: '/images/project-4.jpg', label: 'Research' },
  { id: 'testimonials', image: '/images/project-6.jpg', label: 'Community' },
  { id: 'contact', image: '/images/contact-photo.jpg', label: 'Contact' },
];

export default function FixedSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const sections = sidebarItems.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sidebarItems.findIndex((item) => item.id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Mobile: bottom dot indicator
  if (isMobile) {
    return (
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 px-3 py-2 rounded-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        }}
      >
        {sidebarItems.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(sidebarItems[i].id)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === activeIndex ? 'var(--mid)' : 'var(--border-color)',
              transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
            }}
            aria-label={`Go to ${sidebarItems[i].label}`}
          />
        ))}
      </div>
    );
  }

  // Desktop: left sidebar thumbnails
  return (
    <div
      className="fixed left-0 top-14 bottom-0 z-[100] hidden md:flex flex-col overflow-y-auto"
      style={{
        width: 'max(15vw, 120px)',
        backgroundColor: 'var(--white)',
        borderRight: '1px solid var(--border-light)',
      }}
    >
      {sidebarItems.map((item, i) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`sidebar-thumb flex flex-col items-start p-2 transition-all duration-300 ${
            i === activeIndex ? 'active' : ''
          }`}
        >
          <div className="w-full aspect-square overflow-hidden rounded-sm">
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span
            className="sidebar-label mt-1 text-left transition-opacity duration-300"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              color: 'var(--black)',
              opacity: i === activeIndex ? 0.8 : 0.4,
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}