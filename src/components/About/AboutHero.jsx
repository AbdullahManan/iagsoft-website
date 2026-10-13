"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 })
        .fromTo(
          headlineRef.current.children,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.2"
        )
        .fromTo(subtextRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
        .fromTo(badgeRef.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, "-=0.4");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.bgLines} />

      <div className={styles.canvas}>
        <span ref={eyebrowRef} className={styles.eyebrow}>
          About IAG Soft
        </span>

        <h1 ref={headlineRef} className={styles.headline}>
          <span className={styles.line}>Turning Business Challenges</span>
          <span className={styles.line}>Into Intelligent Software Solutions</span>
        </h1>

       <div className={styles.contentRow}>
            <p ref={subtextRef} className={styles.subtext}>
                A private software company based in the city of Multan, Pakistan. Established in 1989, we
                focus on developing innovative software solutions for businesses
                across industries, through technology, automation, and innovation.
            </p>

            <div ref={badgeRef} className={styles.sinceBadge}>
                <span className={styles.sinceLabel}>Established</span>
                <strong className={styles.sinceValue}>1989</strong>
            </div>
            </div>
      </div>
    </section>
  );
}