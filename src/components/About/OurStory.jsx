"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OurStory.module.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "1989", label: "Founded in Multan, Pakistan" },
  { year: "2000s", label: "Expanded into ERP & enterprise software" },
  { year: "2010s", label: "Grew nationwide through franchises & affiliates" },
  { year: "Today", label: "5000+ projects, 4000+ clients, 25+ experts" },
];

export default function OurStory() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        timelineRef.current.children,
        { autoAlpha: 0, x: 30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div ref={textRef} className={styles.textCol}>
          <span className={styles.eyebrow}>Our Story</span>
          <h2 className={styles.headline}>From a Small Firm to a Trusted Technology Partner</h2>
          <p className={styles.paragraph}>
            IAG Soft was founded in 1989 with the vision of revolutionizing
            software development through innovation and providing
            high-quality software solutions to businesses.
          </p>
          <p className={styles.paragraph}>
            Over the years, the company has evolved from a small software
            firm into an established technology provider offering standard
            and customized software solutions across multiple industries.
          </p>
          <p className={styles.paragraph}>
            Today, IAG Soft focuses on helping organizations automate
            business processes, improve operational efficiency, and adopt
            modern technology — backed by a team of 25+ full-time IT experts
            serving clients nationwide.
          </p>
        </div>

        <div ref={timelineRef} className={styles.timeline}>
          {milestones.map((m, i) => (
            <div key={m.year} className={styles.milestone}>
              <div className={styles.milestoneDot} />
              {i < milestones.length - 1 && <div className={styles.milestoneLine} />}
              <div className={styles.milestoneContent}>
                <strong>{m.year}</strong>
                <span>{m.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}