"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const serviceLinks = [
  { label: "Web Development", href: "/Services/Web_Development" },
  { label: "Web Application Development", href: "/Services/Web_application_development" },
  { label: "App Development", href: "/Services/app_development" },
  { label: "Data Acquisition", href: "/Services/data_acquisition" },
  { label: "SAP & Other's Integration", href: "/Services/sap_integration" },
  { label: "ERP Development", href: "/Services/erp_development" },
  { label: "Custom Software Development", href: "/Services/custom_software_development" },
];

const weighbridgeLinks = [
  { label: "Live Weight API", href: "/Weighbridge/LiveweightAPI" },
  { label: "Weighbridge Without Man", href: "/Weighbridge/WeightWithoutMan" },
  { label: "Weight in Motion", href: "/Weighbridge/WeightinMotion" },
  { label: "Mobile App Control", href: "/Weighbridge/MobileApp" },
  { label: "Cloud Based", href: "/Weighbridge/CloudBased" },
  { label: "Commercial Weighbridge Software", href: "/Weighbridge/Commercial_Weighbridge_Software" },
];

const productLinks = [
  { label: "ERP Solutions", href: "/Product/ERP_System" },
  { label: "E-Parking Management System", href: "/Product/E_Parking_Management_System" },
  { label: "E-Toll Management System", href: "/Product/E_Toll_Management_System" },
  { label: "Software as a Service", href: "/Product/Software_as_a_service" },
  { label: "Weighbridge", href: "/Weighbridge", children: weighbridgeLinks },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileSubDropdown, setMobileSubDropdown] = useState(null);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setMobileSubDropdown(null);
  };

  const toggleMobileDropdown = (menu) => {
    setMobileDropdown((current) => (current === menu ? null : menu));
    setMobileSubDropdown(null);
  };

  const toggleMobileSubDropdown = (menu) => {
    setMobileSubDropdown((current) => (current === menu ? null : menu));
  };

  const toggleMobileMenu = () => {
    setMobileOpen((current) => !current);
    setMobileDropdown(null);
    setMobileSubDropdown(null);
  };

  const isActive = (href) => pathname === href;

  const flattenHrefs = (items) =>
    items.flatMap((item) => (item.children ? flattenHrefs(item.children) : [item.href]));

  const isGroupActive = (items, base) =>
    pathname === base || flattenHrefs(items).some((href) => pathname === href);

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          <Image
            src="/logos/iag-logo.webp"
            alt="IAG Soft"
            width={2787}
            height={1534}
            priority
          />
        </Link>

        <nav className={styles.links}>
          <Link
            href="/"
            className={`${styles.link} ${isActive("/") ? styles.linkActive : ""}`}
          >
            Home
          </Link>
          <Link
            href="/About"
            className={`${styles.link} ${isActive("/About") ? styles.linkActive : ""}`}
          >
            About Us
          </Link>
          <Link
            href="/ApnaAccount"
            className={`${styles.link} ${isActive("/ApnaAccount") ? styles.linkActive : ""}`}
          >
            Apna Account
          </Link>

          <DesktopDropdown
            label="Services"
            href="/Services"
            items={serviceLinks}
            isOpen={openMenu === "services"}
            isActive={isGroupActive(serviceLinks, "/Services")}
            currentPath={pathname}
            onEnter={() => setOpenMenu("services")}
            onLeave={() => setOpenMenu(null)}
            openSubmenu={openSubmenu}
            setOpenSubmenu={setOpenSubmenu}
            styles={styles}
          />

          <DesktopDropdown
            label="Product"
            href="/Product/Index"
            items={productLinks}
            isOpen={openMenu === "product"}
            isActive={isGroupActive(productLinks, "/Product/Index")}
            currentPath={pathname}
            onEnter={() => setOpenMenu("product")}
            onLeave={() => {
              setOpenMenu(null);
              setOpenSubmenu(null);
            }}
            openSubmenu={openSubmenu}
            setOpenSubmenu={setOpenSubmenu}
            styles={styles}
          />

          <Link
            href="/blog"
            className={`${styles.link} ${pathname.startsWith("/blog") ? styles.linkActive : ""}`}
          >
            Blog
          </Link>
        </nav>

        <Link href="/Contact" className={styles.cta}>
          Contact Us
        </Link>

        <button
          type="button"
          className={`${styles.menuButton} ${mobileOpen ? styles.menuButtonOpen : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}>
        <nav className={styles.mobileLinks}>
          <Link
            href="/"
            className={`${styles.mobileLink} ${isActive("/") ? styles.mobileLinkActive : ""}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/About"
            className={`${styles.mobileLink} ${isActive("/About") ? styles.mobileLinkActive : ""}`}
            onClick={closeMobileMenu}
          >
            About Us
          </Link>
          <Link
            href="/ApnaAccount"
            className={`${styles.mobileLink} ${isActive("/ApnaAccount") ? styles.mobileLinkActive : ""}`}
            onClick={closeMobileMenu}
          >
            Apna Account
          </Link>

          <MobileDropdown
                  label="Services"
                  href="/Services"
                  items={serviceLinks}
                  isOpen={mobileDropdown === "services"}
                  currentPath={pathname}
                  onToggle={() => toggleMobileDropdown("services")}
                  onItemClick={closeMobileMenu}
                  mobileSubDropdown={mobileSubDropdown}
                  onSubToggle={toggleMobileSubDropdown}
                  styles={styles}
                />

                <MobileDropdown
                  label="Products"
                  href="/Product/Index"
                  items={productLinks}
                  isOpen={mobileDropdown === "product"}
                  currentPath={pathname}
                  onToggle={() => toggleMobileDropdown("product")}
                  onItemClick={closeMobileMenu}
                  mobileSubDropdown={mobileSubDropdown}
                  onSubToggle={toggleMobileSubDropdown}
                  styles={styles}
                />

          <Link
            href="/blog"
            className={`${styles.mobileLink} ${pathname.startsWith("/blog") ? styles.mobileLinkActive : ""}`}
            onClick={closeMobileMenu}
          >
            Blog
          </Link>

          <Link href="/Contact" className={styles.mobileCta} onClick={closeMobileMenu}>
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}

