import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export default function Gallery() {
  const { lang, t } = useLanguage();
  const [galleryImages, setGalleryImages] = useState<{ id: number; image: string; titleEN: string; titleID: string; descEN: string; descID: string; }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const totalImages = galleryImages.length;
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch gallery JSON at runtime
  useEffect(() => {
    fetch('/gallery.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setGalleryImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading gallery data:', err);
        setLoading(false);
      });
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (totalImages === 0 || isPaused || lightboxIndex !== null) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 3000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, totalImages, lightboxIndex]);

  const handlePrev = () => {
    if (totalImages === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    if (totalImages === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (totalImages === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalImages : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalImages) % totalImages : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, totalImages]);

  if (loading) {
    return (
      <section
        id="gallery"
        style={{
          backgroundColor: 'var(--white)',
          padding: '120px 0',
        }}
      >
        <div className="content-offset">
          <div className="max-w-[1100px] mx-auto flex flex-col items-center justify-center min-h-[350px]">
            <div className="w-12 h-12 rounded-full border-4 border-[rgba(45,106,79,0.15)] border-t-[var(--mid)] animate-spin" />
            <p className="mt-4 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--mid)' }}>
              {t('Loading gallery...', 'Memuat galeri...')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (totalImages === 0) {
    return null;
  }

  return (
    <>
      <section
        id="gallery"
        style={{
          backgroundColor: 'var(--white)',
          padding: '120px 0',
        }}
      >
        <div className="content-offset">
          <div className="max-w-[1100px] mx-auto">
            
            {/* Bilingual Header */}
            <div className="section-label">
              {t('Field Activities Gallery', 'Galeri Kegiatan Lapangan')}
            </div>
            <h2
              className="font-display mt-4 mb-10"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--black)',
              }}
            >
              {t('Conservation & Mapping in Action', 'Aksi Konservasi & Pemetaan')}
            </h2>

            {/* Premium Carousel Container */}
            <div
              className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/25 aspect-[16/10] md:aspect-[21/9] bg-black/5"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Carousel Track */}
              <div
                className="flex w-full h-full duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id || index}
                    className="relative w-full h-full flex-shrink-0 cursor-zoom-in"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <img
                      src={image.image}
                      alt={lang === 'en' ? image.titleEN : image.titleID}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Dark Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 40%, transparent 100%)',
                      }}
                    />

                    {/* Bilingual Caption Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 text-white pointer-events-none z-10">
                      <span
                        className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {t('Activity', 'Kegiatan')} {index + 1} / {totalImages}
                      </span>
                      <h3
                        className="font-heading mt-1 md:mt-2 text-xl md:text-3xl text-white drop-shadow-md"
                        style={{
                          opacity: currentIndex === index ? 1 : 0,
                          transform: currentIndex === index ? 'translateY(0)' : 'translateY(15px)',
                          transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
                        }}
                      >
                        {lang === 'en' ? image.titleEN : image.titleID}
                      </h3>
                      <p
                        className="mt-1 md:mt-2 text-xs md:text-sm text-white/80 max-w-[600px] line-clamp-2 drop-shadow-sm"
                        style={{
                          fontFamily: 'var(--font-body)',
                          opacity: currentIndex === index ? 1 : 0,
                          transform: currentIndex === index ? 'translateY(0)' : 'translateY(15px)',
                          transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s',
                        }}
                      >
                        {lang === 'en' ? image.descEN : image.descID}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 active:scale-95 z-20"
                aria-label="Previous Slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white transition-all duration-300 border border-white/10 active:scale-95 z-20"
                aria-label="Next Slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className="h-2 rounded-full transition-all duration-300 focus:outline-none"
                    style={{
                      width: currentIndex === index ? '20px' : '8px',
                      backgroundColor: currentIndex === index ? 'var(--white)' : 'rgba(255, 255, 255, 0.4)',
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Fullscreen View */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-[2010] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 border border-white/10"
            aria-label="Close Lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Fullscreen Lightbox Carousel View */}
          <div
            className="relative flex items-center justify-center max-w-5xl w-full max-h-[80vh] px-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={galleryImages[lightboxIndex].image}
              alt={lang === 'en' ? galleryImages[lightboxIndex].titleEN : galleryImages[lightboxIndex].titleID}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-lightboxScale"
            />

            {/* Lightbox Prev Button */}
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + totalImages) % totalImages)}
              className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Lightbox Next Button */}
            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % totalImages)}
              className="absolute right-0 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Lightbox Bottom Caption details */}
          <div
            className="mt-6 text-center max-w-2xl px-6 pointer-events-none select-none text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-xl md:text-2xl text-white">
              {lang === 'en' ? galleryImages[lightboxIndex].titleEN : galleryImages[lightboxIndex].titleID}
            </h3>
            <p className="mt-2 text-xs md:text-sm text-white/70" style={{ fontFamily: 'var(--font-body)' }}>
              {lang === 'en' ? galleryImages[lightboxIndex].descEN : galleryImages[lightboxIndex].descID}
            </p>
          </div>
        </div>
      )}

      {/* Embedded Animation Style */}
      <style>{`
        @keyframes lightboxScale {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-lightboxScale {
          animation: lightboxScale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
