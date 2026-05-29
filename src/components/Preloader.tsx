import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.preloader', {
          yPercent: -100,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    tl.to(
      {},
      {
        duration: 1.5,
        ease: 'linear',
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        },
      }
    );
  }, [onComplete]);

  return (
    <div
      className="preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--dark)' }}
    >
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: 'var(--accent)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>
      <span
        className="mt-4 tracking-[0.15em]"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--white)',
          opacity: 0.6,
        }}
      >
        GWSA
      </span>
    </div>
  );
}