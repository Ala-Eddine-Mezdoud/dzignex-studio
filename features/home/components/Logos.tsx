import LogoLoop from "../../../components/LogoLoop"

import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Alternative with image sources
const imageLogos = [
  { src: "/logos/company1.png", alt: "Company 1", href: "https://company1.com" },
  { src: "/logos/company2.png", alt: "Company 2", href: "https://company2.com" },
  { src: "/logos/company3.png", alt: "Company 3", href: "https://company3.com" },
];


const Logos = () => {
  return (
    <div className="border-t-2 border-b-2 border-dzignex-white/15 ">
        <div className="container mx-auto border-l-2 border-r-2 border-dzignex-white/15 py-4 md:py-6 px-4 md:px-0">

                  <LogoLoop
                    logos={techLogos}
                    speed={100}
                    direction="left"
                    logoHeight={40}
                    gap={60}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#000000"
                    ariaLabel="Technology partners"
                    className="border-none"
                    />
          </div>
    </div>
  )
}

export default Logos;