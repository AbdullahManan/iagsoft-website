"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import styles from "./Hero.module.css";

export default function Hero({ ready = true }) {
  const pillsRef = useRef(null);
  const headlineRef = useRef(null);
  const readMoreRef = useRef(null);
  const panelRef = useRef(null);
  const armRef = useRef(null);
  const phoneRef = useRef(null);
  const iotRef = useRef(null);
  const linesRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(pillsRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(
          headlineRef.current?.children || [],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(readMoreRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3")
        .fromTo(panelRef.current, { autoAlpha: 0, y: 20, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, "-=0.6")
        .fromTo(armRef.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(phoneRef.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(iotRef.current, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(linesRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.4");
    });

    return () => ctx.revert();
  }, [ready]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.bgLines} />

      <div className={styles.canvas}>
        <div className={styles.heroBody}>
          <div className={styles.left}>
          

            <h1 ref={headlineRef} className={styles.headline}>
              <span className={styles.headlineLine}>Intelligent Software</span>
              <span className={styles.headlineLine}>Solutions For Modern</span>
              <span className={styles.headlineLine}>Business</span>
            </h1>

            <Link href="/About" ref={readMoreRef} className={styles.readMore}>
              Read Our Story <span>→</span>
            </Link>
          </div>

          <div className={styles.right}>
  <svg className={styles.scene} viewBox="0 0 600 460">
    <defs>
      <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* ---------- Symmetrical Lowered Connecting Lines ---------- */}
    <g ref={linesRef}>
      <path id="lineArm" className={styles.connectorPath} d="M 120 225 C 120 255, 170 270, 220 270" />
      <path id="lineIot" className={styles.connectorPath} d="M 300 225 L 300 270" />
      <path id="linePhone" className={styles.connectorPath} d="M 480 225 C 480 255, 430 270, 380 270" />

      <circle r="3.5" className={styles.pulseDot}>
        <animateMotion dur="2.4s" repeatCount="indefinite" rotate="auto">
          <mpath href="#lineArm" />
        </animateMotion>
      </circle>
      <circle r="3.5" className={styles.pulseDot}>
        <animateMotion dur="2.4s" begin="0.4s" repeatCount="indefinite" rotate="auto">
          <mpath href="#lineIot" />
        </animateMotion>
      </circle>
      <circle r="3.5" className={styles.pulseDot}>
        <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite" rotate="auto">
          <mpath href="#linePhone" />
        </animateMotion>
      </circle>
    </g>

    {/* ---------- Device #1 ---------- */}
    <g ref={armRef} className={styles.floatingDevice}>
      <g transform="translate(120, 90)" className={styles.svgBadgeGroup}>
        <rect x="-48" y="-11" width="96" height="22" rx="11" className={styles.svgBadgeBg} />
        <circle cx="-34" cy="0" r="2.5" className={styles.statusDotGreen} />
        <text x="3" y="3.5" className={styles.svgBadgeText}>IoT Device #1</text>
      </g>

      <g className={styles.wifiGroup} transform="translate(144, 155)">
        <circle cx="0" cy="0" r="1.5" className={styles.wifiPoint} />
        <path d="M -4 -3 A 5 5 0 0 1 4 -3" className={`${styles.wifiArc} ${styles.wifiArcInner}`} />
        <path d="M -7 -6 A 9 9 0 0 1 7 -6" className={`${styles.wifiArc} ${styles.wifiArcOuter}`} />
      </g>

      <g transform="translate(100, 155)">
        <rect x="0" y="60" width="40" height="8" rx="2" className={styles.iconFillDark} />
        <line x1="20" y1="60" x2="20" y2="35" className={styles.iconStroke} strokeWidth="4" strokeLinecap="round" />
        <line x1="20" y1="35" x2="44" y2="20" className={styles.iconStroke} strokeWidth="4" strokeLinecap="round" />
        <line x1="44" y1="20" x2="36" y2="38" className={styles.iconStroke} strokeWidth="3" strokeLinecap="round" />
        <circle cx="20" cy="35" r="2.5" className={styles.joint} />
        <circle cx="44" cy="20" r="2.5" className={styles.joint} />
      </g>
    </g>

    {/* ---------- Device #2 ---------- */}
    <g ref={iotRef} className={styles.floatingDevice} style={{ animationDelay: "0.8s" }}>
      <g transform="translate(300, 90)" className={styles.svgBadgeGroup}>
        <rect x="-48" y="-11" width="96" height="22" rx="11" className={styles.svgBadgeBg} />
        <circle cx="-34" cy="0" r="2.5" className={styles.statusDotGreen} />
        <text x="3" y="3.5" className={styles.svgBadgeText}>IoT Device #2</text>
      </g>

      <g className={styles.wifiGroup} transform="translate(300, 155)">
        <circle cx="0" cy="0" r="1.5" className={styles.wifiPoint} />
        <path d="M -4 -3 A 5 5 0 0 1 4 -3" className={`${styles.wifiArc} ${styles.wifiArcInner}`} />
        <path d="M -7 -6 A 9 9 0 0 1 7 -6" className={`${styles.wifiArc} ${styles.wifiArcOuter}`} />
      </g>

      <g transform="translate(282, 170)">
        <rect x="0" y="20" width="36" height="30" rx="6" className={styles.iconFillDark} />
        <circle cx="18" cy="35" r="4" className={styles.iconFillLight} />
        <line x1="18" y1="20" x2="18" y2="-2" className={styles.iconStroke} strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>

    {/* ---------- Device #3 ---------- */}
    <g ref={phoneRef} className={styles.floatingDevice} style={{ animationDelay: "0.4s" }}>
      <g transform="translate(480, 90)" className={styles.svgBadgeGroup}>
        <rect x="-48" y="-11" width="96" height="22" rx="11" className={styles.svgBadgeBg} />
        <circle cx="-34" cy="0" r="2.5" className={styles.statusDotGreen} />
        <text x="3" y="3.5" className={styles.svgBadgeText}>IoT Device #3</text>
      </g>

      <g className={styles.wifiGroup} transform="translate(480, 145)">
        <circle cx="0" cy="0" r="1.5" className={styles.wifiPoint} />
        <path d="M -4 -3 A 5 5 0 0 1 4 -3" className={`${styles.wifiArc} ${styles.wifiArcInner}`} />
        <path d="M -7 -6 A 9 9 0 0 1 7 -6" className={`${styles.wifiArc} ${styles.wifiArcOuter}`} />
      </g>

      <g transform="translate(463, 160)">
        <rect x="0" y="0" width="34" height="60" rx="7" className={styles.iconFillDark} />
        <rect x="4" y="6" width="26" height="42" rx="3" className={styles.phoneScreenRect} />
        <rect x="13" y="52" width="8" height="2" rx="1" className={styles.iconFillLight} />
      </g>
    </g>
  </svg>

  {/* Central Hub Panel - Lowered Position */}
  <div ref={panelRef} className={styles.panel} style={{ top: "262px" }}>
    <div className={styles.panelGlow} />

    <span className={`${styles.portNode} ${styles.portLeft}`} />
    <span className={`${styles.portNode} ${styles.portCenter}`} />
    <span className={`${styles.portNode} ${styles.portRight}`} />

    <div className={styles.panelHeader}>
      <div className={styles.gatewayTitle}>
        <span className={styles.livePulse} />
        IAG SOFT
      </div>
<span className={styles.nodeCount}>Real-time Sync</span>
    </div>

   <div className={styles.panelScreen}>
      <div className={styles.bars}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <span key={i} className={styles.bar} />
        ))}
      </div>
    </div>

    <div className={styles.hubFooter}>
      <span className={styles.iotSolutionsBadge}>IoT Solutions</span>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}