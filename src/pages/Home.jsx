import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeckIntro from '../components/DeckIntro';
import DeckCard from '../components/DeckCard';
import DeckModal from '../components/DeckModal';
import { deckCards } from '../data/deck';

export default function Home() {
const [mode, setMode] = useState('intro');
const [activeIndex, setActiveIndex] = useState(0);
const [unlocked, setUnlocked] = useState([0]);
const [selectedCard, setSelectedCard] = useState(null);

const activeCard = deckCards[activeIndex];
const isUnlocked = unlocked.includes(activeIndex);
const collection = deckCards.filter((_, index) => unlocked.includes(index));
const allUnlocked = unlocked.length === deckCards.length;

const unlockCard = (card) => {
const cardIndex = deckCards.findIndex((item) => item.id === card.id);
if (cardIndex === -1) return;
if (!unlocked.includes(cardIndex)) {
setUnlocked((prev) => [...prev, cardIndex]);
}
setSelectedCard(card);
};

const navigate = (direction) => {
setActiveIndex((current) => (current + direction + deckCards.length) % deckCards.length);
};

return (
<>
{mode === 'intro' && <DeckIntro onLaunch={() => setMode('deck')} />}

{mode === 'deck' && (
<main className="deck-screen">
<header className="deck-header">
<div>
<div className="deck-title">THE DECK OF INDHU</div>
<p className="deck-subtitle">Discover. Unlock. Collect. Explore.</p>
</div>
<div className="deck-status">
<span>{`CARD ${String(activeIndex + 1).padStart(2, '0')} / ${String(deckCards.length).padStart(2, '0')}`}</span>
<span>{`${collection.length} unlocked`}</span>
</div>
</header>

<div className="deck-grid">
<aside className="deck-sidebar">
<div className="sidebar-panel">
<h3>Collection</h3>
<div className="collection-grid">
{collection.map((card) => (
<button
type="button"
key={card.id}
className={`collection-chip ${card.theme}`}
onClick={() => setActiveIndex(deckCards.findIndex((item) => item.id === card.id))}
>
{card.title.replace('CARD 00', '').trim()}
</button>
))}
</div>
</div>
<button
type="button"
className="completion-button"
disabled={!allUnlocked}
onClick={() => setMode('final')}
>
{allUnlocked ? 'Complete the Deck' : 'Unlock all cards to finish'}
</button>
</aside>

<section className="deck-main">
<DeckCard card={activeCard} isUnlocked={isUnlocked} onAction={unlockCard} />
<div className="deck-navigation">
<button type="button" onClick={() => navigate(-1)}>
Prev
</button>
<button type="button" onClick={() => navigate(1)}>
Next
</button>
</div>
</section>
</div>
</main>
)}

{mode === 'final' && (
<section className="final-scene">
<div className="final-assembly">
<motion.div
className="final-card top left"
initial={{ x: -80, y: -20, opacity: 0 }}
animate={{ x: 0, y: 0, opacity: 1 }}
transition={{ duration: 0.75, delay: 0.12 }}
>
Origin
</motion.div>
<motion.div
className="final-card top right"
initial={{ x: 80, y: -20, opacity: 0 }}
animate={{ x: 0, y: 0, opacity: 1 }}
transition={{ duration: 0.75, delay: 0.18 }}
>
Skills
</motion.div>
<motion.div
className="final-core"
initial={{ scale: 0.84, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.75, delay: 0.28 }}
>
YOU
</motion.div>
<motion.div
className="final-card bottom left"
initial={{ x: -80, y: 20, opacity: 0 }}
animate={{ x: 0, y: 0, opacity: 1 }}
transition={{ duration: 0.75, delay: 0.22 }}
>
Projects
</motion.div>
<motion.div
className="final-card bottom right"
initial={{ x: 80, y: 20, opacity: 0 }}
animate={{ x: 0, y: 0, opacity: 1 }}
transition={{ duration: 0.75, delay: 0.26 }}
>
AI
</motion.div>
</div>
<div className="final-copy">
<p>You have completed</p>
<h2>THE DECK OF INDHU</h2>
</div>
<button type="button" className="revisit-button" onClick={() => setMode('deck')}>
Revisit the Deck
</button>
</section>
)}

<AnimatePresence>
{selectedCard && <DeckModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
</AnimatePresence>
</>
);
}
