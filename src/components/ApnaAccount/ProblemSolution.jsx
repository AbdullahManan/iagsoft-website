"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProblemSolution.module.css";

gsap.registerPlugin(ScrollTrigger);

const pains = [
  { title: "Invoices are still handwritten or built in Excel.", desc: "Every sale becomes an FBR-compliant digital invoice automatically, no manual entry." },
  { title: "Shelf stock never matches the register.", desc: "POS sales, purchases, and trading records all update the same stock count in real time." },
  { title: "Tax season means rebuilding numbers from paper.", desc: "Reports, ledgers, and FBR submissions are tracked as you sell, not reconstructed later." },
  { title: "Switching software takes weeks and a technician.", desc: "Apna Account launches in minutes, with sandbox testing before anything goes live." },
  { title: "Every branch keeps its own separate records.", desc: "Multi-location businesses get one consolidated view of sales, stock, and accounts." },
  { title: "Compliance software is priced for enterprises.", desc: "Built and priced for single-counter shops, scaling as the business grows." },
];

export default function ProblemSolution() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
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
        <div className={styles.topRow}>
          <div className={styles.topLeft}>
            <span className={styles.eyebrow}>The Problem</span>
            <h2 className={styles.headline}>
              Business software built before FBR compliance mattered.
            </h2>
          </div>

          <div className={styles.topRight}>
            <p className={styles.intro}>
              Digital invoicing came later, so it got bolted on. Inventory
              came later, so it lives in a separate spreadsheet somebody
              reconciles by hand.
            </p>
            <div className={styles.positionCallout}>
              <span className={styles.positionLabel}>Apna Account&apos;s Position</span>
              <p>
                Build the counter, the invoice, and the ledger as one system
                from the start — so billing, stock, and tax compliance were
                never separate problems to reconcile.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {pains.map((item, i) => (
            <div key={item.title} ref={(el) => (cardsRef.current[i] = el)} className={styles.card}>
              <span className={styles.tagRow}>
                <span className={styles.tag}>Problem</span>
                <span className={styles.tag2}>& Solution</span>
                </span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <div className={styles.divider} />
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}