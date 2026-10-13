"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./ServiceHero.module.css";

export default function ServiceHero({ title, tagline, image, color, cardColor }) {
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  const imageRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        visualRef.current,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
      );

      gsap.to(imageRef.current, {
        y: -16,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(imageRef.current, {
      rotateY: x * 14,
      rotateX: -y * 14,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.bgLines} />

      <div className={styles.outer}>
        <div className={styles.card} style={{ background: cardColor }}>
          <div className={styles.cardInner}>
            <div ref={contentRef} className={styles.content}>
              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/Services">Services</Link>
                <span>/</span>
                <span className={styles.current}>{title}</span>
              </div>

              <h1 className={styles.title}>{title}</h1>
              <p className={styles.tagline}>{tagline}</p>

              <div className={styles.ctaRow}>
                <Link href="/Contact" className={styles.ctaPrimary} style={{ background: color }}>
                  Get Started
                </Link>
                
              </div>
            </div>

            <div
              ref={wrapRef}
              className={styles.visualWrap}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div ref={visualRef} className={styles.visual}>
                <div className={styles.shadow} />
                <div ref={imageRef} className={styles.imageFloat}>
                  <Image
                    src={image}
                    alt={title}
                    width={480}
                    height={480}
                    className={styles.image}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}