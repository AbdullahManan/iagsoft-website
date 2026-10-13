"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ConnectedFlow.module.css";

gsap.registerPlugin(ScrollTrigger);

const nodes = [
  {
    id: "pos",
    title: "POS",
    desc: "Every counter sale is captured instantly at checkout.",
  },
  {
    id: "invoicing",
    title: "Digital Invoicing",
    desc: "The sale becomes an FBR-compliant invoice automatically.",
  },
  {
    id: "trading",
    title: "Trading Software",
    desc: "Stock, ledgers, and reports update from the same transaction.",
  },
];

export default function ConnectedFlow() {
  const sectionRef = useRef(null);
  const nodesRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodesRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>One Connected System</span>
        <h2 className={styles.headline}>
          Three tools. One transaction. Zero reconciling.
        </h2>
        <p className={styles.subtext}>
          A sale at the counter doesn&apos;t sit in isolation — it flows
          through billing, compliance, and inventory automatically, so
          nothing needs to be manually matched up at the end of the day.
        </p>

        <div className={styles.flow}>
          <div ref={lineRef} className={styles.line} />

          {nodes.map((node, i) => (
            <div key={node.id} ref={(el) => (nodesRef.current[i] = el)} className={styles.node}>
              <div className={styles.nodeCircle}>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={styles.nodeTitle}>{node.title}</h3>
              <p className={styles.nodeDesc}>{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}