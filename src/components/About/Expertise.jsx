'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Expertise.module.css';

gsap.registerPlugin(ScrollTrigger);

const TECH = [
  { id: 't1', name: 'Visual Basic' },
  { id: 't2', name: 'Angular' },
  { id: 't3', name: '.NET MVC' },
  { id: 't4', name: 'SQL Server' },
  { id: 't5', name: 'Oracle' },
  { id: 't6', name: 'MIS' },
  { id: 't7', name: 'DSS' },
];

const SERVICES = [
  { id: 's1', name: 'ERP Development & Integration' },
  { id: 's2', name: 'SAP & Third-Party Integration' },
  { id: 's3', name: 'Weighbridge & Hardware Integration' },
  { id: 's4', name: 'Data Acquisition & SCADA' },
  { id: 's5', name: 'Custom Enterprise Software' },
  { id: 's6', name: 'Web & Application Development' },
];

const VIEW_W = 900;
const VIEW_H = 620;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const TECH_RADIUS = 230;
const SERVICE_RADIUS = 250;
const HUB_RADIUS = 46;

function round(n) {
  return Math.round(n * 100) / 100;
}

function polarPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: round(cx + r * Math.cos(rad)),
    y: round(cy + r * Math.sin(rad)),
  };
}

// distribute n points evenly across [startDeg, endDeg]
function distribute(n, startDeg, endDeg) {
  if (n === 1) return [(startDeg + endDeg) / 2];
  const step = (endDeg - startDeg) / (n - 1);
  return Array.from({ length: n }, (_, i) => startDeg + step * i);
}

export default function Expertise() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const lineRefs = useRef({});
  const [hovered, setHovered] = useState(null);

  const nodes = useMemo(() => {
    const techAngles = distribute(TECH.length, 100, 260);
    const serviceAngles = distribute(SERVICES.length, -80, 80);

    const techNodes = TECH.map((t, i) => ({
      ...t,
      type: 'tech',
      angle: techAngles[i],
      ...polarPoint(CX, CY, TECH_RADIUS, techAngles[i]),
    }));

    const serviceNodes = SERVICES.map((s, i) => ({
      ...s,
      type: 'service',
      angle: serviceAngles[i],
      ...polarPoint(CX, CY, SERVICE_RADIUS, serviceAngles[i]),
    }));

    return [...techNodes, ...serviceNodes];
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = Object.values(lineRefs.current).filter(Boolean);

      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.04,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });

      const nodeEls = svgRef.current.querySelectorAll(`.${styles.node}`);
      gsap.fromTo(
        nodeEls,
        { opacity: 0, scale: 0.6, transformOrigin: 'center' },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          delay: 0.3,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>Technology &amp; Expertise</span>
        <h2 className={styles.heading}>
          Proven technology, delivered as complete capability
        </h2>

        <div className={styles.diagramWrap}>
          <svg
            ref={svgRef}
            className={styles.svg}
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {nodes.map((n) => (
              <path
                key={`line-${n.id}`}
                ref={(el) => (lineRefs.current[n.id] = el)}
                d={`M ${CX} ${CY} L ${n.x} ${n.y}`}
                className={styles.line}
                style={{
                  opacity: hovered && hovered !== n.id ? 0.12 : 1,
                }}
              />
            ))}

           <g className={styles.hub}>
                <circle cx={CX} cy={CY} r={HUB_RADIUS} className={styles.hubCircle} />
                <circle cx={CX} cy={CY} r={HUB_RADIUS - 6} fill="#fff" />

                <image
                    href="/logos/iag-logo.webp"
                    x={CX - (HUB_RADIUS - 22)}
                    y={CY - (HUB_RADIUS - 22)}
                    width={(HUB_RADIUS - 22) * 2}
                    height={(HUB_RADIUS - 22) * 2}
                    preserveAspectRatio="xMidYMid meet"
                />
            </g>

            {nodes.map((n) => {
              const isLeft = n.type === 'tech';
              const labelOffset = isLeft ? -16 : 16;
              const dimmed = hovered && hovered !== n.id;
              return (
                <g
                  key={n.id}
                  className={styles.node}
                  style={{ opacity: dimmed ? 0.25 : 1 }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={7}
                    className={n.type === 'tech' ? styles.dotTech : styles.dotService}
                  />
                  <text
                    x={n.x + labelOffset}
                    y={n.y + 4}
                    textAnchor={isLeft ? 'end' : 'start'}
                    className={styles.nodeLabel}
                  >
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
{/* Mobile fallback: simple stacked lists */}
      <div className={styles.mobileLists}>
        <div className={styles.mobileCol}>
          <h3 className={styles.mobileColTitle}>Technology</h3>
          <ul className={styles.mobileList}>
            {TECH.map((t) => (
              <li key={t.id} className={styles.mobileItem}>
                <span className={styles.mobileDotTech} />
                {t.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.mobileCol}>
          <h3 className={styles.mobileColTitle}>Services</h3>
          <ul className={styles.mobileList}>
            {SERVICES.map((s) => (
              <li key={s.id} className={styles.mobileItem}>
                <span className={styles.mobileDotService} />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
  );
}