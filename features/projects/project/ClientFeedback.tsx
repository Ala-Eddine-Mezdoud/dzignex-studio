import Image from "next/image"

const values = [
  { number: "01", title: "Specialized Expertise", description: "Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
  { number: "02", title: "Clear Process", description: " Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
  { number: "03", title: "Real Collaboration", description: " Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
  { number: "04", title: "Built to Scale", description: "Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision. " },
  { number: "05", title: "Honest Work", description: " Our team brings senior-level skills across Branding, Packaging, Editing and UI/UX Diverse backgrounds merge into one unified creative vision." },
]

const ClientFeedback = () => {


  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-5 sm:px-8 md:px-10 lg:px-16 md:py-24 lg:py-32">

        <div className="flex flex-col md:grid md:grid-cols-6 gap-8">

          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase shrink-0">
            [Our Values]
          </p>

          {/* Section Sub Title */}
          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 w-full">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
              What our clients say
            </p>
          </div>

        </div>

        {/* Testimonial */}
        <div className="w-full bg-dzignex-blue/5 border border-dzignex-white/15 mt-32 grid grid-cols-5 p-8">

            <div className="w-full border-r-2 border-dzignex-white/15 pr-16 col-span-3">
              <div>
                <Image src="/comment.svg" alt="Client Feedback" width={60} height={60} />
                <p className="mt-8 text-xl text-dzignex-white/90 tracking-tight ">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design.
                <br /> <br />
                You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
              </div>

              <div className="mt-16">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div className="rounded-full bg-dzignex-blue w-10 h-10 md:w-12 md:h-12"></div>
                    <div>
                      <h1 className="text-dzignex-white text-xl md:text-2xl font-medium tracking-tighter">Abdennour.A</h1>
                      <p className="text-dzignex-white/60 text-sm md:text-base">Founder, Avure Skincare</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>



            <div className="w-full flex justify-end items-end col-span-2">
              <div>
                <h1 className="text-dzignex-white text-4xl md:text-8xl font-semibold tracking-tighter text-end"> <span className="text-dzignex-blue">+</span>12</h1>
                <p className="text-dzignex-white text-sm md:text-2xl tracking-tighter">Months Partnership</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ClientFeedback