'use client'

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        sticky top-0 z-50 w-full 
        bg-white/10 backdrop-blur-2xl 
        border-b border-white/5
        text-white
      "
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <span className="font-bold text-xl">Dzignex Studio</span>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 list-none m-0 p-0">
          <li>About</li>
          <li>Projects</li>
          <li>Testimonials</li>
          <li>
            <a
              href="/contact"
              className="bg-blue-500 px-3 py-2 rounded-lg text-white hover:bg-blue-600 transition"
            >
              Contact
            </a>
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
      {open && (
        <div className="sm:hidden bg-black/80 backdrop-blur-xl border-t border-white/5 px-4 py-3">
          <ul className="flex flex-col gap-4">
            <li>About</li>
            <li>Projects</li>
            <li>Testimonials</li>
            <li>
              <a
                href="/contact"
                className="bg-blue-500 block text-center px-3 py-2 rounded-lg text-white hover:bg-blue-600 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
