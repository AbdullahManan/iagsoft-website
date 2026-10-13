"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Accreditations.module.css";

gsap.registerPlugin(ScrollTrigger);

const memberships = [
  { name: "P@SHA", desc: "Pakistan Software Houses Association", logo: "/images/organization-members/Pasha.webp" },
  { name: "PSEB", desc: "Pakistan Software Export Board", logo: "/images/organization-members/Pseb.webp" },
  { name: "Multan Chamber of Commerce", desc: "Multan Chamber of Commerce", logo: "/images/organization-members/Multan-chamber-of-commenrce.webp" },
];

export default function Accreditations() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const framesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { autoAlpha: 0, x: -20 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        framesRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div ref={textRef} className={styles.textCol}>
          <span className={styles.eyebrow}>Industry Recognition</span>
          <h2 className={styles.headline}>
            Proudly Connected to Pakistan&apos;s Business & Technology Ecosystem
          </h2>
          <div className={styles.underline} />
          <p className={styles.subtext}>
            Our affiliations with leading technology and business
            organizations reflect IAG Soft&apos;s continued presence within
            Pakistan&apos;s evolving digital and commercial landscape.
          </p>
        </div>

        <div className={styles.framesCol}>
          {memberships.map((org, i) => (
            <div
              key={org.name}
              ref={(el) => (framesRef.current[i] = el)}
              className={styles.frameWrap}
            >
              <div className={styles.spotlight} />
              <div className={styles.frame}>
                <div className={styles.plaque}>
                  <span className={styles.memberLabel}>Member</span>
                  <div className={styles.memberLine} />

                  <div className={styles.logoWrap}>
                    <Image src={org.logo} alt={org.name} width={90} height={90} className={styles.logo} />
                  </div>

                  <span className={styles.orgName}>{org.desc}</span>
                  <div className={styles.bottomLine} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}