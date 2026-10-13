'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import SectionPanel from '@/components/shared/SectionPanel';
import styles from './ProductTemplate.module.css';
import { useEffect, useRef, useState, Fragment } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductTemplate({ data }) {
  const rootRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0);

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
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const hasGallery = data.gallery && data.gallery.length > 0;

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <SectionPanel seed={`${data.slug}-hero`}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>{data.eyebrow}</span>
          <h1 className={styles.heroTitle}>{data.title}</h1>
          <p className={styles.heroTagline}>{data.tagline}</p>
          <a href="/Contact" className={styles.heroCta}>
            Get Started
          </a>
        </section>
      </SectionPanel>

      {/* PRODUCT DETAIL / MEDIA */}
      <SectionPanel seed={`${data.slug}-detail`}>
        <section className={styles.detail}>
          <div className={styles.detailGrid}>
            <div className={`${styles.detailText} ${styles.fadeIn}`}>
              <span className={styles.sectionEyebrow}>Overview</span>
              <p className={styles.overviewParagraph}>{data.overview}</p>
            </div>

            <div className={`${styles.mediaWrap} ${styles.fadeIn}`}>
              {data.video ? (
                <div className={styles.videoFrame}>
                  <video src={data.video} controls className={styles.video} />
                </div>
              ) : hasGallery ? (
                <>
                  <div className={styles.mainImageFrame}>
                    <Image
                      src={data.gallery[activeImage]}
                      alt={`${data.title} screenshot ${activeImage + 1}`}
                      fill
                      className={styles.mainImage}
                      sizes="(max-width: 700px) 100vw, 600px"
                    />
                  </div>
                  {data.gallery.length > 1 && (
                    <div className={styles.thumbRow}>
                      {data.gallery.map((img, i) => (
                        <button
                          key={img}
                          type="button"
                          className={`${styles.thumbBtn} ${activeImage === i ? styles.thumbActive : ''}`}
                          onClick={() => setActiveImage(i)}
                          aria-label={`View screenshot ${i + 1}`}
                        >
                          <Image src={img} alt="" fill className={styles.thumbImage} sizes="80px" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className={styles.placeholderFrame} />
              )}
            </div>
          </div>
        </section>
      </SectionPanel>

      {/* PROBLEM / SOLUTION GRID */}
        <SectionPanel seed={`${data.slug}-problems`}>
        <section className={styles.problems}>
            <span className={styles.sectionEyebrow}>Problems We Solve</span>
            <h2 className={styles.sectionHeading}>Where this product makes the difference</h2>

            <div className={styles.psGrid}>
            <div className={styles.psColHeader}>
                <span className={styles.psColLabel}>Problem</span>
            </div>
            <div className={styles.psColHeader}>
                <span className={styles.psColLabel}>Solution</span>
            </div>

            {data.problems.map((p, i) => (
                <Fragment key={i}>
                <div className={`${styles.psCell} ${styles.psProblem} ${styles.fadeIn}`}>
                    {p.problem}
                </div>
                <div className={`${styles.psCell} ${styles.psSolution} ${styles.fadeIn}`}>
                    {p.solution}
                </div>
                </Fragment>
            ))}
            </div>

            {/* Mobile-only: each pair as one card instead of the grid above */}
            <div className={styles.psCards}>
            {data.problems.map((p, i) => (
                <div key={i} className={`${styles.psCard} ${styles.fadeIn}`}>
                <div className={styles.psCardRow}>
                    <span className={styles.psCardTag}>Problem</span>
                    <p className={styles.psCardText}>{p.problem}</p>
                </div>
                <div className={styles.psCardDivider} />
                <div className={styles.psCardRow}>
                    <span className={`${styles.psCardTag} ${styles.psCardTagSolution}`}>Solution</span>
                    <p className={styles.psCardText}>{p.solution}</p>
                </div>
                </div>
            ))}
            </div>
        </section>
        </SectionPanel>

      
    </div>
  );
}