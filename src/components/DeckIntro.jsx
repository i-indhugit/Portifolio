import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const lines = ['Every card tells a story.', 'This is mine.', 'INDHU PRIYA YANAMALA'];

export default function DeckIntro({ onLaunch }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active < lines.length) {
      const timer = setTimeout(() => setActive((value) => value + 1), 1400);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <section className="intro-screen">
      <div className="intro-copy">
        {lines.map((line, index) => (
          <motion.div
            key={line}
            className={index === lines.length - 1 ? 'intro-title' : 'intro-line'}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: active > index ? 1 : 0, y: active > index ? 0 : 24 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {active >= lines.length && (
        <motion.button
          type="button"
          className="sealed-card"
          onClick={onLaunch}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="sealed-card-face">
            <span>SEALED CARD</span>
          </div>
          <div className="sealed-card-note">Hover. Click to unlock.</div>
        </motion.button>
      )}
    </section>
  );
}
