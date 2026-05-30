import { motion } from 'framer-motion';

const assembly = [
  { label: 'Skills', symbol: '✧', className: 'slot-skills', accent: '#C084FC' },
  { label: 'Projects', symbol: '⬢', className: 'slot-projects', accent: '#D4AF37' },
  { label: 'AI', symbol: '☾', className: 'slot-ai', accent: '#D4AF37' },
  { label: 'Origin', symbol: '◉', className: 'slot-origin', accent: '#60A5FA' },
  { label: 'Achievements', symbol: '🏆', className: 'slot-achievements', accent: '#C084FC' },
];

export default function FinalScene({ onRestart }) {
  return (
    <motion.section
      className="final-scene relative min-h-screen overflow-hidden px-4 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="final-haze" />
      <div className="final-board">
        {assembly.map((item, index) => (
          <motion.div
            key={item.label}
            className={`assembly-card ${item.className}`}
            style={{ '--accent': item.accent }}
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
          >
            <span>{item.symbol}</span>
            <strong>{item.label}</strong>
          </motion.div>
        ))}

        <motion.div
          className="you-core"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: 'backOut' }}
        >
          <div className="portrait-core">
            <span>IP</span>
          </div>
          <strong>YOU</strong>
        </motion.div>
      </div>

      <motion.div
        className="final-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <p>You have completed</p>
        <h1>THE DECK OF INDHU</h1>
        <button type="button" onClick={onRestart}>
          Revisit deck
        </button>
      </motion.div>
    </motion.section>
  );
}
