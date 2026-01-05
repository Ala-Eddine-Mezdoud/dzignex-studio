import { FaqsDemo } from '../FaqsDemo'

const Faqs = () => {
  return (
    <div className='relative w-full  flex justify-center  overflow-hidden   border-t border-b border-grey'>

      <div className='mx-auto w-full max-w-7xl border-l border-r border-grey pt-16'>

        {/* Foreground content */}

        <div className=" flex justify-center items-center flex-wrap gap-[40px] text-center text-white mb-20 w-full">

          <div className='w-full flex flex-wrap justify-center '>
            <h1 className='text-sm text-blue font-bold uppercase'>FAQs</h1>
          </div>

          <div className='w-full flex justify-center'>
            <h1 className="text-white text-[35px] whitespace-pre-line sm:text-[40px] tracking-[-2px] leading-[42px] font-medium  sm:w-[33%]">
              Frequently Asked Questions
            </h1>
          </div>

          <p className="text-base sm:text-lg lg:text-[16px] text-[#f3f6ff]/60 max-w-2xl mx-auto sm:w-[33%] w-full text-[15px] -mt-[20px]">
            Got questions? Find quick answers to the most common inquiries right here in our FAQ.
          </p>

        </div>

        <div className=''>
          <FaqsDemo />
        </div>

      </div>

    </div>
  )
}

export default Faqs
