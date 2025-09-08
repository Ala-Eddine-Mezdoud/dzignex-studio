"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        sticky top-0 z-50 w-full 
        backdrop-blur-2xl 
        border-b border-white/10
        text-white
        flex justify-center items-center
        h-[88px]
        shadow-[0_5px_20px_0_#01011033]
        bg-[#0C3EFF]/10
      "
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3 w-full">
        {/* Logo */}
        <span className="font-bold text-xl">
          <Link href="/" className="hover:underline">
            Dzignex Studio
          </Link>
        </span>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-8 list-none m-0 p-0 text-xl font-semibold">
          <li>
            <Link
              href="/"
              className="hover:border-b border-[#0c3eff] pb-1 text-[#0c3eff]"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:border-b pb-1">
              ABOUT US
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:border-b pb-1">
              PROJECTS
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="bg-[#0c3eff] py-3 pl-6 pr-6 rounded-lg text-white hover:bg-blue-600 transition ml-12"
            >
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`sm:hidden fixed top-[88px] left-0 w-full h-screen bg-black/90 backdrop-blur-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-12 p-6 text-lg font-semibold items-center">
          <li className="bg-white/10 backdrop-blur-md px-12 py-4 rounded-[20px]">
            <Link href="/" onClick={() => setOpen(false)}>
              HOME
            </Link>
          </li>
          <li className="bg-white/10 backdrop-blur-md px-12 py-4 rounded-[20px]">
            <Link href="/about" onClick={() => setOpen(false)}>
              ABOUT
            </Link>
          </li>
          <li className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-[20px]">
            <Link href="/projects" onClick={() => setOpen(false)}>
              PROJECTS
            </Link>
          </li>
          <li className="">
            <Link
              href="/contact"
              className="bg-[#0c3eff] py-3 pl-6 pr-6 rounded-lg text-white hover:bg-blue-600 transition"
            >
              CONTACT US
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
