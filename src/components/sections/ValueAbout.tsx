import React from 'react'
import Image from 'next/image'

const ValueAbout = () => {
  return (
    <div className='text-white'>

        <h1 className='whitespace-pre-line text-[54px] tracking-[-1.9px] leading-[50px] mb-[56px] w-full text-center sm:text-left'>
            {"Values That \nDefine Us"}
        </h1>

        <div className='flex flex-wrap gap-5'>
            <div className='flex justify-between  flex-wrap gap-[20px] w-full bg-[#0C3EFF]/10 p-[20px] border border-[#f3f6ff]/10 rounded-[20px]'>
                <div className='flex gap-[24px] sm:gap-[40px] items-center '>
                    <Image
                      src="/glass icon.svg"
                      alt="value1"
                      width={92}
                      height={92}
                      className="w-[64px] h-[64px] sm:w-[92px] sm:h-[92px]"
                    />
                    <p className='sm:text-[24px] text-[28px] whitespace-pre-line font-medium tracking-[-1px] leading-[30px]'>{"Specialized \nExpertise"}</p>
                </div>
                <div className='sm:whitespace-pre-line text-[16px] sm:text-[18px] w-full sm:w-auto text-[#f3f6ff]/80'>
                    {"Our three co-founders bring senior-level skills across \nBranding, Packaging, and UI/UX. Diverse backgrounds merge \ninto one unified creative vision."}
                </div>
            </div>
            <div className='flex justify-between  flex-wrap gap-[20px] w-full bg-[#0C3EFF]/10 p-[20px] border border-[#f3f6ff]/10 rounded-[20px]'>
                <div className='flex gap-[24px] sm:gap-[40px] items-center '>
                    <Image
                      src="/glass icon1.svg"
                      alt="value1"
                      width={92}
                      height={92}
                      className="w-[64px] h-[64px] sm:w-[92px] sm:h-[92px]"
                    />
                    <p className='sm:text-[24px] text-[28px] whitespace-pre-line font-medium tracking-[-1px] leading-[30px]'>{"Client \nSatisfaction"}</p>
                </div>
                <div  className='sm:whitespace-pre-line  text-[16px] sm:text-[18px] w-full sm:w-auto text-[#f3f6ff]/80'>
                    {"Our three co-founders bring senior-level skills across \nBranding, Packaging, and UI/UX. Diverse backgrounds merge \ninto one unified creative vision."}
                </div>
            </div>
            <div className='flex justify-between  flex-wrap gap-[20px] w-full bg-[#0C3EFF]/10 p-[20px] border border-[#f3f6ff]/10 rounded-[20px]'>
                <div className='flex gap-[24px] sm:gap-[40px] items-center '>
                    <Image
                      src="/glass icon2.svg"
                      alt="value1"
                      width={92}
                      height={92}
                      className="w-[64px] h-[64px] sm:w-[92px] sm:h-[92px]"
                    />
                    <p className='sm:text-[24px] text-[28px] whitespace-pre-line font-medium tracking-[-1px] leading-[30px]'>{"Long-Term \nRelationships"}</p>
                </div>
                <div  className='sm:whitespace-pre-line  text-[16px] sm:text-[18px] w-full sm:w-auto text-[#f3f6ff]/80'>
                    {"Our three co-founders bring senior-level skills across \nBranding, Packaging, and UI/UX. Diverse backgrounds merge \ninto one unified creative vision."}
                </div>
            </div>
            <div className='flex justify-between  flex-wrap gap-[20px] w-full bg-[#0C3EFF]/10 p-[20px] border border-[#f3f6ff]/10 rounded-[20px]'>
                <div className='flex gap-[24px] sm:gap-[40px] items-center '>
                    <Image
                      src="/glass icon3.svg"
                      alt="value1"
                      width={92}
                      height={92}
                      className="w-[64px] h-[64px] sm:w-[92px] sm:h-[92px]"
                    />
                    <p className='sm:text-[24px] text-[28px] whitespace-pre-line font-medium tracking-[-1px] leading-[30px]'>{"Collaboration \nDrive Us"}</p>
                </div>
                <div  className='sm:whitespace-pre-line  text-[16px] sm:text-[18px] w-full sm:w-auto text-[#f3f6ff]/80'>
                    {"Our three co-founders bring senior-level skills across \nBranding, Packaging, and UI/UX. Diverse backgrounds merge \ninto one unified creative vision."}
                </div>
            </div>

        </div>

    </div>
  )
}

export default ValueAbout