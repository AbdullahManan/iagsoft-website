'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Mission.module.css';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  { label: 'Automate', desc: 'Streamlined processes that remove manual friction' },
  { label: 'Optimize', desc: 'Operational efficiency built into every system' },
  { label: 'Elevate', desc: 'Smarter use of technology across the business' },
];

const SENTENCE =
  'IAG Soft develops robust IoT solutions that connect devices, collect real-time data, and improve business operations through intelligent automation. We integrate sensors, machines, software, ERP systems, applications, and cloud technologies to deliver greater visibility, efficiency, and control.';

export default function Mission() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const orbRef = useRef(null);
  const pillarRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll(`.${styles.word}`);

      gsap.set(words, { opacity: 0.15 });

      gsap.to(words, {
        opacity: 1,
        stagger: 0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 15%',
          scrub: 0.5,
        },
      });

      gsap.fromTo(
        orbRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      gsap.to(`.${styles.orbRing}`, {
        rotation: 360,
        duration: 14,
        repeat: -1,
        ease: 'none',
      });
      gsap.to(`.${styles.orbRingOuter}`, {
        rotation: -360,
        duration: 22,
        repeat: -1,
        ease: 'none',
      });
      // particles ride along with their parent ring's rotation automatically
      // since they're positioned as children of the ring elements

      pillarRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 40%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />

      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.orbWrap}>
            <div className={styles.orb} ref={orbRef}>
              <div className={styles.orbCore} />
              <div className={styles.orbRing}>
                <span className={styles.particle} />
              </div>
              <div className={styles.orbRingOuter}>
                <span className={styles.particle} />
                <span className={styles.particleAlt} />
              </div>
            </div>
          </div>

          <div className={styles.pillars}>
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                className={styles.pillar}
                ref={(el) => (pillarRefs.current[i] = el)}
              >
                <span className={styles.pillarIndex}>0{i + 1}</span>
                <h3 className={styles.pillarLabel}>{p.label}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.eyebrow}>Our Mission</span>
          <p className={styles.text} ref={textRef}>
            {SENTENCE.split(' ').map((word, i) => (
              <span key={i} className={styles.word}>
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}