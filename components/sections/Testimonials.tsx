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
        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial */}
          <div className="w-full border-grey border-t border-b border-r">
            <div className="w-full p-5">
              <div>
                <Image src="/testimonials.svg" alt="testimonials" width={54} height={44} />
                <p className="mt-5">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design.</p>
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
          </div>
          {/* Testimonial */}
          <div className="w-full border-grey border-t border-b border-r">
            <div className="w-full p-5">
              <div>
                <Image src="/testimonials.svg" alt="testimonials" width={54} height={44} />
                <p className="mt-5">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design.</p>

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
          </div>
          {/* Testimonial */}
          <div className="w-full border-grey border-t border-b">
            <div className="w-full p-5">
              <div>
                <Image src="/testimonials.svg" alt="testimonials" width={54} height={44} />
                <p className="mt-5">We've been working with Dzignex Studio for months and we are truly impressed by your professionalism, responsiveness, and eye for modern, minimalist design.</p>

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
          </div>


        </div>

      </div>


    </div>
  )
}

export default Testimonials