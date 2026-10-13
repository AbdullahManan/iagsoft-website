"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ServiceRows.module.css";
import Image from "next/image";

const services = [
  { num: "01", title: "Web Development", tag: "Frontend", color: "#0A3391", desc: "Custom, high-performance websites built around your business goals.", href: "/Services/Web_Development", image: "/images/services/web-dev.webp" },
  { num: "02", title: "Web Application Development", tag: "Full-Stack", color: "#2148B0", desc: "Dynamic, scalable web apps tailored to your workflows.", href: "/Services/Web_application_development", image: "/images/services/web-application-development.webp" },
  { num: "03", title: "App Development", tag: "Mobile", color: "#3A5FC7", desc: "Cross-platform mobile apps for iOS and Android.", href: "/Services/app_development", image: "/images/services/app-development.webp" },
  { num: "04", title: "Data Acquisition", tag: "Data & SCADA", color: "#5476DE", desc: "Robust systems for gathering and analyzing operational data.", href: "/Services/data_acquisition", image: "/images/services/data-acquisition.webp" },
  { num: "05", title: "SAP & Other's Integration", tag: "Integration", color: "#3A5FC7", desc: "Seamless SAP integration that streamlines your processes.", href: "/Services/sap_integration", image: "/images/services/sap-integration.webp" },
  { num: "06", title: "ERP Development", tag: "Enterprise", color: "#2148B0", desc: "Tailored ERP systems for streamlined enterprise management.", href: "/Services/erp_development", image: "/images/services/erp-development.webp" },
  { num: "07", title: "Custom Software Development", tag: "Bespoke", color: "#0A3391", desc: "User-centric software built to your company's exact needs.", href: "/Services/custom_software_development", image: "/images/services/custom-software-development.webp" },
];



export default function ServiceRows() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>What We Do</span>
        <h2 className={styles.headline}>Explore Our Services</h2>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className={styles.card}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={styles.cardGlow}
                style={{ background: service.color, opacity: hovered === i ? 0.18 : 0 }}
              />

              <div
                  className={`${styles.animatedIcon} ${hovered === i ? styles.animatedIconActive : ""}`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={64}
                    height={64}
                    className={styles.cardImage}
                  />
                </div>

              <div className={styles.cardLeft}>
                <span
                    className={styles.cardNum}
                    style={{
                        textShadow: hovered === i
                        ? `0 0 8px ${service.color}55`
                        : "none",
                        WebkitTextStroke: hovered === i
                        ? `1px ${service.color}80`
                        : "1.5px var(--border)",
                        color: hovered === i
                        ? `${service.color}18`
                        : "transparent",
                    }}
                    >
                    {service.num}
                </span>
              </div>

              <div className={styles.cardMain}>
                <span
                  className={styles.cardTag}
                  style={{ color: service.color, background: `${service.color}14` }}
                >
                  {service.tag}
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
              </div>

              <div
                className={styles.arrow}
                style={{
                  background: service.color,
                  transform: hovered === i ? "translateX(4px) rotate(0deg)" : "rotate(-45deg)",
                }}
              >
                →
              </div>

              <div
                className={styles.cardBorder}
                style={{
                  background: `linear-gradient(90deg, ${service.color}, transparent)`,
                  opacity: hovered === i ? 1 : 0,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}