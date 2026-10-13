'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SectionPanel from '@/components/shared/SectionPanel';
import styles from './ServiceTemplate.module.css';
import ServiceHero from './ServiceHero';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceTemplate({ data }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(`.${styles.fadeIn}`).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>

      {/* HERO */}
      <ServiceHero
        title={data.title}
        tagline={data.tagline}
        image={data.image}
        color={data.color}
        cardColor={data.cardColor}

      />

      {/* OVERVIEW */}
      <SectionPanel seed={`${data.slug}-overview`}>
        <section className={styles.overview}>
          <div className={styles.overviewGrid}>
            <div className={`${styles.overviewText} ${styles.fadeIn}`}>
              <span className={styles.sectionEyebrow}>Overview</span>

              <p className={styles.overviewParagraph}>
                {data.overview}
              </p>
            </div>

            <div className={`${styles.overviewHighlight} ${styles.fadeIn}`}>
              <span className={styles.highlightNumber}>35+</span>

              <span className={styles.highlightLabel}>
                Years delivering software solutions
              </span>
            </div>
          </div>
        </section>
      </SectionPanel>

      {/* PROBLEMS SOLVED */}
      <SectionPanel seed={`${data.slug}-problems`}>
        <section className={styles.problems}>
          <span className={styles.sectionEyebrow}>
            Problems We Solve
          </span>

          <h2 className={styles.sectionHeading}>
            Where things typically go wrong
          </h2>

          <div className={styles.problemGrid}>
            {data.problems.map((p, i) => (
              <div
                key={i}
                className={`${styles.problemCard} ${styles.fadeIn}`}
              >
                <span className={styles.tagProblem}>
                  Problem
                </span>

                <p className={styles.problemText}>
                  {p.problem}
                </p>

                <span className={styles.tagSolution}>
                  Solution
                </span>

                <p className={styles.solutionText}>
                  {p.solution}
                </p>
              </div>
            ))}
          </div>
        </section>
      </SectionPanel>

      {/* FEATURES */}
      <SectionPanel seed={`${data.slug}-features`}>
        <section className={styles.features}>
          <span className={styles.sectionEyebrow}>
            What&apos;s Included
          </span>

          <h2 className={styles.sectionHeading}>
            Everything covered, end to end
          </h2>

          <div className={styles.featureGrid}>
            {data.features.map((f, i) => (
              <div
                key={i}
                className={`${styles.featureCard} ${styles.fadeIn}`}
              >
                <h3 className={styles.featureTitle}>
                  {f.title}
                </h3>

                <p className={styles.featureDesc}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </SectionPanel>

      {/* PROCESS */}
      <SectionPanel seed={`${data.slug}-process`}>
        <section className={styles.process}>
          <span className={styles.sectionEyebrow}>
            Our Process
          </span>

          <h2 className={styles.sectionHeading}>
            How we deliver this service
          </h2>

          <div className={styles.processRow}>
            {data.process.map((step, i) => (
              <div
                key={i}
                className={`${styles.processStep} ${styles.fadeIn}`}
              >
                <span className={styles.processIndex}>
                  0{i + 1}
                </span>

                <h3 className={styles.processTitle}>
                  {step.title}
                </h3>

                <p className={styles.processDesc}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </SectionPanel>

      

    </div>
  );
}