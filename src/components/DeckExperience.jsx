import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DeckCard from './DeckCard';
import FinalScene from './FinalScene';
import IntroScene from './IntroScene';
import { deckCards } from '../data/deckData';

export default function DeckExperience() {
  const [scene, setScene] = useState('intro');
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedCards, setOpenedCards] = useState([]);

  const activeCard = deckCards[activeIndex];
  const isOpened = openedCards.includes(activeCard.id);
  const completed = openedCards.length === deckCards.length;

  const openCard = () => {
    setOpenedCards((current) => (current.includes(activeCard.id) ? current : [...current, activeCard.id]));
  };

  const continueDeck = () => {
    if (activeIndex < deckCards.length - 1) {
      const nextCard = deckCards[activeIndex + 1];
      setActiveIndex((index) => index + 1);
      setOpenedCards((current) => (current.includes(nextCard.id) ? current : [...current, nextCard.id]));
      return;
    }

    setScene('final');
  };

  const revisit = (index) => {
    const target = deckCards[index];
    if (!openedCards.includes(target.id)) return;
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050505] text-[#F5F5F5]">
      <AnimatePresence mode="wait">
        {scene === 'intro' && <IntroScene key="intro" onBegin={() => setScene('deck')} />}

        {scene === 'deck' && (
          <motion.main
            key="deck"
            className="deck-stage relative min-h-screen px-4 py-5 sm:px-6 lg:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GoldDust />

            <section className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col">
              <header className="deck-header flex items-center justify-between gap-4 py-4">
                <button
                  type="button"
                  className="brand-mark"
                  onClick={() => {
                    setActiveIndex(0);
                    setOpenedCards([]);
                  }}
                  aria-label="Restart the deck"
                >
                  THE DECK OF INDHU
                </button>
                <div className="deck-status" aria-label="Deck symbol sequence">
                  {deckCards.map((card, index) => {
                    const unlocked = openedCards.includes(card.id);
                    const active = activeIndex === index;

                    return (
                      <span
                        key={card.id}
                        className={`sequence-symbol ${active ? 'is-current' : ''} ${unlocked ? 'is-lit' : ''}`}
                        style={{ '--accent': card.accent, '--glow': card.glow }}
                      >
                        {card.symbol}
                      </span>
                    );
                  })}
                </div>
              </header>

              <div className="deck-table grid flex-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div className="flex min-h-[560px] items-center justify-center">
                  <div className="deck-card-stack">
                    <DeckCard
                      key={activeCard.id}
                      card={activeCard}
                      isOpened={isOpened}
                      onOpen={openCard}
                      onContinue={continueDeck}
                      isLast={activeIndex === deckCards.length - 1}
                      completed={completed}
                    />
                    {isOpened && (
                      <motion.button
                        type="button"
                        className="deck-advance"
                        onClick={continueDeck}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        {activeIndex === deckCards.length - 1 ? 'Complete deck' : 'Next card'}
                      </motion.button>
                    )}
                  </div>
                </div>

                <aside className="deck-index" aria-label="Unlocked card collection">
                  {deckCards.map((card, index) => {
                    const unlocked = openedCards.includes(card.id);
                    const active = activeIndex === index;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        disabled={!unlocked}
                        onClick={() => revisit(index)}
                        className={`index-card ${active ? 'is-active' : ''} ${unlocked ? 'is-unlocked' : ''}`}
                        style={{ '--accent': card.accent, '--glow': card.glow }}
                      >
                        <span className="index-symbol">{card.symbol}</span>
                        {unlocked && <strong>{card.title}</strong>}
                      </button>
                    );
                  })}
                </aside>
              </div>

              <footer className="deck-footer">
                <span>{activeCard.symbol} is the current artifact.</span>
                <button
                  type="button"
                  className="complete-button"
                  disabled={!completed}
                  onClick={() => setScene('final')}
                >
                  Assemble deck
                </button>
              </footer>
            </section>
          </motion.main>
        )}

        {scene === 'final' && (
          <FinalScene
            key="final"
            cards={deckCards}
            onRestart={() => {
              setScene('deck');
              setActiveIndex(0);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GoldDust() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 15 }, (_, index) => (
        <motion.span
          key={index}
          className="gold-dust"
          style={{
            left: `${8 + ((index * 37) % 84)}%`,
            top: `${6 + ((index * 23) % 80)}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.08, 0.28, 0.08] }}
          transition={{ duration: 7 + (index % 5), repeat: Infinity, delay: index * 0.4, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
