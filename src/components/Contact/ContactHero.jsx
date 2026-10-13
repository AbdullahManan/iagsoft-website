'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ContactHero.module.css';

export default function ContactHero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        `.${styles.eyebrow}`,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          `.${styles.headline}`,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.25'
        )
        .fromTo(
          `.${styles.tagline}`,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Contact Us</span>
        <h1 className={styles.headline}>We&apos;d Love to Hear From You</h1>
        <p className={styles.tagline}>
          Questions, project ideas, or support requests, our team <br /> typically
          responds within one business day.
        </p>
      </div>
    </section>
  );
}