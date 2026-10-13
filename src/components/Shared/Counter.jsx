"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Counter({ to, suffix = "", duration = 1.2, trigger, runImmediately = false }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const target = Number(to);
    const obj = { val: 0 };

    const runCount = () => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        onUpdate: () => setValue(Math.floor(obj.val)),
      });
    };

    if (runImmediately) {
      runCount();
      return;
    }

    const st = ScrollTrigger.create({
      trigger: trigger || ref.current,
      start: "top 85%",
      onEnter: runCount,
    });

    if (st.isActive) runCount();

    return () => st.kill();
  }, [to, runImmediately, duration, trigger]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}