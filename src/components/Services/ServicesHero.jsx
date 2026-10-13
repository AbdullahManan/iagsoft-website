"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./ServicesHero.module.css";

export default function ServicesHero() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current.children,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.bgLines} />
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Our Services</span>
        <h1 ref={headlineRef} className={styles.headline}>
          <span className={styles.line}>Software Built Around</span>
          <span className={styles.line}>Your Business, Not</span>
          <span className={styles.line}>The Other Way Around</span>
        </h1>
      </div>
    </section>
  );
}