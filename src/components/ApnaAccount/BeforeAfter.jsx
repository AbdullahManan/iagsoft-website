"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BeforeAfter.module.css";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { moment: "Opening", before: "Check register, stock sheet, and ledger separately.", after: "One dashboard, already reconciled overnight." },
  { moment: "Mid-Day", before: "Call another branch to check stock.", after: "See stock across every branch instantly." },
  { moment: "Billing", before: "Write invoices by hand or in Excel.", after: "Every sale becomes an FBR invoice automatically." },
  { moment: "Closing", before: "Count the drawer against a handwritten log.", after: "Sales and cash reconcile against the system total." },
  { moment: "Month End", before: "Rebuild tax numbers from paper receipts.", after: "Tax reports are already accurate and exportable." },
];

export default function BeforeAfter() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        rowsRef.current,
        { autoAlpha: 0, x: -16 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.45,
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
      <div className={styles.glow} />
      <div className={styles.inner}>
        <span className={styles.eyebrow}>What Actually Changes</span>
        <h2 className={styles.headline}>A Retailer&apos;s Week, Before and After</h2>

        <div ref={panelRef} className={styles.panel}>
          <div className={styles.colHeader}>
            <span className={styles.momentHeaderSpacer} />
            <span className={styles.beforeHeader}>
              <span className={styles.iconX}>✕</span> Before
            </span>
            <span className={styles.afterHeader}>
              <span className={styles.iconCheck}>✓</span> With Apna Account
            </span>
          </div>

          {rows.map((row, i) => (
            <div
              key={row.moment}
              ref={(el) => (rowsRef.current[i] = el)}
              className={styles.row}
            >
              <span className={styles.moment}>{row.moment}</span>
              <span className={styles.before}>{row.before}</span>
              <span className={styles.after}>{row.after}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}   