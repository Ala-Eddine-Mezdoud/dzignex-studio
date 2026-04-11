'use client'

interface AboutProps {
  project: {
    thumbnailUrl: string | null;
    description: string | null;
    services: string[] | null;
  }
}

const About = ({ project }: AboutProps) => {
  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 px-5 sm:px-8 md:px-10 lg:px-16 md:py-24 lg:py-32">

        <div className="flex flex-col md:grid md:grid-cols-6 gap-8">

          {/* Section Title */}
          <p className="md:col-span-2 text-dzignex-blue font-bold text-base md:text-xl lg:text-2xl tracking-tight uppercase shrink-0">
            [About]
          </p>

          {/* Content */}
          <div className="md:col-span-4 flex flex-col w-full border border-dzignex-white/15">
                <div className="aspect-video w-full relative overflow-hidden bg-dzignex-blue/5">
                    {project.thumbnailUrl ? (
                      <img 
                        src={project.thumbnailUrl} 
                        alt="Project Overview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-dzignex-blue/10" />
                    )}
                </div>
                <div className="border-t border-dzignex-white/15 p-6 font-medium text-dzignex-white leading-relaxed whitespace-pre-wrap">
                    {project.description || "No project description provided."}
                </div>
                {project.services && project.services.length > 0 && (
                  <div className="px-6 pb-6">
                      <div className="border-t border-dzignex-white/15 py-6">
                          <h1 className="uppercase font-bold text-xl mb-4">Services</h1>
                          <ul className="flex flex-wrap gap-3 font-medium">
                              {project.services.map((service, idx) => (
                                <li key={idx} className="border border-dzignex-white/15 px-3 py-1 text-sm uppercase tracking-wider">
                                  {service}
                                </li>
                              ))}
                          </ul>
                      </div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About