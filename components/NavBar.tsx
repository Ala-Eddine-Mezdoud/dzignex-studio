"use client";

import Image from "next/image";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-dzignex-blue/10 h-16 font-semibold relative">
      
      <div className="container mx-auto flex justify-between items-center h-full px-4 sm:px-6 md:px-10">
        
        {/* Logo */}
        <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 relative">
          <Image src={"/dzignex_logo.svg"} fill alt="logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-[18px]">
          <div>HOME</div>
          <div>ABOUT US</div>
          <div>PROJECTS</div>
        </div>

        {/* CTA */}
        <div className="hidden md:block bg-dzignex-blue px-4 py-2">
          CONTACT US
        </div>

        {/* Hamburger */}
        <button
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
        <div className="flex flex-col items-center gap-6 text-lg">
          <div onClick={() => setOpen(false)}>HOME</div>
          <div onClick={() => setOpen(false)}>ABOUT US</div>
          <div onClick={() => setOpen(false)}>PROJECTS</div>

          <div className="bg-dzignex-blue px-6 py-2 mt-2">
            CONTACT US
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;