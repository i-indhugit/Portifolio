import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { skillDetails } from '../data/deckData';

const rarityColor = {
  Legendary: '#D4AF37',
  Epic: '#C084FC',
  Rare: '#60A5FA',
  Common: '#A1A1AA',
};

const jokerAnswers = {
  'Tell me about Indhu':
    'Indhu Priya Yanamala is an aspiring AI and software developer drawn to intelligent systems, analytics, and polished product experiences.',
  'Show projects':
    'Her lab includes agentic workflows, recommendation systems, prediction models, peer review tools, skill recommendation systems, and analytics projects.',
  'Show skills':
    'Python, Java, SQL, C++, Machine Learning, Data Analytics, GitHub, Firebase, and Google Colab.',
  'Show certifications':
    'Oracle Cloud Infrastructure AI Associate, Database Management Systems, Machine Learning Concepts, and Generative AI & Agents.',
  'Future goals':
    'To build intelligent systems that feel useful, elegant, and human-centered.',
};

export default function DeckCard({ card, isOpened, onOpen, onContinue, isLast, completed }) {
  const [selectedSkill, setSelectedSkill] = useState(card.skills?.[0] || 'Python');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [chat, setChat] = useState([{ role: 'ai', text: 'INDHU AI is awake. Choose a prompt.' }]);

  useEffect(() => {
    setSelectedSkill(card.skills?.[0] || 'Python');
    setTilt({ x: 0, y: 0 });
    setChat([{ role: 'ai', text: 'INDHU AI is awake. Choose a prompt.' }]);
  }, [card.id, card.skills]);

  const personality = useMemo(() => {
    if (card.personality === 'confident') return { y: [0, -8, 0] };
    if (card.personality === 'memory') return { y: [34, 0, 4, 0] };
    if (card.personality === 'curiosity') return { rotate: [-1, 1, -1] };
    if (card.personality === 'wisdom') return { y: [0, -2, 0] };
    if (card.personality === 'pride') return { scale: [1, 1.005, 1] };
    if (card.personality === 'intelligent') return { rotate: [0, 0.45, -0.45, 0] };
    if (card.personality === 'alive') return { x: [0, 2, -1, 0], rotate: [0, -0.8, 0.7, 0] };
    if (card.personality === 'explorer') return { rotateX: tilt.y, rotate: tilt.x / 2 };
    return {};
  }, [card.personality, tilt.x, tilt.y]);

  const transition = {
    rotateY: { duration: 0.8, ease: 'easeInOut' },
    x: { duration: 5.7, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' },
    y: { duration: ambientDuration(card.personality), repeat: Infinity, ease: 'easeInOut' },
    rotate: { duration: ambientDuration(card.personality), repeat: Infinity, ease: 'easeInOut' },
    rotateX: { type: 'spring', stiffness: 120, damping: 18 },
    scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  };

  const handleMove = (event) => {
    if (card.personality !== 'explorer') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 10,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -10,
    });
  };

  const ask = (prompt) => {
    setChat((history) => [...history, { role: 'user', text: prompt }, { role: 'ai', text: jokerAnswers[prompt] }]);
  };

  return (
    <div className="card-perspective">
      <motion.article
        className={`premium-card ${isOpened ? 'is-open' : 'is-closed'} ${card.personality === 'pride' ? 'shimmer-card' : ''}`}
        style={{ '--accent': card.accent, '--glow': card.glow }}
        animate={{ rotateY: isOpened ? 180 : 0, ...personality }}
        transition={transition}
        whileHover={!isOpened ? { y: -10, rotate: card.personality === 'powerful' ? 0 : 2 } : undefined}
        whileTap={!isOpened ? { scale: 0.985 } : undefined}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <section className="card-face card-front" aria-label={`${card.title} card front`}>
          <div className="card-corner">{card.number}</div>
          <div className="front-center">
            <span className="front-number">{card.type === 'joker' && !isOpened ? '???' : card.number}</span>
            <span className="accent-line" />
          </div>
          <button type="button" className="open-card-button" onClick={onOpen}>
            {card.type === 'joker' ? 'Disturb card' : 'Open card'}
          </button>
        </section>

        <section className="card-face card-back" aria-label={`${card.title} card back`}>
          <div className="card-back-header">
            <span>{card.number}</span>
            <strong>{card.title}</strong>
          </div>

          <div className="card-content">
            {card.type === 'hero' && <PlayerCard card={card} />}
            {card.type === 'timeline' && <OriginCard timeline={card.timeline} />}
            {card.type === 'statement' && <MissionCard statement={card.statement} />}
            {card.type === 'constellation' && (
              <SkillsCard skills={card.skills} selectedSkill={selectedSkill} onSelect={setSelectedSkill} />
            )}
            {card.type === 'projects' && <ProjectsCard projects={card.projects} />}
            {card.type === 'vault' && <VaultCard items={card.certifications} />}
            {card.type === 'achievements' && <AchievementsCard items={card.achievements} />}
            {card.type === 'dashboard' && <GithubCard card={card} />}
            {card.type === 'joker' && <JokerCard prompts={card.prompts} chat={chat} onAsk={ask} />}
          </div>

          <button type="button" className="continue-button" onClick={onContinue}>
            {isLast ? (completed ? 'Complete deck' : 'Keep card') : 'Next card'}
          </button>
        </section>
      </motion.article>
    </div>
  );
}

