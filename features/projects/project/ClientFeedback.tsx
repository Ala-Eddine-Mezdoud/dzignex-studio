import Image from "next/image"

interface ClientFeedbackProps {
  testimonial: {
    authorName: string;
    authorRole: string | null;
    authorCompany: string | null;
    authorAvatarUrl: string | null;
    feedbackText: string;
    statValue: string | null;
    statLabel: string | null;
  } | null;
}

const ClientFeedback = ({ testimonial }: ClientFeedbackProps) => {
  if (!testimonial) return null;

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-5 sm:px-8 md:px-10 lg:px-16 md:py-24 lg:py-32">

        <div className="flex flex-col md:grid md:grid-cols-6 gap-8">
          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase shrink-0">
            [Client Feedback]
          </p>

          {/* Section Sub Title */}
          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 w-full">
            <p className="text-dzignex-white tracking-tighter text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
              What our partners say about the collaboration
            </p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="w-full bg-dzignex-blue/5 border border-dzignex-white/15 mt-20 md:mt-32 flex flex-col lg:grid lg:grid-cols-5 p-6 md:p-12 gap-10">

            <div className="w-full lg:col-span-3 lg:border-r-2 lg:border-dzignex-white/15 lg:pr-16">
              <div>
                <Image src="/comment.svg" alt="Quote" width={48} height={48} className="opacity-50" />
                <p className="mt-8 text-lg md:text-2xl text-dzignex-white/90 tracking-tight leading-relaxed whitespace-pre-wrap">
                  {testimonial.feedbackText}
                </p>
              </div>

              <div className="mt-12 md:mt-16">
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    {testimonial.authorAvatarUrl ? (
                      <div className="rounded-full overflow-hidden w-12 h-12 md:w-16 md:h-16 border-2 border-dzignex-blue/30">
                        <img 
                          src={testimonial.authorAvatarUrl} 
                          alt={testimonial.authorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="rounded-full bg-dzignex-blue/20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-bold text-dzignex-blue">
                        {testimonial.authorName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h1 className="text-dzignex-white text-xl md:text-2xl font-bold tracking-tighter uppercase">{testimonial.authorName}</h1>
                      <p className="text-dzignex-white/60 text-sm md:text-base">
                        {[testimonial.authorRole, testimonial.authorCompany].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex lg:justify-end items-end lg:col-span-2">
              <div className="text-end w-full">
                <h1 className="text-dzignex-white text-6xl md:text-8xl font-black tracking-tighter flex items-center justify-end"> 
                  <span className="text-dzignex-blue mr-2">+</span>
                  {testimonial.statValue || "0"}
                </h1>
                <p className="text-dzignex-white/80 text-sm md:text-2xl tracking-tight uppercase font-bold">
                  {testimonial.statLabel || "Growth Achieved"}
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ClientFeedback