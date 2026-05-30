import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const lines = ['Every card tells a story.', 'This is mine.', 'INDHU PRIYA YANAMALA'];

export default function IntroScene({ onBegin }) {
  const sceneRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('.intro-copy span', { opacity: 0, y: 24, duration: 0.8, stagger: 1.15 })
        .from('.sealed-card', { opacity: 0, y: 34, scale: 0.94, duration: 0.9, ease: 'back.out(1.2)' })
        .call(() => setReady(true));
    }, sceneRef);

    return () => context.revert();
  }, []);

  return (
    <motion.section
      ref={sceneRef}
      className="intro-scene relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 text-center"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.7 }}
    >
      <div className="intro-vignette" />
      {Array.from({ length: 15 }, (_, index) => (
        <motion.i
          key={index}
          className="intro-particle"
          style={{ left: `${6 + ((index * 31) % 88)}%`, top: `${8 + ((index * 19) % 78)}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.1, 0.28, 0.1] }}
          transition={{ duration: 6 + (index % 4), repeat: Infinity, delay: index * 0.3 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-9">
        <div className="intro-copy">
          {lines.map((line, index) => (
            <span key={line} className={index === 2 ? 'owner-line' : ''}>
              {line}
            </span>
          ))}
        </div>

        <motion.button
          type="button"
          className="sealed-card"
          aria-label="Open The Deck of Indhu"
          animate={ready ? { y: [0, -8, 0] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ y: -10, rotate: 2, boxShadow: '0 34px 120px rgba(212,175,55,0.18)' }}
          whileTap={{ scale: 0.97 }}
          onClick={ready ? onBegin : undefined}
        >
          <span className="seal-mark">IP</span>
          <strong>THE DECK</strong>
          <small>Click to open</small>
        </motion.button>
      </div>
    </motion.section>
  );
}
