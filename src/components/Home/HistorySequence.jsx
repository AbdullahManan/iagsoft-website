'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import { useRef, useLayoutEffect, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './HistorySequence.module.css';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CHECKPOINTS = [
  { id: 'invoicing', label: 'Digital Invoicing', title: 'Launch Digital Invoices in Minutes', desc: 'Submit invoices live to FBR with Apna Account, fast, secure, and 100% compliant.', x: 1.6, z: -6, align: 'right', image: '/heroimages/1.webp' },
  { id: 'trading', label: 'Trading Software', title: 'Smart Trading Software for Modern Businesses', desc: 'From inventory to invoicing, manage your trade operations with precision and speed.', x: -1.6, z: -13, align: 'left', image: '/heroimages/2.webp' },
  { id: 'oee', label: 'OEE Solutions', title: 'Equipment Efficiency with IAG Soft', desc: 'IAG Soft helps manufacturers maximize efficiency and performance through powerful OEE solutions.', x: 1.6, z: -20, align: 'right', image: '/heroimages/3.webp' },
  { id: 'iot', label: 'Smart IoT', title: 'Smart IoT Solutions', desc: 'Empower your business with real-time monitoring, energy optimization, predictive insights, and seamless device connectivity for smarter operations.', x: -1.6, z: -27, align: 'left', image: '/heroimages/4.webp' },
  { id: 'tracetrace', label: 'Track & Trace', title: 'Advanced Track & Trace Systems', desc: 'Enhance supply chain visibility with instant tracking, product authentication, and transparent logistics to ensure efficiency and trust across operations.', x: 1.6, z: -34, align: 'right', image: '/heroimages/5.webp' },
];

const FADE_RANGE = 7;
const TOTAL_DEPTH = Math.abs(CHECKPOINTS[CHECKPOINTS.length - 1].z);




function useSnakeCurve(isMobile) {
  return useMemo(() => {
    const xScale = isMobile ? 0.4 : 1; // pull the zigzag closer to center on narrow screens
    const raw = [
      new THREE.Vector3(0, -1.4, 1),
      ...CHECKPOINTS.map((cp) => new THREE.Vector3(cp.x * xScale, -1.4, cp.z)),
    ];
    return new THREE.CatmullRomCurve3(raw, false, 'catmullrom', 0.5);
  }, [isMobile]);
}

function SnakeLine({ curve, scrollProgress, isMobile }) {
  const smoothT = useRef(0);
  const TUBULAR = isMobile ? 240 : 480;
  const RADIAL = isMobile ? 6 : 8;

  // built once per curve/device, never rebuilt during scroll
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, TUBULAR, 0.045, RADIAL, false),
    [curve, TUBULAR, RADIAL]
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    const target = Math.min(1, Math.max(0, scrollProgress.current));
    smoothT.current = THREE.MathUtils.damp(smoothT.current, target, 10, delta);

    // each tube segment uses RADIAL * 6 indices; reveal whole segments
    const visibleSegments = Math.floor(smoothT.current * TUBULAR);
    geometry.setDrawRange(0, visibleSegments * RADIAL * 6);
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <meshBasicMaterial color="#0284c7" />
    </mesh>
  );
}

// function ArrowHead({ scrollProgress, curve }) {
//   const ref = useRef();

//   useFrame(() => {
//     if (!ref.current) return;
//     const t = Math.min(1, Math.max(0, scrollProgress.current));
//     const point = curve.getPointAt(t);
//     const tangent = curve.getTangentAt(t);
//     ref.current.position.copy(point);
//     ref.current.lookAt(point.clone().add(tangent));
//     ref.current.rotateX(Math.PI / 2);
//   });

//   return (
//     <mesh ref={ref}>
//       <coneGeometry args={[0.08, 0.22, 20]} />
//       <meshBasicMaterial color="#0284c7" />
//     </mesh>
//   );
// }

// Reports each checkpoint's live screen-space position + a visibility factor
// up to the parent, instead of rendering DOM inside the Canvas.
function CheckpointMarker({ cp, scrollProgress, onUpdate, isMobile }) {
  const { camera, size } = useThree();
  const meshRef = useRef();
  const worldPos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    const cameraZ = scrollProgress.current * TOTAL_DEPTH;
    const distance = Math.abs(Math.abs(cp.z) - cameraZ);
    const opacity = Math.max(0, 1 - Math.pow(distance / FADE_RANGE, 1.4));

    meshRef.current.getWorldPosition(worldPos);
    const projected = worldPos.clone().project(camera);

    const rawX = (projected.x * 0.5 + 0.5) * size.width;
    const screenY = (-projected.y * 0.5 + 0.5) * size.height;

    // On mobile, always center the card horizontally instead of clamping
    // to left/right offsets, since there's no room for side-by-side layout.
    const screenX = isMobile ? size.width / 2 : Math.min(size.width - 360, Math.max(360, rawX));

    onUpdate(cp.id, { x: screenX, y: screenY, opacity });
  });

  return (
    <mesh ref={meshRef} position={[cp.x, -1.2, cp.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.4, 0.6, 32]} />
      <meshBasicMaterial color="#0284c7" transparent opacity={0} />
    </mesh>
  );
}

