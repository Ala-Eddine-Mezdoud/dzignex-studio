"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "hover" | "view";

/**
 * Site-wide custom cursor: a small precise dot that tracks the pointer 1:1,
 * plus an outline ring that lags behind on a spring.
 *
 * States (driven by whatever is under the pointer):
 *   - default → dot + thin ring
 *   - hover   → over any link / button: ring grows, dot fades
 *   - view    → over an element carrying `data-cursor` (e.g. project media):
 *               ring grows further and shows that attribute's text as a label
 *
 * Only mounts on fine pointers (real mice) with motion enabled. On touch or
 * `prefers-reduced-motion` it renders nothing and the native cursor stays.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");

  // Dot: follows the raw pointer. Ring: spring-smoothed follow.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 400, damping: 38, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 400, damping: 38, mass: 0.7 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const HOVER_SELECTOR =
      'a, button, [role="button"], label, summary, input[type="checkbox"], input[type="radio"], select, [data-cursor]';

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      // Throttle the (cheap but not free) DOM walk to one per frame.
      if (raf.current != null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(HOVER_SELECTOR);
        if (!el) {
          setVariant("default");
          setLabel("");
          return;
        }
        const cursorAttr = el.getAttribute("data-cursor");
        if (cursorAttr !== null) {
          setVariant("view");
          setLabel(cursorAttr || "View");
        } else {
          setVariant("hover");
          setLabel("");
        }
      });
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onLeave);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  const ringSize =
    variant === "view" ? 96 : variant === "hover" ? 56 : 30;
  const ringOpacity = visible ? (variant === "default" ? 0.6 : 1) : 0;
  const dotOpacity = visible && variant === "default" ? 1 : 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10001] overflow-hidden" aria-hidden>
      {/* Ring — outer node is positioned by the spring, inner does size/scale */}
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="rounded-full border border-dzignex-white flex items-center justify-center mix-blend-difference"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: ringOpacity,
            scale: down ? 0.82 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.6 }}
        >
          <motion.span
            className="text-[10px] font-bold uppercase tracking-widest text-dzignex-white whitespace-nowrap"
            animate={{ opacity: variant === "view" ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Dot — raw pointer tracking */}
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.div
          className="rounded-full bg-dzignex-white mix-blend-difference"
          style={{ width: 6, height: 6, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: dotOpacity, scale: down ? 1.6 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
