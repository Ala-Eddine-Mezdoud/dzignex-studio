import React from "react";

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[90%]  p-8 rounded-2xl bg-black border border-[#f3f6ff]/10 relative shadow-[0_0_80px_#0c3eff] ">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-[#f3f6ff]">Full Name*</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="p-3 rounded-md bg-[#0c0c1d] text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-[#f3f6ff]">Email Address*</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-3 rounded-md bg-[#0c0c1d] text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-[#f3f6ff]">Company / Business Name*</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="p-3 rounded-md bg-[#0c0c1d] text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-[#f3f6ff]">Industry*</label>
            <select className="p-3 rounded-md bg-[#0c0c1d] text-white outline-none">
              <option value="">Select your industry</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="health">Healthcare</option>
              <option value="education">Education</option>
            </select>
          </div>

          {/* Service Required */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-[#f3f6ff]">Service Required*</label>
            <select className="p-3 rounded-md bg-[#0c0c1d] text-white outline-none">
              <option value="">Select your service</option>
              <option value="web">Web Development</option>
              <option value="design">UI/UX Design</option>
              <option value="mobile">Mobile App</option>
            </select>
          </div>

          {/* Project Budget */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-[#f3f6ff]">Project Budget*</label>
            <select className="p-3 rounded-md bg-[#0c0c1d] text-white outline-none">
              <option value="">Select your range</option>
              <option value="1k-5k">$1,000 - $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k+">$10,000+</option>
            </select>
          </div>

          {/* Project Details */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-medium text-[#f3f6ff]">Project Details*</label>
            <textarea
              rows={5}
              placeholder="Let us know about your project idea"
              className="p-3 rounded-md bg-[#0c0c1d] text-white placeholder-gray-400 outline-none"
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