function SceneContent({ scrollProgress, curve, onMarkerUpdate, isMobile }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.z = scrollProgress.current * TOTAL_DEPTH;
  });

  return (
    <group ref={groupRef}>
      <Grid
        position={[0, -1.5, -10]}
        args={[60, 60]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#c7ddf0"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#8fb8dd"
        fadeDistance={45}
        fadeStrength={1.5}
      />

      <SnakeLine curve={curve} scrollProgress={scrollProgress} isMobile={isMobile} /> 

      {CHECKPOINTS.map((cp) => {
                  const adjustedCp = isMobile ? { ...cp, x: cp.x * 0.4 } : cp;
                  return (
                    <CheckpointMarker
                      key={cp.id}
                      cp={adjustedCp}
                      scrollProgress={scrollProgress}
                      onUpdate={onMarkerUpdate}
                      isMobile={isMobile}
                    />
                  );
                })}
    </group>
  );
}

export default function HistorySequence() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const outroRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const scrollProgress = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
    const curve = useSnakeCurve(isMobile);

  const [markers, setMarkers] = useState({});

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 800);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMarkerUpdate = (year, data) => {
    setMarkers((prev) => {
      const existing = prev[year];
      if (existing && Math.abs(existing.opacity - data.opacity) < 0.02 && Math.abs(existing.x - data.x) < 1) {
        return prev;
      }
      return { ...prev, [year]: data };
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(introRef.current, { opacity: 1, y: 0 });
      gsap.set(outroRef.current, { opacity: 0, y: 20 });
      gsap.set(canvasWrapRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=6000',
          scrub: isMobile ? 0.3 : 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.08) scrollProgress.current = 0;
            else if (p > 0.88) scrollProgress.current = 1;
            else scrollProgress.current = (p - 0.08) / (0.88 - 0.08);
          },
        },
      });

      tl.to(introRef.current, { opacity: 0, y: -30, duration: 0.08, ease: 'power2.in' }, 0);
      tl.to(canvasWrapRef.current, { opacity: 1, duration: 0.08, ease: 'power2.out' }, 0.08);
      tl.to(canvasWrapRef.current, { opacity: 0, duration: 0.08, ease: 'power2.in' }, 0.88);
      tl.to(outroRef.current, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.92);

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.skyBackground} />

      <div className={styles.canvasContainer} ref={canvasWrapRef}>
        <Canvas
            camera={isMobile ? { position: [0, 1.8, 5.5], fov: 70 } : { position: [0, 1.5, 4], fov: 60 }}
            gl={{ antialias: !isMobile, alpha: true }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
          >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 20, 15]} intensity={1} />
          <SceneContent
            scrollProgress={scrollProgress}
            curve={curve}
            onMarkerUpdate={handleMarkerUpdate}
            isMobile={isMobile}
          />
        </Canvas>

        {CHECKPOINTS.map((cp) => {
          const m = markers[cp.id];
          if (!m) return null;
          return (
            <div
              key={cp.id}
              className={`${styles.checkpointWrapper} ${isMobile ? styles.checkpointWrapperMobile : ''}`}
              style={{
                position: 'absolute',
                left: m.x,
                top: m.y,
                transform: 'translate(-50%, -50%)',
                opacity: m.opacity,
                pointerEvents: m.opacity > 0.1 ? 'auto' : 'none',
                transition: 'opacity 0.15s linear',
              }}
            >
              <div className={styles.checkpointGroup}>
                <span className={styles.year}>{cp.label}</span>
                <h3 className={styles.title}>{cp.title}</h3>
                <p className={styles.desc}>{cp.desc}</p>
              </div>
              <Image
                src={cp.image}
                alt={cp.title}
                width={isMobile ? 90 : 140}
                height={isMobile ? 90 : 140}
                className={styles.freeImage}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.introLayer} ref={introRef}>
          <h2 className={styles.introTitle}>
            35+ Years of Delivering Reliable Software Solutions
          </h2>

          <p className={styles.introSub}>
            Scroll to see what we build for businesses across Pakistan and beyond.
          </p>

          <div className={styles.scrollIndicator}>
            <span className={styles.scrollLine}></span>
          </div>
        </div>  

        <div className={styles.outroLayer} ref={outroRef}>
          <h2 className={styles.introTitle}>Trusted Nationwide and Around the World</h2>
          <p className={styles.introSub}>Over 35 years and 5000+ projects delivered for businesses in Pakistan and abroad.</p>
        </div>
    </section>
  );
}