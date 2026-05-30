import { useEffect } from 'react';
import { motion } from 'framer-motion';

const items = ['INDHU PRIYA YANAMALA', 'MISSION', 'SKILLS', 'PROJECTS', 'ACHIEVEMENTS', 'AI ASSISTANT'];

export default function OpeningSequence({ onComplete }) {
	useEffect(() => {
		const totalMs = items.length * 500 + 800; // per-item delay + animation duration
		const t = setTimeout(() => onComplete?.(), totalMs);
		return () => clearTimeout(t);
	}, [onComplete]);

	return (
		<div className="opening">
			<div style={{ position: 'absolute', top: 18, right: 18 }}>
				<button onClick={() => onComplete?.()} className="skip-btn">Skip</button>
			</div>
			{items.map((item, index) => (
				<motion.div
					key={item}
					className="intro-card"
					initial={{ opacity: 0, y: -200, rotateY: 180 }}
					animate={{ opacity: 1, y: 0, rotateY: 0 }}
					transition={{ delay: index * 0.5, duration: 0.8 }}
				>
					{item}
				</motion.div>
			))}
		</div>
	);
}