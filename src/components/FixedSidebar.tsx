import { useEffect, useState } from 'react';
import { CONFIG } from '@/config';

const sidebarItems = [
  { id: 'home', image: '/images/project-1.jpg', label: 'Aerial View' },
  { id: 'about', image: CONFIG.aboutPhoto, label: 'Profile' },
  { id: 'skills', image: '/images/project-2.jpg', label: 'GIS Analysis' },
  { id: 'portfolio', image: '/images/project-1.jpg', label: 'Restoration' },
  { id: 'gallery', image: 'https://picsum.photos/id/10/100/100', label: 'Gallery' },
  { id: 'experience', image: '/images/project-3.jpg', label: 'Fieldwork' },
  { id: 'publications', image: '/images/project-4.jpg', label: 'Research' },
  { id: 'testimonials', image: '/images/project-6.jpg', label: 'Community' },
  { id: 'contact', image: '/images/contact-photo.jpg', label: 'Contact' },
];

export default function FixedSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem('anchorSidebarOpen');
    const isOpen = saved !== null ? JSON.parse(saved) : true;
    // Set CSS variable immediately (before first paint) so content-offset is correct
    const isMobileInit = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!isMobileInit) {
      document.documentElement.style.setProperty(
        '--sidebar-offset',
        isOpen ? 'max(15vw, 120px)' : '0px'
      );
    }
    return isOpen;
  });

  // Track isMobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync open state with localStorage and CSS property
  useEffect(() => {
    localStorage.setItem('anchorSidebarOpen', JSON.stringify(open));
    if (!isMobile) {
      document.documentElement.style.setProperty('--sidebar-offset', open ? 'max(15vw, 120px)' : '0px');
    } else {
      document.documentElement.style.setProperty('--sidebar-offset', '0px');
    }
  }, [open, isMobile]);

  // Observer to track current active section
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

  // Desktop: left sidebar thumbnails with dynamic toggle button
  return (
    <>
      {/* Sidebar Container */}
      <div
        className="fixed left-0 top-14 bottom-0 z-[100] hidden md:flex flex-col overflow-y-auto"
        style={{
          width: 'max(15vw, 120px)',
          backgroundColor: 'var(--white)',
          borderRight: '1px solid var(--border-light)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.5s ease-in-out',
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

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-1/2 -translate-y-1/2 z-[110] hidden md:flex items-center justify-center w-8 h-8 rounded-r-full shadow-md"
        style={{
          left: open ? 'max(15vw, 120px)' : '0px',
          backgroundColor: 'var(--white)',
          border: '1px solid var(--border-light)',
          borderLeft: 'none',
          color: 'var(--black)',
          transition: 'left 0.5s ease-in-out, background-color 0.3s',
        }}
        aria-label={open ? 'Hide Sidebar' : 'Show Sidebar'}
      >
        {/* Chevron Icon (Left Chevron by default, rotated when closed) */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </>
  );
}