function DesktopDropdown({ label, href, items, isOpen, isActive, currentPath, onEnter, onLeave, openSubmenu, setOpenSubmenu, styles }) {
  return (
    <div className={styles.dropdownWrap} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link href={href} className={`${styles.link} ${isActive ? styles.linkActive : ""}`}>
        {label} <span className={styles.caret}>▾</span>
      </Link>

      {isOpen && (
        <div className={styles.dropdown}>
          {items.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className={styles.dropdownSubWrap}
                  onMouseEnter={() => setOpenSubmenu(item.href)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <div className={styles.dropdownItemParent}>
                    <Link
                      href={item.href}
                      className={`${styles.dropdownItemLabel} ${currentPath === item.href ? styles.dropdownItemActive : ""}`}
                    >
                      {item.label}
                    </Link>
                    <span className={styles.subCaret}>▸</span>
                  </div>

                  {openSubmenu === item.href && (
                    <div className={styles.dropdownSubmenu}>
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`${styles.dropdownItem} ${currentPath === sub.href ? styles.dropdownItemActive : ""}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.dropdownItem} ${currentPath === item.href ? styles.dropdownItemActive : ""}`}
                >
                  {item.label}
                </Link>
              )
            )}
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ label, href, items, isOpen, currentPath, onToggle, onItemClick, mobileSubDropdown, onSubToggle, styles }) {
  const flatHrefs = items.flatMap((item) => (item.children ? item.children.map((c) => c.href) : [item.href]));
  const isActive = flatHrefs.some((href) => currentPath === href) || currentPath === href;

  return (
    <div className={styles.mobileDropdownWrap}>
      <div className={styles.mobileDropdownRow}>
        <Link
          href={href}
          className={`${styles.mobileDropdownLabel} ${isActive ? styles.mobileDropdownButtonActive : ""}`}
          onClick={onItemClick}
        >
          {label}
        </Link>
        <button
          type="button"
          className={styles.mobileDropdownCaretBtn}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`Toggle ${label} submenu`}
        >
          <span className={`${styles.mobileCaret} ${isOpen ? styles.mobileCaretOpen : ""}`}>▾</span>
        </button>
      </div>

      <div className={`${styles.mobileDropdown} ${isOpen ? styles.mobileDropdownOpen : ""}`}>
        {items.map((item) =>
          item.children ? (
            <div key={item.href} className={styles.mobileSubWrap}>
              <div className={styles.mobileSubRow}>
                <Link
                  href={item.href}
                  className={`${styles.mobileDropdownItem} ${currentPath === item.href ? styles.mobileDropdownItemActive : ""}`}
                  onClick={onItemClick}
                >
                  {item.label}
                </Link>
                <button
                  type="button"
                  className={styles.mobileSubCaretBtn}
                  onClick={() => onSubToggle(item.href)}
                  aria-expanded={mobileSubDropdown === item.href}
                  aria-label={`Toggle ${item.label} submenu`}
                >
                  <span className={`${styles.mobileCaret} ${mobileSubDropdown === item.href ? styles.mobileCaretOpen : ""}`}>▾</span>
                </button>
              </div>

              <div className={`${styles.mobileSubDropdown} ${mobileSubDropdown === item.href ? styles.mobileSubDropdownOpen : ""}`}>
                {item.children.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`${styles.mobileDropdownItem} ${currentPath === sub.href ? styles.mobileDropdownItemActive : ""}`}
                    onClick={onItemClick}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileDropdownItem} ${currentPath === item.href ? styles.mobileDropdownItemActive : ""}`}
              onClick={onItemClick}
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}