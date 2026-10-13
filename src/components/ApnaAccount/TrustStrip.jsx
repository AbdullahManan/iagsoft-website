'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './TrustStrip.module.css';

gsap.registerPlugin(ScrollTrigger);

const BADGES = [
  { label: 'FBR Integrated', desc: 'Direct API compliance' },
  { label: 'Real-Time Sync', desc: 'Stock & sales update instantly' },
  { label: 'Pakistan-First', desc: 'Built for local businesses' },
  { label: 'Since 1989', desc: 'Backed by IAG Soft' },
];

export default function TrustStrip() {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRefs.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.row}>
        {BADGES.map((b, i) => (
          <div
            key={b.label}
            className={styles.item}
            ref={(el) => (itemRefs.current[i] = el)}
          >
            <span className={styles.dot} />
            <div>
              <span className={styles.label}>{b.label}</span>
              <span className={styles.desc}>{b.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}