"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesGrid.module.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    desc: "Custom, high-performance websites built around your business goals.",
    stat: 20,
    statLabel: "Faster Load Times",
    color: "#0A3391",
    href: "/Services/Web_Development",
    image: "/images/services/web-dev.webp",
  },
  {
    title: "Web Application Development",
    desc: "Dynamic, scalable web apps tailored to your workflows.",
    stat: 18,
    statLabel: "Efficiency Gains",
    color: "#2148B0",
    href: "/Services/Web_application_development",
    image: "/images/services/web-application-development.webp",
  },
  {
    title: "App Development",
    desc: "Cross-platform mobile apps that meet your business objectives.",
    stat: 30,
    statLabel: "User Engagement",
    color: "#3A5FC7",
    href: "/Services/app_development",
    image: "/images/services/app-development.webp",
  },
  {
    title: "Data Acquisition",
    desc: "Robust systems for gathering and analyzing operational data.",
    stat: 14,
    statLabel: "Faster Decisions",
    color: "#5476DE",
    href: "/Services/data_acquisition",
    image: "/images/services/data-acquisition.webp",
  },
  {
    title: "SAP & Other's Integration",
    desc: "Seamless SAP integration that streamlines your processes.",
    stat: 25,
    statLabel: "Process Efficiency",
    color: "#3A5FC7",
    href: "/Services/sap_integration",
    image: "/images/services/sap-integration.webp",
  },
  {
    title: "ERP Development",
    desc: "Tailored ERP systems for streamlined enterprise management.",
    stat: 40,
    statLabel: "Productivity Boost",
    color: "#2148B0",
    href: "/Services/erp_development",
    image: "/images/services/erp-development.webp",
  },
  {
    title: "Custom Software Development",
    desc: "User-centric software built to bring your ideas to life.",
    stat: 78,
    statLabel: "Client Satisfaction",
    color: "#0A3391",
    href: "/Services/custom_software_development",
    image: "/images/services/custom-software-development.webp",
  },
];





export default function ServicesGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>What We Do</span>
        <h2 className={styles.headline}>
          Advantage Is Our Promise:
          <br />
          Fueling Your Success
        </h2>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className={styles.card}
            >

              <div className={styles.cardInner}>
                <div className={styles.topRow}>
                  <div />

                  <div className={styles.serviceImageWrap}>
                    <Image
                          src={service.image}
                          alt=""
                          width={82}
                          height={82}
                          className={styles.serviceImage}
                        />
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>

                

                <Link href={service.href} className={styles.learnMore}>
                  Learn More <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}