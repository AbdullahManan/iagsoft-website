"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    client: "Tripack Films",
    person: "Mr. Adnan",
    quote:
      "IAG SOFT has been instrumental in streamlining our digital operations. Their team's responsiveness and ability to understand our industry needs made a real difference.",
    logo: "/images/clients/tripack-films.webp",
  },
  {
    client: "IPAK",
    person: "Mr. Abu Bakar",
    quote:
      "Working with IAG SOFT has been a smooth and professional experience. Their solutions are reliable, efficient, and tailored to our requirements.",
    logo: "/images/clients/ipak.webp",
  },
  {
    client: "Century Paper",
    person: "Mr. Ghazanfar Madni",
    quote:
      "We appreciate IAG SOFT's technical expertise and commitment. Their support has significantly improved our workflow efficiency.",
    logo: "/images/clients/century-paper.webp",
  },
  {
    client: "Engro",
    person: "Mr. Salman",
    quote:
      "IAG SOFT brings a unique blend of innovation and consistency. Their team has always delivered on time and beyond expectations.",
    logo: "/images/clients/engro.webp",
  },
  {
    client: "IFFCO",
    person: "Mr. Badar uz Zaman",
    quote:
      "From the start, IAG SOFT has demonstrated professionalism and deep industry understanding. We're satisfied with the results and ongoing support.",
    logo: "/images/clients/iffco.webp",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const cardRef = useRef(null);
  const animating = useRef(false);

const goTo = (nextIndex) => {
  if (animating.current || nextIndex === activeIndex) return;

  animating.current = true;

  const tl = gsap.timeline({
    onComplete: () => {
      animating.current = false;
    },
  });

  tl.to(cardRef.current, {
    opacity: 0,
    x: -50,
    duration: 0.55,
    ease: "power2.inOut",
  })
    .call(() => {
      setActiveIndex(nextIndex);
    })
    .set(cardRef.current, {
      x: 50,
    })
    .to(cardRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: "power3.out",
    });
};

  const goNext = () => {
    goTo((activeIndex + 1) % testimonials.length);
  };

  const goPrev = () => {
    goTo(
      (activeIndex - 1 + testimonials.length) %
        testimonials.length
    );
  };

  // Automatic carousel — every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating.current) {
        goTo((activeIndex + 1) % testimonials.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const active = testimonials[activeIndex];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <span className={styles.eyebrow}>
          Client Voices
        </span>

        <h2 className={styles.headline}>
          What Our Clients Say
        </h2>

        <div className={styles.carousel}>

          <div ref={cardRef} className={styles.card}>

            <div className={styles.glow} />

            {/* LEFT — Testimonial */}
            <div className={styles.testimonialContent}>

              <span className={styles.quoteMark}>
                “
              </span>

              <p className={styles.quote}>
                {active.quote}
              </p>

              <div className={styles.author}>
                <strong>{active.person}</strong>
                <span>{active.client}</span>
              </div>

            </div>

            {/* RIGHT — Company Logo */}
            <div className={styles.companySide}>

              <div className={styles.logoContainer}>
                <img
                  src={active.logo}
                  alt={`${active.client} logo`}
                  className={styles.logo}
                />
              </div>

              <span className={styles.companyName}>
                {active.client}
              </span>

            </div>

          </div>

          {/* Controls */}
          <div className={styles.controls}>

            <button
              onClick={goPrev}
              className={styles.navBtn}
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={
                    i === activeIndex
                      ? styles.dotActive
                      : styles.dot
                  }
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className={styles.navBtn}
              aria-label="Next testimonial"
            >
              →
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

