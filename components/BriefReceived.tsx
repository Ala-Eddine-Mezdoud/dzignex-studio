"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useLenis } from "lenis/react";
import Dex from "./Dex";

export interface BriefData {
  fullName?: string;
  companyName?: string;
  serviceRequired?: string[];
  industry?: string;
  budgetRange?: string;
  challenges?: string[];
  mainGoal?: string[];
}

interface BriefReceivedProps {
  open: boolean;
  data: BriefData | null;
  /** e.g. "DZX-2608-0473" */
  reference: string | null;
  onClose: () => void;
}

const STEPS = [
  { n: "01", text: "We read your brief and check the fit — within 24–48 hours." },
  { n: "02", text: "You get a short, direct reply from the team. No autoresponders." },
  { n: "03", text: "We lock in your free consultation call and take it from there." },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const COLS = 6;

/** Reference number whose trailing digits roll up from zero. */
const RefCounter = ({ value, delay }: { value: string; delay: number }) => {
  const reduce = useReducedMotion();
  const m = value.match(/^(.*?)(\d+)$/);
  const prefix = m ? m[1] : value;
  const tail = m ? m[2] : "";
  const target = tail ? parseInt(tail, 10) : 0;
  const mv = useMotionValue(0);
  const shown = useTransform(mv, (v) =>
    String(Math.round(v)).padStart(tail.length || 1, "0")
  );

  useEffect(() => {
    if (!tail) return;
    if (reduce) {
      mv.set(target);
      return;
    }
    const controls = animate(mv, target, {
      duration: 1.1,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [tail, target, delay, reduce, mv]);

  if (!tail) return <>{value}</>;
  return (
    <>
      {prefix}
      <motion.span>{shown}</motion.span>
    </>
  );
};

/**
 * Full-viewport confirmation that replaces the tiny success toast after the
 * contact brief is submitted.
 *
 * A brand-blue column wave lifts to reveal: a bracket headline, a line built
 * from what the visitor just told us, their selections echoed back as tags, a
 * 3-step "what happens next" timeline, a rolling reference number, and Dex in
 * the corner. Scroll is locked until they choose where to go next.
 *
 * Reduced motion → the same content, shown at once with no choreography.
 */
const BriefReceived = ({ open, data, reference, onClose }: BriefReceivedProps) => {
  const reduce = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  const d = data ?? {};
  const firstName = d.fullName?.trim().split(/\s+/)[0] || "there";
  const primaryService = d.serviceRequired?.[0] || "project";
  const company = d.companyName?.trim();
  // Skip our trailing period if the company name already ends in punctuation
  // ("Aume Co." → "…for Aume Co." not "…for Aume Co..").
  const endPunct = company && /[.!?]$/.test(company) ? "" : ".";

  const tags = [
    ...(d.serviceRequired ?? []),
    d.industry,
    d.budgetRange ? `${d.budgetRange} budget` : undefined,
  ].filter(Boolean).slice(0, 6) as string[];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-dzignex-black text-dzignex-white overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Brief received"
        >
          {/* Column wave — sweeps up and off to reveal the content */}
          {!reduce && (
            <div className="absolute inset-0 flex pointer-events-none">
              {Array.from({ length: COLS }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-full flex-1 bg-dzignex-blue"
                  initial={{ y: "0%" }}
                  animate={{ y: "-101%" }}
                  transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1], delay: i * 0.05 }}
                />
              ))}
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 p-2 text-dzignex-white/50 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <motion.div
            className="relative h-full overflow-y-auto flex flex-col justify-center container mx-auto px-5 sm:px-8 md:px-10 lg:px-16 py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.34, duration: 0.4 }}
          >
            <div className="max-w-3xl">
              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h2
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none"
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={reduce ? { duration: 0 } : { delay: 0.42, duration: 0.7, ease: EASE }}
                >
                  <span className="text-dzignex-blue">[</span> Brief Received{" "}
                  <span className="text-dzignex-blue">]</span>
                </motion.h2>
              </div>
              <motion.div
                className="h-[3px] bg-dzignex-blue mt-3 origin-left"
                style={{ maxWidth: 200 }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={reduce ? { duration: 0 } : { delay: 0.85, duration: 0.5, ease: EASE }}
              />

              {/* Personalized line */}
              <motion.p
                className="mt-6 text-lg sm:text-xl lg:text-2xl font-medium text-dzignex-white/70 leading-snug"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 0.58, duration: 0.6 }}
              >
                Thanks, <span className="text-dzignex-white">{firstName}</span>. We&apos;ve got your{" "}
                <span className="text-dzignex-white">{primaryService}</span> brief
                {company ? (
                  <>
                    {" "}for <span className="text-dzignex-white">{company}</span>
                  </>
                ) : null}
                {endPunct}
              </motion.p>

              {/* Selections echoed back */}
              {tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <motion.span
                      key={t}
                      className="border border-dzignex-white/20 px-3 py-1.5 text-[11px] uppercase font-bold tracking-widest text-dzignex-white/70"
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduce ? { duration: 0 } : { delay: 0.72 + i * 0.05, duration: 0.4 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* What happens next */}
              <div className="mt-10 lg:mt-14 grid gap-5 sm:grid-cols-3">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s.n}
                    className="border-t border-dzignex-white/20 pt-4"
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduce ? { duration: 0 } : { delay: 0.92 + i * 0.12, duration: 0.5 }}
                  >
                    <p className="text-2xl font-bold tabular-nums">
                      {s.n}
                      <span className="text-dzignex-blue">/</span>
                    </p>
                    <p className="mt-2 text-sm text-dzignex-white/60 leading-relaxed">{s.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Reference + exits */}
              <motion.div
                className="mt-10 lg:mt-14 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { delay: 1.32, duration: 0.5 }}
              >
                {reference && (
                  <div className="shrink-0">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-dzignex-white/40">
                      Reference
                    </p>
                    <p className="text-xl font-bold tabular-nums tracking-tight mt-1">
                      <RefCounter value={reference} delay={reduce ? 0 : 1.4} />
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/projects"
                    onClick={onClose}
                    className="group flex items-center gap-1 bg-dzignex-white text-dzignex-black hover:bg-dzignex-blue hover:text-white px-4 py-2.5 uppercase font-bold text-sm tracking-tight transition-colors"
                  >
                    See our work
                    <ArrowUpRight
                      size={22}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                    />
                  </Link>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="group flex items-center gap-1 border border-dzignex-white/30 hover:border-dzignex-white px-4 py-2.5 uppercase font-bold text-sm tracking-tight transition-colors"
                  >
                    Back home
                    <ArrowUpRight
                      size={22}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Dex, corner */}
            <motion.div
              className="absolute bottom-6 right-5 sm:bottom-10 sm:right-10 flex items-center gap-3"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduce ? { duration: 0 } : { delay: 1.05, duration: 0.5, ease: EASE }}
            >
              <span className="hidden sm:block text-[11px] uppercase tracking-widest text-dzignex-white/45">
                On it. — Dex
              </span>
              <div className="w-12 h-12 rounded-full bg-dzignex-black ring-1 ring-dzignex-blue/40 flex items-center justify-center">
                <Dex state="happy" className="w-9 h-9" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BriefReceived;
