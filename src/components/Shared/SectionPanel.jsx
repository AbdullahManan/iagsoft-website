import styles from './SectionPanel.module.css';

// simple deterministic string hash -> 0..1 float, same result every time for the same seed
function seededRandom(seed, salt = '') {
  const str = seed + salt;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

export default function SectionPanel({ children, className = '', seed = 'default' }) {
  const rLeftX = seededRandom(seed, 'lx');
  const rLeftY = seededRandom(seed, 'ly');
  const rRightX = seededRandom(seed, 'rx');
  const rRightY = seededRandom(seed, 'ry');
  const rLeftDur = 12 + seededRandom(seed, 'ld') * 10; // 12-22s
  const rRightDur = 12 + seededRandom(seed, 'rd') * 10;

  const glowStyle = {
    '--glow-left-top': `${-140 + rLeftY * 160}px`,
    '--glow-left-left': `${-120 + rLeftX * 200}px`,
    '--glow-right-bottom': `${-140 + rRightY * 160}px`,
    '--glow-right-right': `${-120 + rRightX * 200}px`,
    '--glow-left-duration': `${rLeftDur.toFixed(1)}s`,
    '--glow-right-duration': `${rRightDur.toFixed(1)}s`,
  };

  return (
    <div className={`${styles.panel} ${className}`} style={glowStyle}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}