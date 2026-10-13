'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './CoreValues.module.css';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { name: 'Quality', desc: 'Every solution is built to a standard that lasts, not just one that ships.' },
  { name: 'Innovation', desc: 'We bring modern engineering practices to problems others solve the old way.' },
  { name: 'Integrity', desc: 'Honest estimates, honest timelines, and accountability when things go wrong.' },
  { name: 'Communication', desc: 'Clients are kept informed at every stage, not just at delivery.' },
  { name: 'Commitment', desc: 'We stay with a project and a client long after launch day.' },
  { name: 'Excellence', desc: 'Good enough is not a standard we design or build to.' },
];

export default function CoreValues() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        onComplete: () => {
          gsap.set(cardRefs.current, { clearProps: 'transform' });
        },
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Core Values</span>
        <h2 className={styles.heading}>What guides every project we deliver</h2>

        <div className={styles.grid}>
          {VALUES.map((v, i) => (
            <div
              key={v.name}
              className={styles.card}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.title}>{v.name}</h3>
              <p className={styles.desc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}