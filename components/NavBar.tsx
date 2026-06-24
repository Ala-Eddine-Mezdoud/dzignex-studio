"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { cn } from "../lib/utils";
import { ArrowUpRight } from 'lucide-react';
import Magnetic from "./Magnetic";


const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/projects", label: "PROJECTS" },
] as const;

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.07, delayChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn", when: "afterChildren", staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const linkIsActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const linkClass = (href: string) =>
    cn(
      "uppercase transition-colors text-[18px]",
      linkIsActive(href)
        ? "text-dzignex-blue underline underline-offset-8"
        : "text-white hover:text-dzignex-white/90"
    );

  // Close the menu whenever the route changes (after a navigation completes).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scrolling while the overlay is open.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  return (
    <div className="bg-dzignex-blue/10 h-20 font-semibold relative z-50">
      <div className="container mx-auto flex justify-between items-center h-full px-6 sm:p-0 lg:px-16">
        {/* Logo */}
        <Link href="/" className="shrink-0 relative z-50" onClick={() => setOpen(false)}>
          <div className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 relative">
            <Image src={"/dzignex_logo.svg"} fill alt="Dzignex Studio home" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Magnetic className="hidden lg:block" strength={0.4}>
          <Link
            href="/contact"
            className="group flex gap-1 items-end bg-dzignex-blue text-white px-4 py-2 uppercase hover:opacity-90 transition-opacity"
          >
            CONTACT US <ArrowUpRight size={26}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
            />
          </Link>
        </Magnetic>

        {/* Hamburger */}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 relative z-50 p-1"
        >
          <span
            className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-7 bg-white transition-transform duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="lg:hidden fixed inset-0 z-40 bg-dzignex-black/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col h-full justify-center px-7 sm:px-10 pt-20 pb-10">
              {navItems.map(({ href, label }, i) => {
                const active = linkIsActive(href);
                return (
                  <motion.div key={href} variants={itemVariants}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-5 py-4 border-b border-dzignex-white/10"
                    >
                      <span className="text-dzignex-blue font-bold text-sm tabular-nums w-6 shrink-0">
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "uppercase font-bold tracking-tighter text-4xl sm:text-5xl transition-colors",
                          active ? "text-dzignex-blue" : "text-dzignex-white group-hover:text-dzignex-blue"
                        )}
                      >
                        {label}
                      </span>
                      <ArrowUpRight
                        size={28}
                        className="ml-auto shrink-0 text-dzignex-white/40 transition-all duration-300 group-hover:text-dzignex-blue group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                      />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="mt-10">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center gap-2 bg-dzignex-blue text-white px-7 py-4 uppercase font-bold text-lg tracking-tight"
                >
                  Contact Us
                  <ArrowUpRight
                    size={26}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"
                  />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
