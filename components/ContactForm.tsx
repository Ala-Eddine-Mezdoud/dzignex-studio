import React from "react";

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[90%]  p-8 rounded-2xl bg-black border border-[#f3f6ff]/10 relative shadow-[0_0_80px_#0c3eff] ">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Full Name*</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="p-3 rounded-md bg-[#0c0c1d] h-[56px] border border-[#f3f6ff]/10 text-white placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff]"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Email Address*</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-3 rounded-md bg-[#0c0c1d] h-[56px] border border-[#f3f6ff]/10 text-white placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff]"
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Company / Business Name*</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="p-3 rounded-md bg-[#0c0c1d] h-[56px] border border-[#f3f6ff]/10 text-white placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff]"
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Industry*</label>
            <div className="relative">
              <select
                className="p-3 rounded-md bg-[#0c0c1d] h-[56px] border border-[#f3f6ff]/10 text-[#f3f6ff]/60 placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff] outline-none appearance-none w-full  pr-10"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              >
                <option value="">Select your industry</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="health">Healthcare</option>
                <option value="education">Education</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f3f6ff]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Service Required*</label>
            <div className="relative">
              <select
                className="p-3 rounded-md bg-[#0c0c1d] h-[56px] border border-[#f3f6ff]/10 text-[#f3f6ff]/60 placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff] outline-none appearance-none w-full pr-10"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              >
                <option value="">Select your service</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="health">Healthcare</option>
                <option value="education">Education</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f3f6ff]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Projet Budget*</label>
            <div className="relative">
              <select
                className="p-3 rounded-md bg-[#0c0c1d] h-[56px] border border-[#f3f6ff]/10 text-[#f3f6ff]/60 placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff] outline-none appearance-none w-full pr-10"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              >
                <option value="">Select your range</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="health">Healthcare</option>
                <option value="education">Education</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f3f6ff]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>



          {/* Project Details */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-medium  text-[18px] leading-[24px] tracking-[-1px] text-[#f3f6ff]">Project Details*</label>
            <textarea
              rows={5}
              placeholder="Let us know about your project idea"
              className="p-3 rounded-md bg-[#0c0c1d] h-[180px] border border-[#f3f6ff]/10 text-white placeholder-[#f3f6ff]/60 placeholder-tracking-[-1px] placeholder-tracking-[20px] placeholder-[16px] outline-none focus:border-[#0c3eff]"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-[#0c3eff] px-6 py-2 sm:py-3  w-full sm:px-4 text-lg rounded-lg font-semibold text-[#F3F6FF]"
            >
              Submit Now!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
