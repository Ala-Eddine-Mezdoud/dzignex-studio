import Image from "next/image"
import Link from "next/link"
import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si"

const socialLinks = [
  { icon: SiX, label: "X", href: "#" },
  { icon: SiLinkedin, label: "LinkedIn", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiTiktok, label: "TikTok", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
] as const

const Footer = () => {
  return (
    <div className="w-full min-h-screen bg-[url('/footerBg.png')] overflow-hidden">

        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 p-6 lg:p-16">
            <div>
              <Image src="/dzignex_logo.svg" alt="footer logo" width={100} height={100} />
            </div>

            <div className="mt-8 lg:mt-16 flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-0">
              <div className="flex flex-col gap-4 lg:gap-0 lg:justify-between">
                <div className="font-bold text-lg lg:text-2xl tracking-tighter underline underline-offset-8">dzignex.studio@gmail.com</div>
                <div className="flex gap-4 lg:gap-0 lg:justify-between font-medium underline underline-offset-8">
                  <p>Terms of Services</p>
                  <p>Privacy Policy</p>
                </div>
              </div>
              <div>
                <ul className="uppercase text-xl lg:text-3xl font-bold space-y-1">
                  <li>
                    <Link href="/" className="hover:text-dzignex-blue transition-colors">
                      [HOME]
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-dzignex-blue transition-colors">
                      [about us]
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" className="hover:text-dzignex-blue transition-colors">
                      [projects]
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-dzignex-blue transition-colors">
                      [contact]
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 lg:mt-16 hidden lg:block">
              <div className="flex flex-col lg:flex-row lg:align-bottom lg:items-end lg:justify-between lg:mb-8">
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[220px] font-bold tracking-[-0.08em]">DZIGNEX </div>

                  <p className="text-sm lg:text-xl font-medium tracking-[-0.08em] lg:mb-12 mt-4 lg:mt-0">All rights reserved © 2026.</p>

              </div>
              <div className="flex flex-col lg:flex-row lg:align-bottom lg:items-end lg:justify-between lg:-mt-16">
                {/* Social Media Icons */}
                <div className="lg:mb-0 order-2 lg:order-1 mt-6 lg:mt-0">
                  <ul className="flex flex-wrap gap-2">
                    {socialLinks.map(({ icon: Icon, label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          aria-label={label}
                          className="border-2 border-dzignex-white h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center text-dzignex-white hover:opacity-80 transition-opacity"
                        >
                          <Icon className="size-5 lg:size-6" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[220px] font-bold tracking-[-0.08em] lg:-mb-16 order-1 lg:order-2">STUDIO</div>
              </div>
            </div>

            <div className="mt-12 lg:mt-16 block lg:hidden">
              <div className="flex flex-col lg:flex-row lg:align-bottom lg:items-end lg:justify-between lg:mb-8">
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[220px] font-bold tracking-[-0.08em]">DZIGNEX </div>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[220px] font-bold tracking-[-0.08em] lg:-mb-16 order-1 lg:order-2">STUDIO</div>


              </div>
              <div className="flex flex-col lg:flex-row lg:align-bottom lg:items-end lg:justify-between lg:-mt-16">
                {/* Social Media Icons */}
                <div className="lg:mb-0 order-2 lg:order-1 mt-6 lg:mt-0">
                  <ul className="flex flex-wrap gap-2">
                    {socialLinks.map(({ icon: Icon, label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          aria-label={label}
                          className="border-2 border-dzignex-white h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center text-dzignex-white hover:opacity-80 transition-opacity"
                        >
                          <Icon className="size-5 lg:size-6" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
                <p className="text-sm lg:text-xl font-medium tracking-[-0.08em] lg:mb-12 mt-4 lg:mt-0">All rights reserved © 2026.</p>

            </div>
        </div>
    </div>
  )
}

export default Footer