'use client';

import gsap from 'gsap';
import styles from './ProductHero.module.css';
import { useEffect, useRef, Fragment } from 'react';
export default function ProductHero({
  eyebrow = 'Our Products',
  headlineLines = ['One Company. A Full Suite', 'of Business Software.'],
  tagline = "From enterprise-wide ERP to specialized weighbridge and toll systems, every product is built and supported by IAG Soft — the same team behind 35+ years of software delivery.",
  stats = [
    { number: '11', label: 'Products & Solutions' },
    { number: '35+', label: 'Years in Business' },
    { number: '5000+', label: 'Projects Delivered' },
  ],
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        `.${styles.eyebrow}`,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          `.${styles.headline}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          `.${styles.tagline}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          `.${styles.statsRow}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <span className={styles.eyebrow}>{eyebrow}</span>

        <h1 className={styles.headline}>
          {headlineLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className={styles.tagline}>{tagline}</p>

        {stats.length > 0 && (
          <div className={styles.statsRow}>
            {stats.map((s, i) => (
              <Fragment key={s.label}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{s.number}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
                {i < stats.length - 1 && <div className={styles.statDivider} />}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}