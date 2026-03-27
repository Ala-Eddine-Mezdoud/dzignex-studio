import Image from "next/image"

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
                  <li>[HOME]</li>
                  <li>[about us]</li>
                  <li>[projects]</li>
                  <li>[contact]</li>
                </ul>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex align-bottom items-end justify-between">
                <div className="text-[220px] font-bold tracking-[-0.08em]">DZIGNEX </div>
                <p className="text-xl font-medium tracking-[-0.08em] mb-20">All rights reserved © 2026.</p>
              </div>
              <div className="flex align-bottom items-end justify-between -mt-32">
                <div className="mb-8">
                  <ul className="flex gap-2">
                    <li className="border-2 border-dzignex-white h-12 w-12"></li>
                    <li className="border-2 border-dzignex-white h-12 w-12"></li>
                    <li className="border-2 border-dzignex-white h-12 w-12"></li>
                    <li className="border-2 border-dzignex-white h-12 w-12"></li>
                    <li className="border-2 border-dzignex-white h-12 w-12"></li>
                    <li className="border-2 border-dzignex-white h-12 w-12"></li>
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