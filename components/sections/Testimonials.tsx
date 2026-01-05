import Image from "next/image"
import Header from "../Header"

const Testimonials = () => {
  return (
    <div className='relative w-full max-w-7xl mx-auto border-l border-r border-grey '>

      <div className="pt-16 text-white">


        <Header
          microTitle="Testimonials"
          title="What Our Clients Say"
          description={`Every project follows a proven path from discovery to delivery \nensuring your vision becomes an unforgettable reality.`}
        />
        <div className="w-full mt-16 space-y-5">
          {/* Testimonial */}
          <div className="w-full flex bg-grey">
            <div className="w-full p-5">
              <div>
                <Image src="/testimonials.svg" alt="testimonials" width={54} height={44} />
                <p className="mt-5">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
              </div>
              <div className="flex gap-5 items-center mt-16">

                <div className="h-12 w-12 rounded-full overflow-hidden relative">
                  <Image src="/profile_ala.png" alt="avatar" fill className="object-cover" />
                </div>

                <div>
                  <h1>Abdennour. A</h1>
                  <p>Founder, Avure Skincare</p>
                </div>
              </div>

            </div>

            <div className="w-full border-l border-grey-secondary/50 p-5 flex justify-end items-end flex-wrap">
              <div>
                <h1 className="w-full text-right text-7xl">+12</h1>
                <p className="w-full">Months partnership</p>
              </div>
            </div>


          </div>
          {/* Testimonial */}
          <div className="w-full flex bg-grey">
            <div className="w-full p-5">
              <div>
                <Image src="/testimonials.svg" alt="testimonials" width={54} height={44} />
                <p className="mt-5">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
              </div>
              <div className="flex gap-5 items-center mt-16">
                <div className="h-12 w-12 rounded-full overflow-hidden relative">
                  <Image src="/profile_ala.png" alt="avatar" fill className="object-cover" />
                </div>
                <div>
                  <h1>Abdennour. A</h1>
                  <p>Founder, Avure Skincare</p>
                </div>
              </div>

            </div>

            <div className="w-full border-l border-grey-secondary/50 p-5 flex justify-end items-end flex-wrap">
              <div>
                <h1 className="w-full text-right text-7xl">+12</h1>
                <p className="w-full">Months partnership</p>
              </div>
            </div>


          </div>
          {/* Testimonial */}
          <div className="w-full flex bg-grey">
            <div className="w-full p-5">
              <div>
                <Image src="/testimonials.svg" alt="testimonials" width={54} height={44} />
                <p className="mt-5">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design. You perfectly captured our vision at Avure and translated it into a strong visual identity. A talented and dedicated partner we highly recommend. Thank you for your great work!</p>
              </div>
              <div className="flex gap-5 items-center mt-16">
                <div className="h-12 w-12 rounded-full overflow-hidden relative">
                  <Image src="/profile_ala.png" alt="avatar" fill className="object-cover" />
                </div>
                <div>
                  <h1>Abdennour. A</h1>
                  <p>Founder, Avure Skincare</p>
                </div>
              </div>

            </div>

            <div className="w-full border-l border-grey-secondary/50 p-5 flex justify-end items-end flex-wrap">
              <div>
                <h1 className="w-full text-right text-7xl">+12</h1>
                <p className="w-full">Months partnership</p>
              </div>
            </div>


          </div>


        </div>

      </div>


    </div>
  )
}

export default Testimonials