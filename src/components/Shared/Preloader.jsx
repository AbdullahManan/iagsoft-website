"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const preloaderRef = useRef(null);
  const revealRef = useRef(null);
  const percentageRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const preloader = preloaderRef.current;

    if (!preloader) {
      return;
    }

    const navigation = performance.getEntriesByType("navigation")[0];
    const isReload = navigation?.type === "reload";

    /*
     * A browser refresh should always show the preloader again.
     */
    if (isReload) {
      sessionStorage.removeItem("hasSeenPreloader");
    }

    /*
     * If the preloader was already shown during this session,
     * hide it immediately and don't run the animation.
     */
    if (sessionStorage.getItem("hasSeenPreloader") === "true") {
      preloader.style.display = "none";
      return;
    }

    /*
     * Make sure the initial state is ready before animation starts.
     */
    gsap.set(revealRef.current, {
      clipPath: "inset(0 100% 0 0)",
    });

    gsap.set(percentageRef.current, {
      textContent: "0%",
    });

    const progress = {
      value: 0,
    };

    /*
     * Animate the logo and percentage together.
     *
     * The percentage is updated directly in the DOM instead
     * of causing a React re-render on every frame.
     */
    timelineRef.current = gsap.to(progress, {
      value: 100,
      duration: 2.6,
      ease: "power2.inOut",

      onUpdate: () => {
        const value = Math.floor(progress.value);

        if (percentageRef.current) {
          percentageRef.current.textContent = `${value}%`;
        }

        if (revealRef.current) {
          gsap.set(revealRef.current, {
            clipPath: `inset(0 ${100 - progress.value}% 0 0)`,
          });
        }
      },

      onComplete: () => {
        if (percentageRef.current) {
          percentageRef.current.textContent = "100%";
        }

        sessionStorage.setItem("hasSeenPreloader", "true");

        /*
         * Small pause after reaching 100%, then fade out.
         */
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.25,

          onComplete: () => {
            preloader.style.display = "none";
          },
        });
      },
    });

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <div ref={preloaderRef} className={styles.preloader}>
      <div className={styles.glow} />

      <div className={styles.logoWrap}>
        <Image
          src="/logos/iag-logo.webp"
          alt=""
          width={500}
          height={220}
          className={styles.logoGhost}
          priority
        />

        <div ref={revealRef} className={styles.logoReveal}>
          <Image
            src="/logos/iag-logo.webp"
            alt="IAG Soft"
            width={500}
            height={220}
            className={styles.logoSharp}
            priority
          />
        </div>
      </div>

      <span ref={percentageRef} className={styles.percentage}>
        0%
      </span>
    </div>
  );
}