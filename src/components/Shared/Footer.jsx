'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

const serviceLinks = [
  { label: "Web Development", href: "/Services/Web_Development" },
  { label: "Web Application Development", href: "/Services/Web_application_development" },
  { label: "App Development", href: "/Services/app_development" },
  { label: "Data Acquisition", href: "/Services/data_acquisition" },
  { label: "SAP & Other's Integration", href: "/Services/sap_integration" },
  { label: "ERP Development", href: "/Services/erp_development" },
  { label: "Custom Software Development", href: "/Services/custom_software_development" },
];

const companyLinks = [
  { label: "About Us", href: "/About" },
  { label: "Apna Account", href: "/ApnaAccount" },
  { label: "Products", href: "/Product/Index" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/Contact" },
];

const offices = [
  { city: "Multan", address: "674-C, Opp Jalal Masjid Park, Gulgasht Multan", phone: "+92 300 8720674" },
  { city: "Karachi", address: "Office No. 41, First Floor, Glass Tower, Near Teen Talwar, Clifton, Karachi", phone: "" },
];

export default function Footer() {
  const pathname = usePathname();
  const hideCTA = pathname === "/Contact";

  return (
    <footer className={styles.footer}>
      {!hideCTA && (
        <div className={styles.ctaWrap}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} />
            <h2 className={styles.ctaHeadline}>Let&apos;s Build Something Together</h2>
            <p className={styles.ctaSubtext}>
              35 years of turning ideas into intelligent software solutions.
            </p>
            <Link href="/Contact" className={styles.ctaButton}>
              Get In Touch <span>→</span>
            </Link>
          </div>
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
                <Image
                src="/logos/iag-logo.webp"
                alt="IAG Sof"
                width={2787}
                height={1534}
                />
            </Link>

            <p className={styles.tagline}>
                Intelligent software solutions for modern business, since 1989.
            </p>

            <div className={styles.socials}>
                <a href="https://www.facebook.com/IAG.Soft" aria-label="Facebook" className={styles.socialIcon}>f</a>
                <a href="https://www.linkedin.com/company/iag-soft/mycompany/" aria-label="LinkedIn" className={styles.socialIcon}>in</a>
                <a href="https://www.youtube.com/channel/UCbyl7-BXJhJxLwMR5jh12Ag" aria-label="YouTube" className={styles.socialIcon}>▶</a>
            </div>
            </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Company</h4>
          {companyLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Services</h4>
          {serviceLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.officesCol}>
          <h4 className={styles.colTitle}>Our Offices</h4>
          {offices.map((office) => (
            <div key={office.city} className={styles.office}>
              <strong>{office.city}</strong>
              <span>{office.address}</span>
              <span>{office.phone}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} IAG Soft. All rights reserved.</span>
        <span className={styles.since}>Since 1989</span>
      </div>
    </footer>
  );
}