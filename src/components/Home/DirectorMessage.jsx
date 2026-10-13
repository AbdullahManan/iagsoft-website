"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DirectorMessage.module.css";

gsap.registerPlugin(ScrollTrigger);

const QUOTE_TEXT = "Add your quote here";
const QUOTE_AUTHOR = "Director Name, Title";

export default function DirectorMessage() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const quoteRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoWrapRef.current,
        { autoAlpha: 0, scale: 0.95, y: 40 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        quoteRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => {
    setPlaying(true);
    // Autoplay once mounted, since this only fires on user click
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>A Message From Our Director</span>
        <h2 className={styles.headline}>
          35 Years Of Building Trust
          <br />
          Through Technology
        </h2>

        <div className={styles.videoOuter}>
          <div ref={videoWrapRef} className={styles.videoWrap}>
            {!playing ? (
              <button className={styles.posterBtn} onClick={handlePlay}>
                <div className={styles.poster} />
                <span className={styles.playCircle}>▶</span>
              </button>
            ) : (
              <video
                ref={videoRef}
                className={styles.video}
                controls
                src="/videos/director-message.mp4"
              />
            )}

            <div ref={quoteRef} className={styles.quoteCard}>
              <p className={styles.quoteText}>&ldquo;{QUOTE_TEXT}&rdquo;</p>
              <span className={styles.quoteAuthor}>{QUOTE_AUTHOR}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}