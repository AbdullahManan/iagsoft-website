
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      tl.fromTo(
        `.${styles.eyebrow}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55 }
      )
        .fromTo(
          `.${styles.headline}`,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.25'
        )
        .fromTo(
          `.${styles.subtext}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          `.${styles.ctaRow}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          `.${styles.mockupWrap}`,
          {
            opacity: 0,
            x: 100,
            y: 30,
            scale: 0.9,
            rotateY: -12,
            rotateX: 5,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.45'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />

      <div className={styles.inner}>

        {/* LEFT CONTENT */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>Apna Account</span>

          <h1 className={styles.headline}>
            One Platform.
            <br />
            Every Sale, Invoice,
            <br />
            and Stock Move,
            <br />
            All Handled in One Place.
          </h1>

          <p className={styles.subtext}>
            Apna Account is an all-in-one solution built for modern Pakistani
            businesses. From smart POS billing and real-time digital invoicing
            (FBR integrated) to complete trading management, handle your sales,
            purchases, and inventory with speed, accuracy, and full compliance.
          </p>

          
        </div>

        {/* RIGHT LAPTOP */}
        <div className={styles.mockupWrap}>
          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              <div className={styles.screenBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>

              <div className={styles.screenImageWrap}>
                <Image
                  src="/images/apna-account/dashboard.webp"
                  alt="Apna Account dashboard"
                  fill
                  sizes="(max-width: 700px) 100vw, 55vw"
                  className={styles.screenImage}
                  priority
                />
              </div>
            </div>

            <div className={styles.laptopBase} />
          </div>
        </div>

      </div>
    </section>
  );
}
