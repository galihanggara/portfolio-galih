import { useLanguage } from '@/hooks/useLanguage';

const footerLinks = [
  { id: 'home', labelEN: 'Home', labelID: 'Beranda' },
  { id: 'about', labelEN: 'About', labelID: 'Tentang' },
  { id: 'portfolio', labelEN: 'Portfolio', labelID: 'Portofolio' },
  { id: 'contact', labelEN: 'Contact', labelID: 'Kontak' },
];

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--dark)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '32px 0',
      }}
    >
      <div className="content-offset px-4 md:px-0">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--light)',
              opacity: 0.4,
            }}
          >
            &copy; 2025 Galih W. S. Anggara. All rights reserved.
          </span>

          {/* Quick Nav */}
          <div className="flex items-center gap-6">
            {footerLinks.map(({ id, labelEN, labelID }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="transition-opacity duration-200 hover:opacity-100"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  color: 'var(--light)',
                  opacity: 0.4,
                }}
              >
                {t(labelEN, labelID)}
              </button>
            ))}
          </div>

          {/* Tagline */}
          <span
            className="italic"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              color: 'var(--light)',
              opacity: 0.3,
            }}
          >
            {t(
              'Data-driven collaboration for environmental futures',
              'Kolaborasi berbasis data untuk masa depan lingkungan'
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}