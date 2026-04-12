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
    "Real Estate",
    "Technology & SaaS",
    "Health & Wellness",
    "Fashion & Lifestyle",
    "Food & Beverage",
    "Education",
    "Entertainment",
    "Other",
  ]

  const services = [
    "Branding & Visual Identity",
    "Packaging Design",
    "Websites & Apps",
    "Motion Design",
    "Social Media Design",
    "Full Strategic Design Partner",
    "Other",
  ]

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

      {/* Message / Project Details */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs uppercase font-bold tracking-widest text-dzignex-white/60">
          Tell us about your project [Optional]
        </Label>
        <Textarea
          id="message"
          placeholder="I need a new visual identity for my brand..."
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
