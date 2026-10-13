'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  { label: 'Call Us', value: '+92 300 8720674', href: 'tel:+923008720674', icon: 'phone' },
  { label: 'General Inquiries', value: 'info@iagsoft.com.pk', href: 'mailto:info@iagsoft.com.pk', icon: 'mail' },
  { label: 'Direct Contact', value: 'Iftikhar@iagsoft.com.pk', href: 'mailto:Iftikhar@iagsoft.com.pk', icon: 'mail' },
  { label: 'Alternate Email', value: 'iagcomp@yahoo.com', href: 'mailto:iagcomp@yahoo.com', icon: 'mail' },
];

function Icon({ type }) {
  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" opacity="0" />
      <path d="M22 6l-10 7L2 6" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(`.${styles.fadeIn}`),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // STUB: replace with a real submission call once a backend/service is chosen
    // e.g. fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    await new Promise((res) => setTimeout(res, 900));

    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />
      <div className={styles.inner}>
        

        <div className={styles.grid}>
          <div className={`${styles.infoCard} ${styles.fadeIn}`}>
            <h3 className={styles.infoTitle}>Get in Touch</h3>
            <ul className={styles.infoList}>
              {CONTACT_INFO.map((item) => (
                <li key={item.value} className={styles.infoItem}>
                  <a href={item.href} className={styles.infoLink}>
                    <span className={styles.infoIcon}>
                      <Icon type={item.icon} />
                    </span>
                    <span className={styles.infoText}>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <span className={styles.infoValue}>{item.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.officeNote}>
              <span className={styles.officeTag}>Head Office</span>
              <p className={styles.officeText}>Multan, Pakistan</p>
            </div>
          </div>

          <form className={`${styles.formCard} ${styles.fadeIn}`} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Full Name</label>
                <input
                  className={styles.input}
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">Phone</label>
                <input
                  className={styles.input}
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+92 3XX XXXXXXX"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                className={styles.input}
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject">Subject</label>
              <input
                className={styles.input}
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                className={styles.textarea}
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project or query..."
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className={styles.successMsg}>
                Thanks — your message has been received. We&apos;ll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.errorMsg}>
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}