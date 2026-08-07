"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/** Contador animado que dispara ao entrar na viewport. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = `${prefix}${Math.round(value).toLocaleString("pt-BR")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, prefix, suffix, duration]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
