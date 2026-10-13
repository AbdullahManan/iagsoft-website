'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './WhyChooseUs.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 35, suffix: '+', label: 'Years' },
  { value: 5000, suffix: '+', label: 'Projects' },
  { value: 4000, suffix: '+', label: 'Happy Clients' },
  { value: 25, suffix: '+', label: 'Tech Professionals' },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: STATS[i].value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val).toLocaleString();
          },
        });
      });

      gsap.fromTo(
        `.${styles.fadeIn}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} ${styles.fadeIn}`}>Why Choose IAG Soft</span>

        <p className={styles.statement}>
          <span className={styles.fadeIn}>Built on</span>{' '}
          <span className={styles.statBlock}>
            <span className={styles.statNumber}>
              <span ref={(el) => (numberRefs.current[0] = el)}>0</span>
              {STATS[0].suffix}
            </span>
            <span className={styles.statLabel}>{STATS[0].label}</span>
          </span>{' '}
          <span className={styles.fadeIn}>of experience,</span>{' '}
          <span className={styles.fadeIn}>delivering</span>{' '}
          <span className={styles.statBlock}>
            <span className={styles.statNumber}>
              <span ref={(el) => (numberRefs.current[1] = el)}>0</span>
              {STATS[1].suffix}
            </span>
            <span className={styles.statLabel}>{STATS[1].label}</span>
          </span>{' '}
          <span className={styles.fadeIn}>for</span>{' '}
          <span className={styles.statBlock}>
            <span className={styles.statNumber}>
              <span ref={(el) => (numberRefs.current[2] = el)}>0</span>
              {STATS[2].suffix}
            </span>
            <span className={styles.statLabel}>{STATS[2].label}</span>
          </span>{' '}
          <span className={styles.fadeIn}>backed by a team of</span>{' '}
          <span className={styles.statBlock}>
            <span className={styles.statNumber}>
              <span ref={(el) => (numberRefs.current[3] = el)}>0</span>
              {STATS[3].suffix}
            </span>
            <span className={styles.statLabel}>{STATS[3].label}</span>
          </span>{' '}
          <span className={styles.fadeIn}>driven by innovation.</span>
        </p>
      </div>
    </section>
  );
}