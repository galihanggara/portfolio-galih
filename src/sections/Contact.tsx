import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONFIG } from '@/config';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-form-field', {
        y: 15, opacity: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
      gsap.from('.contact-info', {
        x: 20, opacity: 0, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '2px',
    padding: '12px 16px',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--dark)',
        paddingTop: '120px',
        paddingBottom: '80px',
      }}
    >
      <div className="content-offset">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 md:gap-16">
          {/* Left - Form */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: 'var(--white)',
              }}
            >
              {t('Get In Touch', 'Hubungi Saya')}
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--light)',
                opacity: 0.7,
              }}
            >
              {t(
                'Have a project in mind or want to collaborate? Reach out.',
                'Punya proyek atau ingin berkolaborasi? Hubungi saya.'
              )}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="contact-form-field">
                <label
                  className="block mb-1.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--light)',
                    opacity: 0.5,
                  }}
                >
                  {t('Name', 'Nama')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                />
              </div>

              <div className="contact-form-field">
                <label
                  className="block mb-1.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--light)',
                    opacity: 0.5,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                />
              </div>

              <div className="contact-form-field">
                <label
                  className="block mb-1.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--light)',
                    opacity: 0.5,
                  }}
                >
                  {t('Subject', 'Subjek')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                />
              </div>

              <div className="contact-form-field">
                <label
                  className="block mb-1.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    color: 'var(--light)',
                    opacity: 0.5,
                  }}
                >
                  {t('Message', 'Pesan')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
                />
              </div>

              <div className="contact-form-field">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-sm transition-all duration-300 hover:bg-white"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--dark)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    border: 'none',
                  }}
                >
                  {t('Send Message', 'Kirim Pesan')}
                </button>

                {submitted && (
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--accent)',
                    }}
                  >
                    {t('Thank you! Your message has been sent.', 'Terima kasih! Pesan Anda telah terkirim.')}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right - Contact Info */}
          <div className="contact-info">
            <h3
              className="font-heading"
              style={{
                fontSize: '18px',
                color: 'var(--white)',
              }}
            >
              {t('Contact Information', 'Informasi Kontak')}
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--light)', opacity: 0.7 }}>&#128205;</span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--light)',
                    opacity: 0.7,
                    lineHeight: 2.2,
                  }}
                >
                  {CONFIG.location}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--light)', opacity: 0.7 }}>&#9993;</span>
                <a
                  href={`mailto:${CONFIG.email}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--light)',
                    opacity: 0.7,
                    lineHeight: 2.2,
                  }}
                >
                  {CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span style={{ color: 'var(--light)', opacity: 0.7 }}>&#128241;</span>
                <a
                  href={`tel:${CONFIG.phone.replace(/\s/g, '')}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--light)',
                    opacity: 0.7,
                    lineHeight: 2.2,
                  }}
                >
                  {CONFIG.phone}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <h3
              className="font-heading mt-8"
              style={{
                fontSize: '16px',
                color: 'var(--white)',
              }}
            >
              {t('Social Links', 'Tautan Sosial')}
            </h3>
            <div className="flex items-center gap-4 mt-3">
              {[
                { href: CONFIG.social.github, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                )},
                { href: CONFIG.social.linkedin, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                )},
                { href: CONFIG.social.facebook, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                )},
                { href: CONFIG.social.whatsapp, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                )},
                { href: CONFIG.social.email, icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
                )},
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-200 hover:opacity-100"
                  style={{ color: 'var(--light)', opacity: 0.7 }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Map Embed Placeholder */}
            <div
              className="mt-8 rounded-sm overflow-hidden"
              style={{
                aspectRatio: '4/3',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src="/images/contact-photo.jpg"
                alt="Location"
                className="w-full h-full object-cover"
                style={{ opacity: 0.6 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}