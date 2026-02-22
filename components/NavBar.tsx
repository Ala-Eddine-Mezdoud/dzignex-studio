import Image from "next/image"

const NavBar = () => {
  return (
    <div className="bg-dzignex-blue/10 h-16 font-semibold">
        <div className="container mx-auto flex justify-between items-center h-full">
            <div className="h-32 w-32 relative">
                <Image src={'/dzignex_logo.svg'} fill alt="logo" />
            </div>
            <div className="flex gap-6 text-[18px]">
                <div>HOME</div>
                <div>ABOUT US</div>
                <div>PROJECTS</div>
            </div>
            <div className="bg-dzignex-blue px-4 py-2">
                CONTACT US
            </div>
        </div>
    </div>
  )
}

export default NavBar