import LogoLoop from "../../../components/LogoLoop"

// Logo images from public/logos
const imageLogos = [
  { src: "/logos/Auravita Logo.svg", alt: "Auravita", href: "#" },
  { src: "/logos/Avure.svg", alt: "Avure", href: "#" },
  { src: "/logos/Dermology logo 1 2 1.svg", alt: "Dermology", href: "#" },
  { src: "/logos/Estidama.svg", alt: "Estidama", href: "#" },
  { src: "/logos/Formura.svg", alt: "Formura", href: "#" },
  { src: "/logos/Ops-First.svg", alt: "Ops-First", href: "#" },
  { src: "/logos/Ravelle.svg", alt: "Ravelle", href: "#" },
  { src: "/logos/Saffron Brew.svg", alt: "Saffron Brew", href: "#" },
  { src: "/logos/Swift Med.svg", alt: "Swift Med", href: "#" },
  { src: "/logos/Vectorial.svg", alt: "Vectorial", href: "#" },
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