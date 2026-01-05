import { FaqsDemo } from '../FaqsDemo'
import Header from "../Header"

const Faqs = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden   border-t border-b border-grey'>

      <div className='mx-auto w-full max-w-7xl border-l border-r border-grey pt-16'>

        <Header
          microTitle="FAQs"
          title="Frequently Asked Questions"
          description={`Every project follows a proven path from discovery to delivery \nensuring your vision becomes an unforgettable reality.`}
        />
        <FaqsDemo />

      </div>

    </div>
  )
}

export default Faqs
