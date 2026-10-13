'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Industries.module.css';

gsap.registerPlugin(ScrollTrigger);

const INDUSTRIES = [
  {
    id: 'grocery',
    name: 'Grocery',
    tagline: 'High-volume counters, zero slowdowns',
    intro: 'Grocery stores run on speed and thin margins, where every slow bill or missed stock update costs real money.',
    problems: [
      'Long checkout lines from slow manual billing',
      'Stock counts drift out of sync during busy hours',
      'No real-time view of daily sales totals',
      'Expired or near-expiry items going unnoticed',
      'Multiple counters with no unified sales record',
      'Cash-only limits during peak footfall',
    ],
    solution: 'Barcode billing, auto stock sync on every sale, and live reporting keep every counter accurate and every day visible in real time.',
    stat: 'Trusted by grocery retailers across Multan and beyond', // placeholder until real number provided
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    tagline: 'Every batch and expiry, accounted for',
    intro: 'Pharmacies carry the added weight of regulatory accuracy, where a missed expiry or batch error is not just a loss, it is a risk.',
    problems: [
      'Expired stock going unnoticed until it is too late',
      'Batch-wise inventory tracked manually and inconsistently',
      'Difficulty matching sales to specific supplier batches',
      'No alerts for low stock on critical medicines',
      'Manual price updates across large product catalogs',
      'Limited visibility into slow-moving vs. fast-moving stock',
    ],
    solution: 'Batch and expiry tracking built into every sale, with real-time alerts so nothing critical slips through unnoticed.',
    stat: 'Supporting pharmacies with accurate, compliant inventory tracking',
  },
  {
    id: 'garments',
    name: 'Garments',
    tagline: 'Every size and variant, tracked precisely',
    intro: 'Garments retail lives and dies by variant accuracy — size, color, and season all compound the complexity of tracking stock.',
    problems: [
      'Size and variant stock impossible to track by hand',
      'Seasonal sales trends invisible without proper reporting',
      'Returns and exchanges create inventory mismatches',
      'No easy way to identify slow-selling variants',
      'Multiple branches with disconnected stock visibility',
      'End-of-season stock reconciliation takes days',
    ],
    solution: 'Variant-level inventory tracking and seasonal sales reporting turn size and stock chaos into a clear, manageable system.',
    stat: 'Helping garment retailers manage stock across every size and season',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    tagline: 'Serials, warranties, and invoices aligned',
    intro: 'Electronics retail carries high-value risk, where every unit needs to be traceable from sale to warranty claim.',
    problems: [
      'Serial numbers not linked to sales or warranty records',
      'Warranty disputes with no invoice trail to fall back on',
      'High-value stock at risk without accurate tracking',
      'Difficulty tracking supplier warranty periods per item',
      'No fast way to look up a past sale during a claim',
      'Manual invoice matching slows down customer service',
    ],
    solution: 'Every sale links serial numbers to invoices automatically, so warranty claims and stock audits take seconds, not searches.',
    stat: 'Protecting high-value inventory for electronics retailers',
  },
  {
    id: 'wholesale',
    name: 'Wholesale',
    tagline: 'Bulk pricing and ledgers, fully managed',
    intro: 'Wholesale trade runs on trust and running balances, where a single missed entry in a ledger can throw off an entire account.',
    problems: [
      'Bulk and trade pricing handled manually, prone to error',
      'Customer ledgers scattered across registers and notebooks',
      'No unified view of purchases, sales, and outstanding dues',
      'Difficult to track partial payments across large orders',
      'No visibility into which clients are near their credit limit',
      'Reconciling monthly accounts takes significant manual effort',
    ],
    solution: 'Automated ledgers, credit tracking, and full purchase-to-payment visibility keep every trade account accurate and current.',
    stat: 'Managing accounts for wholesale traders with full ledger accuracy',
  },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(`.${styles.fadeIn}`),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [active]);

  const current = INDUSTRIES[active];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} ${styles.fadeIn}`}>Industries We Serve</span>
        <h2 className={`${styles.heading} ${styles.fadeIn}`}>
        Built for the way your industry actually works. <br />
        Trusted by 1,000+ clients and growing.
        </h2>

        <div className={`${styles.layout} ${styles.fadeIn}`}>
          <div className={styles.tabList}>
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                type="button"
                className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
                onClick={() => setActive(i)}
              >
                <span className={styles.tabIndicator} />
                {ind.name}
              </button>
            ))}
          </div>

          <div className={styles.panelWrap}>
            <div className={styles.panelGlow} />
            <div className={styles.panel} ref={panelRef} key={current.id}>
              <span className={styles.panelTag}>{current.name}</span>
              <h3 className={styles.panelTagline}>{current.tagline}</h3>
              <p className={styles.panelIntro}>{current.intro}</p>

              <ul className={styles.problemList}>
                {current.problems.map((p) => (
                  <li key={p} className={styles.problemItem}>
                    <span className={styles.problemDot} />
                    {p}
                  </li>
                ))}
              </ul>

              <div className={styles.solutionBox}>
                <span className={styles.solutionLabel}>How Apna Account Solves It</span>
                <p className={styles.solutionText}>{current.solution}</p>
              </div>

              <p className={styles.statLine}>{current.stat}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}