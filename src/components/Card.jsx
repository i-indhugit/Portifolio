import { motion } from 'framer-motion';

export default function Card({ title, text, onClick }) {
	return (
		<motion.button
			type="button"
			className="deck-card"
			onClick={onClick}
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.28 }}
			whileTap={{ scale: 0.98 }}
		>
			<div className="card-title">{title}</div>
			<div className="card-text">{text}</div>
			<div className="card-footer">Click to open details</div>
		</motion.button>
	);
}