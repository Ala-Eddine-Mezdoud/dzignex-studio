import ContactForm from "../../../features/contact/components/ContactForm";
import { SiFacebook, SiInstagram, SiLinkedin, SiTiktok, SiX, SiYoutube } from "react-icons/si";

const socialLinks = [
  { icon: SiX, label: "X", href: "#" },
  { icon: SiLinkedin, label: "LinkedIn", href: "#" },
  { icon: SiYoutube, label: "YouTube", href: "#" },
  { icon: SiInstagram, label: "Instagram", href: "#" },
  { icon: SiTiktok, label: "TikTok", href: "#" },
  { icon: SiFacebook, label: "Facebook", href: "#" },
] as const;

const Page = () => {
  return (
    <div className="min-h-screen bg-dzignex-black text-white">
      {/* Hero Section */}
      <div className="border-b-2 border-dzignex-white/15">
        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-bold tracking-tighter leading-none">
              Let&apos;s build <br />
              something <span className="text-dzignex-blue">[extraordinary]</span>
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl lg:text-2xl font-medium text-dzignex-white/80 mt-8">
              Fill out the form below and we&apos;ll get back to you within 24-48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="border-b-2 border-dzignex-white/15">
        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Side: Contact Info */}
            <div className="lg:col-span-5 space-y-12 hidden lg:block">
              <div>
                <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-dzignex-blue mb-6">/Contact Details</h2>
                <div className="space-y-4">
                  <p className="text-2xl md:text-3xl font-bold tracking-tight underline underline-offset-8 decoration-dzignex-white/20 hover:decoration-dzignex-blue transition-colors cursor-pointer">
                    dzignex.studio@gmail.com
                  </p>
                  <p className="text-2xl md:text-3xl font-bold tracking-tight underline underline-offset-8 decoration-dzignex-white/20 hover:decoration-dzignex-blue transition-colors cursor-pointer">
                    +213 (0) 555 123 456
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-dzignex-blue mb-6">/Social Networks</h2>
                <ul className="grid grid-cols-3 sm:flex sm:flex-wrap gap-4">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        className="border-2 border-dzignex-white/20 h-14 w-14 flex items-center justify-center text-dzignex-white hover:border-dzignex-blue hover:text-dzignex-blue transition-all"
                      >
                        <Icon className="size-6" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-dzignex-blue mb-6">/Location</h2>
                <p className="text-xl font-bold uppercase tracking-tight">
                  Algiers, Algeria <br />
                  <span className="text-dzignex-white/40 font-medium">Global Studio / Remote Ready</span>
                </p>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;