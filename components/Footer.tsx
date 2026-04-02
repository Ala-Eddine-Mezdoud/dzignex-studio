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
    <div className="w-full h-screen bg-[url('/footerBg.png')] overflow-hidden">

        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 p-16">
            <div>
              <Image src="/dzignex_logo.svg" alt="footer logo" width={100} height={100} />
            </div>

            <div className="mt-16 flex justify-between">
              <div className="flex flex-col justify-between">
                <div className="font-bold text-2xl tracking-tighter underline underline-offset-8">dzignex.studio@gmail.com</div>
                <div className="flex justify-between font-medium underline underline-offset-8">
                  <p>Terms of Services</p>
                  <p>Privacy Policy</p>
                </div>
              </div>
              <div>
                <ul className="uppercase text-3xl font-bold space-y-1">
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

            <div className="mt-16">
              <div className="flex align-bottom items-end justify-between">
                <div className="text-[220px] font-bold tracking-[-0.08em]">DZIGNEX </div>
                <p className="text-xl font-medium tracking-[-0.08em] mb-20">All rights reserved © 2026.</p>
              </div>
              <div className="flex align-bottom items-end justify-between -mt-32">
                {/* Social Media Icons */}
                <div className="mb-8">
                  <ul className="flex flex-wrap gap-2">
                    {socialLinks.map(({ icon: Icon, label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          aria-label={label}
                          className="border-2 border-dzignex-white h-12 w-12 flex items-center justify-center text-dzignex-white hover:opacity-80 transition-opacity"
                        >
                          <Icon className="size-6" aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-[220px] font-bold tracking-[-0.08em] -mb-16">STUDIO</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Footer