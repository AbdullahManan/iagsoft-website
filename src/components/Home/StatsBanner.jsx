"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StatsBanner.module.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 35, suffix: "+", label: "Years of Experience" },
  { value: 5000, suffix: "+", label: "Projects Done" },
  { value: 4000, suffix: "+", label: "Happy Clients" },
  { value: 25, suffix: "+", label: "Expert Members" },
];

function StatCounter({ value, suffix, trigger }) {
  const [display, setDisplay] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!trigger?.current) return;

    const counter = { value: 0 };

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger.current,
      start: "top 80%",
      once: true,

      onEnter: () => {
        if (hasStarted.current) return;

        hasStarted.current = true;

        gsap.to(counter, {
          value,
          duration: 2,
          ease: "power2.out",

          onUpdate: () => {
            setDisplay(Math.floor(counter.value));
          },

          onComplete: () => {
            setDisplay(value);
          },
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [value, trigger]);

  return (
    <strong className={styles.statValue}>
      {display.toLocaleString()}
      {suffix}
    </strong>
  );
}

export default function StatsBanner() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        {
          autoAlpha: 0,
          y: 40,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={cardRef} className={styles.card}>
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />

        {stats.map((stat) => (
          <div key={stat.label} className={styles.statItem}>
            <StatCounter
              value={stat.value}
              suffix={stat.suffix}
              trigger={sectionRef}
            />

            <span className={styles.statLabel}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}