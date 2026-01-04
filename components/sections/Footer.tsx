import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#000115] text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-between">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Dzignex <span className="font-normal">Studio</span>
          </h2>
          <p className="mt-6">dzignex.studio@gmail.com</p>
        </div>

        <div className="flex flex-wrap justify-between text-[16px] text-[#f3f6ff]  w-[339px]">

        {/* Quick Links */}
        <div className="">
          <h3 className="text-[#f3f6ff] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[#f3f6ff]/60">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Portfolio</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-[#f3f6ff] font-semibold mb-4">Social</h3>
          <ul className="space-y-2 text-[#f3f6ff]/60" >
            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">Facebook</a></li>
            <li><a href="#" className="hover:text-white">Behance</a></li>
            <li><a href="#" className="hover:text-white">Twitter (X)</a></li>
          </ul>
        </div>
      </div>
        </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Dzignex Studio</p>
        <div className="flex gap-[52px] text-[16px] text-[#f3f6ff]/60 mt-4 md:mt-0">
          <span>All Rights Reserved</span>
          <a href="#" className="hover:text-white">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
