import LogoLoop from "../../../components/LogoLoop"

// Logo images from public/logos
const imageLogos = [
  { src: "/logos/Dermology logo 1 2.svg", alt: "Dermology", href: "#" },
  { src: "/logos/Logo 1.svg", alt: "Partner 1", href: "#" },
  { src: "/logos/Logo 2.svg", alt: "Partner 2", href: "#" },
  { src: "/logos/Logo 3.svg", alt: "Partner 3", href: "#" },
  { src: "/logos/Logo 4.svg", alt: "Partner 4", href: "#" },
  { src: "/logos/Logo 5.svg", alt: "Partner 5", href: "#" },
  { src: "/logos/Logo 6.svg", alt: "Partner 6", href: "#" },
  { src: "/logos/Logo 7.svg", alt: "Partner 7", href: "#" },
  { src: "/logos/Ops-First Horizontal logo 9.svg", alt: "Ops-First", href: "#" },
];


const Logos = () => {
  return (
    <div className="border-t-2 border-b-2 border-dzignex-white/15 ">
        <div className="container mx-auto border-l-2 border-r-2 border-dzignex-white/15 py-4 md:py-6 px-4 md:px-0">

                  <LogoLoop
                    logos={imageLogos}
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