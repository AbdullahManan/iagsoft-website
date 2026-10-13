'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PRODUCTS } from '@/data/productList';
import styles from './ProductSelector.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProductSelector({ items = PRODUCTS }) {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const tabListRef = useRef(null);
  const [active, setActive] = useState(0);

  const dragState = useRef({ down: false, startX: 0, scrollStart: 0, moved: false });

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

  const scrollByAmount = (amount) => {
    tabListRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handlePointerDown = (e) => {
    dragState.current = {
      down: true,
      startX: e.clientX,
      scrollStart: tabListRef.current.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (e) => {
    const d = dragState.current;
    if (!d.down) return;
    const delta = e.clientX - d.startX;
    if (Math.abs(delta) > 5) d.moved = true;
    tabListRef.current.scrollLeft = d.scrollStart - delta;
  };

  const handlePointerUp = () => {
    dragState.current.down = false;
  };

  const handleTabClick = (index) => {
    if (dragState.current.moved) return;
    setActive(index);
  };

  const current = items[active];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} ${styles.fadeIn}`}>Our Products</span>
        <h2 className={`${styles.heading} ${styles.fadeIn}`}>
          Explore every solution we build
        </h2>

        <div className={`${styles.layout} ${styles.fadeIn}`}>
          <div className={styles.tabListWrap}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => scrollByAmount(-160)}
              aria-label="Scroll left"
            >
              ‹
            </button>

            <div
              className={styles.tabList}
              ref={tabListRef}
              data-lenis-prevent
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {items.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
                  onClick={() => handleTabClick(i)}
                >
                  <span className={styles.tabIndicator} />
                  <span className={styles.tabLabel}>{p.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => scrollByAmount(160)}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>

          <div className={styles.panelWrap}>
            <div className={styles.panelGlow} />
            <div className={styles.panel} ref={panelRef} key={current.id}>
              <span className={styles.panelTag}>{current.label}</span>
              <h3 className={styles.panelTagline}>{current.tagline}</h3>
              <p className={styles.panelDesc}>{current.desc}</p>
              <a href={current.route} className={styles.detailsBtn}>
                View Full Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}