function PlayerCard({ card }) {
  return (
    <motion.div className="player-layout" initial="hidden" animate="show" variants={stagger}>
      <motion.div className="portrait-frame" variants={fadeLine}>
        <div className="portrait-glass" />
        <div className="portrait-core">
          <span>IP</span>
        </div>
      </motion.div>
      <motion.h2 variants={fadeLine}>{card.profile.name}</motion.h2>
      <motion.p variants={fadeLine}>{card.profile.role}</motion.p>
      <motion.small variants={fadeLine}>{card.profile.tagline}</motion.small>
    </motion.div>
  );
}

function OriginCard({ timeline }) {
  return (
    <motion.div className="origin-timeline" initial="hidden" animate="show" variants={stagger}>
      <motion.div className="timeline-line" initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.9 }} />
      {timeline.map((entry) => (
        <motion.div key={entry.label} className="timeline-item" variants={fadeLine}>
          <span />
          <div>
            <strong>{entry.label}</strong>
            <p>{entry.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function MissionCard({ statement }) {
  return (
    <div className="mission-copy">
      {statement.map((line, index) => (
        <motion.span
          key={line}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.18 }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}

function SkillsCard({ skills, selectedSkill, onSelect }) {
  return (
    <div className="skill-scene">
      <svg className="constellation-lines" viewBox="0 0 300 210" aria-hidden="true">
        <polyline points="60,46 150,28 240,58 214,142 130,176 48,132 60,46" />
        <line x1="150" y1="28" x2="130" y2="176" />
        <line x1="48" y1="132" x2="240" y2="58" />
      </svg>
      {skills.map((skill, index) => (
        <button
          key={skill}
          type="button"
          className={`skill-node node-${index + 1} ${selectedSkill === skill ? 'selected' : ''}`}
          onClick={() => onSelect(skill)}
        >
          {skill}
        </button>
      ))}
      <div className="skill-detail">
        <strong>{selectedSkill}</strong>
        <p>{skillDetails[selectedSkill]}</p>
      </div>
    </div>
  );
}

function ProjectsCard({ projects }) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <motion.a
          key={project.name}
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className={`project-mini ${project.motion}`}
          style={{ '--rarity': rarityColor[project.rarity] }}
          initial={{ opacity: 0, y: 20, rotate: index % 2 ? 1.8 : -1.8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.5, delay: index * 0.07 }}
          whileHover={{ y: -5, rotateX: 3, rotateY: index % 2 ? -3 : 3 }}
        >
          <div className="project-thumb">
            <span />
            <i />
          </div>
          <small>{project.rarity}</small>
          <strong>{project.name}</strong>
          <p>{project.description}</p>
          <em>{project.stack.join(' / ')}</em>
        </motion.a>
      ))}
    </div>
  );
}

function VaultCard({ items }) {
  return (
    <div className="vault">
      <div className="vault-door">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      {items.map((item, index) => (
        <motion.div
          key={item}
          className="vault-entry"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.12 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}

function AchievementsCard({ items }) {
  return (
    <div className="trophy-wall">
      {items.map((item, index) => (
        <motion.div
          key={item}
          className="trophy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.16 }}
        >
          <span />
          <strong>{item}</strong>
        </motion.div>
      ))}
    </div>
  );
}

function GithubCard({ card }) {
  return (
    <div className="github-scene">
      <div className="orbit-map">
        {card.repos.map((repo, index) => (
          <span key={repo} className={`repo-node repo-${index + 1}`}>
            {repo}
          </span>
        ))}
      </div>
      <div className="language-bars">
        {card.languages.map((language) => (
          <div key={language.name}>
            <span>{language.name}</span>
            <i style={{ width: `${language.value}%` }} />
          </div>
        ))}
      </div>
      <a href={card.link} target="_blank" rel="noreferrer">
        github.com/i-indhugit
      </a>
    </div>
  );
}

function JokerCard({ prompts, chat, onAsk }) {
  return (
    <div className="joker-lab">
      <div className="joker-title">INDHU AI</div>
      <div className="chat-window">
        {chat.slice(-4).map((item, index) => (
          <div key={`${item.role}-${index}`} className={item.role}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="prompt-grid">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => onAsk(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const fadeLine = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function ambientDuration(personality) {
  const durations = {
    confident: 4,
    memory: 6,
    curiosity: 6,
    wisdom: 8,
    pride: 8,
    intelligent: 8,
    alive: 5.7,
    explorer: 0.4,
    powerful: 0.8,
  };

  return durations[personality] || 4;
}
