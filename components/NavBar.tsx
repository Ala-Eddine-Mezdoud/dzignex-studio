"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "../lib/utils";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/projects", label: "PROJECTS" },
] as const;

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkIsActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;

  const linkClass = (href: string) =>
    cn(
      "uppercase transition-colors text-[18px]",
      linkIsActive(href)
        ? "text-dzignex-blue underline underline-offset-8"
        : "text-white hover:text-dzignex-white/90"
    );

  return (
    <div className="bg-dzignex-blue/10 h-20 font-semibold relative">
      <div className="container mx-auto flex justify-between items-center h-full ">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 relative">
            <Image src={"/dzignex_logo.svg"} fill alt="Dzignex Studio home" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:block bg-dzignex-blue text-white px-4 py-2 uppercase hover:opacity-90 transition-opacity"
        >
          CONTACT US
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-black/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-[300px] py-6" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-lg">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="bg-dzignex-blue text-white px-6 py-2 mt-2 uppercase hover:opacity-90 transition-opacity"
            onClick={() => setOpen(false)}
          >
            CONTACT US
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
