"use client"
import { ArrowUpRight } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../../../components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import { useState } from "react"
import { toast } from "sonner"
import { submitContactForm } from "../actions/submit-contact-form"

const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  whatsappNumber: z.string().min(8, {
    message: "Please enter a valid WhatsApp number.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  industry: z.string().min(1, "Please select an industry."),
  serviceRequired: z.string().min(1, "Please select a service."),
  websiteOrInstagram: z.string().optional(),
  budgetRange: z.string().optional(),
  challenges: z.array(z.string()).optional(),
  mainGoal: z.array(z.string()).optional(),
  message: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      whatsappNumber: "",
      companyName: "",
      email: "",
      websiteOrInstagram: "",
      budgetRange: "",
      challenges: [],
      mainGoal: [],
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    
    try {
      const result = await submitContactForm(data)
      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        form.reset()
      } else {
        toast.error(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const industries = [
    "E-commerce",
    "SAAS",
    "Cosmetics",
    "Real Estate",
    "Other",
  ]

  const services = [
    "Branding & Visual Identity",
    "Packaging Design",
    "Social Media & Content Creation",
    "Video Editing",
    "Website Design & Development",
    "Other",
  ]

  const budgetRanges = [
    "Low",
    "Medium",
    "Premium",
    "Not sure yet",
  ]

  const challenges = [
    "I don't have a clear brand identity",
    "My brand looks unprofessional or inconsistent",
    "I'm launching a new brand or product",
    "I'm scaling and need a more professional image",
    "I've worked with designers before but wasn't satisfied",
    "Other",
  ]

  const mainGoals = [
    "Increase sales and conversions",
    "Improve profit margins",
    "Build or refine a strong brand identity",
    "Focus on high-performing creative content (design & visuals)",
    "Launch a new brand or product",
    "More professional online presence",
    "Enter new markets or audiences",
  ]

  const toggleChallenge = (value: string) => {
    const current = form.getValues("challenges") || []
    const updated = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value]
    form.setValue("challenges", updated, { shouldValidate: true })
  }

  const toggleMainGoal = (value: string) => {
    const current = form.getValues("mainGoal") || []
    const updated = current.includes(value)
      ? current.filter((g) => g !== value)
      : [...current, value]
    form.setValue("mainGoal", updated, { shouldValidate: true })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
            Full Name*
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            className="bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none"
            {...form.register("fullName")}
          />
          {form.formState.errors.fullName && (
            <p className="text-dzignex-red text-xs">{form.formState.errors.fullName.message}</p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <Label htmlFor="whatsappNumber" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
            WhatsApp Number*
          </Label>
          <Input
            id="whatsappNumber"
            placeholder="+1 234 567 890"
            className="bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none"
            {...form.register("whatsappNumber")}
          />
          {form.formState.errors.whatsappNumber && (
            <p className="text-dzignex-red text-xs">{form.formState.errors.whatsappNumber.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
            Company / Business Name*
          </Label>
          <Input
            id="companyName"
            placeholder="Your Company Co."
            className="bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none"
            {...form.register("companyName")}
          />
          {form.formState.errors.companyName && (
            <p className="text-dzignex-red text-xs">{form.formState.errors.companyName.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
            Email Address*
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-dzignex-red text-xs">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
            Industry*
          </Label>
          <Select onValueChange={(value: string) => form.setValue("industry", value)}>
            <SelectTrigger className="w-full bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none">
              <SelectValue placeholder="Select an Industry" />
            </SelectTrigger>
            <SelectContent className="bg-dzignex-black border-dzignex-white/20 text-white rounded-none">
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind} className="focus:bg-dzignex-blue focus:text-white uppercase text-xs font-bold tracking-widest">
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.industry && (
            <p className="text-dzignex-red text-xs">{form.formState.errors.industry.message}</p>
          )}
        </div>

        {/* Service Required */}
        <div className="space-y-2">
          <Label className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
            Service Required*
          </Label>
          <Select onValueChange={(value: string) => form.setValue("serviceRequired", value)}>
            <SelectTrigger className="w-full bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none">
              <SelectValue placeholder="Select a Service" />
            </SelectTrigger>
            <SelectContent className="bg-dzignex-black border-dzignex-white/20 text-white rounded-none">
              {services.map((service) => (
                <SelectItem key={service} value={service} className="focus:bg-dzignex-blue focus:text-white uppercase text-xs font-bold tracking-widest">
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.serviceRequired && (
            <p className="text-dzignex-red text-xs">{form.formState.errors.serviceRequired.message}</p>
          )}
        </div>
      </div>

      {/* Website or Instagram Page */}
      <div className="space-y-2">
        <Label htmlFor="websiteOrInstagram" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
          Website or Instagram Page [Optional]
        </Label>
        <Input
          id="websiteOrInstagram"
          placeholder="https://..."
          className="bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none"
          {...form.register("websiteOrInstagram")}
        />
      </div>

      {/* Budget Range */}
      <div className="space-y-2">
        <Label className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
          Estimated budget range*
        </Label>
        <p className="text-xs text-dzignex-white/40 mb-2">Helps us align scope, strategy, and deliverables</p>
        <Select onValueChange={(value: string) => form.setValue("budgetRange", value)}>
          <SelectTrigger className="w-full bg-transparent border-dzignex-white/20 h-12 focus:border-dzignex-blue transition-colors rounded-none">
            <SelectValue placeholder="Select a budget range" />
          </SelectTrigger>
          <SelectContent className="bg-dzignex-black border-dzignex-white/20 text-white rounded-none">
            {budgetRanges.map((range) => (
              <SelectItem key={range} value={range} className="focus:bg-dzignex-blue focus:text-white uppercase text-xs font-bold tracking-widest">
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.budgetRange && (
          <p className="text-dzignex-red text-xs">{form.formState.errors.budgetRange.message}</p>
        )}
      </div>

      {/* Challenges */}
      <div className="space-y-3">
        <Label className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
          What challenges are you currently facing?*
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {challenges.map((challenge) => (
            <label
              key={challenge}
              className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                (form.watch("challenges") || []).includes(challenge)
                  ? "border-dzignex-blue bg-dzignex-blue/10"
                  : "border-dzignex-white/20 hover:border-dzignex-white/40"
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-dzignex-blue"
                checked={(form.watch("challenges") || []).includes(challenge)}
                onChange={() => toggleChallenge(challenge)}
              />
              <span className="text-xs text-dzignex-white/80 leading-relaxed">{challenge}</span>
            </label>
          ))}
        </div>
        {form.formState.errors.challenges && (
          <p className="text-dzignex-red text-xs">{form.formState.errors.challenges.message}</p>
        )}
      </div>

      {/* Main Goal */}
      <div className="space-y-3">
        <Label className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
          What is your main goal for the next 3 months?*
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mainGoals.map((goal) => (
            <label
              key={goal}
              className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                (form.watch("mainGoal") || []).includes(goal)
                  ? "border-dzignex-blue bg-dzignex-blue/10"
                  : "border-dzignex-white/20 hover:border-dzignex-white/40"
              }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 accent-dzignex-blue"
                checked={(form.watch("mainGoal") || []).includes(goal)}
                onChange={() => toggleMainGoal(goal)}
              />
              <span className="text-xs text-dzignex-white/80 leading-relaxed">{goal}</span>
            </label>
          ))}
        </div>
        {form.formState.errors.mainGoal && (
          <p className="text-dzignex-red text-xs">{form.formState.errors.mainGoal.message}</p>
        )}
      </div>

      {/* Message / Project Details */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
          Project Details [Optional]
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us more about your project..."
          className="bg-transparent border-dzignex-white/20 min-h-[120px] focus:border-dzignex-blue transition-colors rounded-none resize-none"
          {...form.register("message")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full group md:w-auto flex gap-1 bg-dzignex-white text-dzignex-black hover:bg-dzignex-blue hover:text-white px-4 py-2 rounded-none uppercase font-bold text-lg transition-all"
      >
        {isSubmitting ? "Sending..." : "Send Message"} <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-[2px]"  size={30} />
      </button>
    </form>
  )
}

export default ContactForm
