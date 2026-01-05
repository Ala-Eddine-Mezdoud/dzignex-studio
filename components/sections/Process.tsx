import { DotPattern } from "../ui/dot-pattern"
import { AnimatedBeamDemo } from '../Beam'
import { cn } from "../../lib/utils"
import Header from "../Header"


const Process = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden border-t border-b border-grey '>

      <div className='mx-auto max-w-7xl border-l border-r border-grey pt-16'>


        <Header
          microTitle="Process"
          title="We Drive the Process, You Focus On Business"
          description={`Every project follows a proven path from discovery to delivery \nensuring your vision becomes an unforgettable reality.`}
        />
        {/* Foreground content */}
        <div className="w-full relative">

          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] absolute top-0 left-0"
            )}
          />

          <AnimatedBeamDemo />


        </div>

      </div>

    </div>
  )
}

export default Process
