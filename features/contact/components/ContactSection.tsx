"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { FormEvent, useId, useState } from "react";
import { WorldMap } from "./WorldMap";

const CONTACT_EMAIL = "dzignex.studio@gmail.com";

function DottedGridBg() {
  const id = useId();
  const patternId = `contact-dot-grid-${id.replace(/:/g, "")}`;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-dzignex-white/[0.07]"
      aria-hidden
    >
      <defs>
        <pattern
          id={patternId}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={1} cy={1} r={1} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

const inputClass =
  "w-full rounded-md border border-dzignex-white/10 bg-dzignex-black/40 px-4 py-3 text-dzignex-white placeholder:text-dzignex-white/35 outline-none transition-[border-color,box-shadow] focus:border-dzignex-blue focus:ring-2 focus:ring-dzignex-blue/25";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-dzignex-white/70";

const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Inquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Budget: ${budget}`,
        "",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="border-b-2 border-dzignex-white/15">
      <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 px-5 py-16 sm:px-8 md:px-10 md:py-24 lg:px-16 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: details + map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-dzignex-white/15 bg-dzignex-blue/10">
              <Mail className="size-7 text-dzignex-blue" strokeWidth={1.75} />
            </div>

            <h2 className="mt-8 text-3xl font-medium tracking-tighter text-dzignex-white md:text-4xl lg:text-5xl">
              Contact us
            </h2>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-dzignex-white/75 md:text-lg">
              We are always looking for meaningful collaborations. Tell us about
              your project, timeline, and goals — we will get back within one
              business day.
            </p>

            <ul className="mt-10 flex flex-col gap-6">
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dzignex-white/10 bg-white/[0.03]">
                  <Mail className="size-4 text-dzignex-blue" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-dzignex-white/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-lg font-semibold tracking-tight text-dzignex-white underline-offset-4 hover:text-dzignex-blue hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-dzignex-white/10 bg-white/[0.03]">
                  <Phone className="size-4 text-dzignex-blue" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-dzignex-white/45">
                    Availability
                  </p>
                  <p className="text-lg font-medium text-dzignex-white/90">
                    Mon–Fri, 9:00–18:00 (CET)
                  </p>
                </div>
              </li>
            </ul>

            <WorldMap />
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-xl border border-dzignex-white/15 bg-gradient-to-br from-white/[0.04] to-transparent p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] sm:p-8 md:p-10">
              <DottedGridBg />
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-dzignex-blue/15 blur-3xl" />
              <div className="relative">
                <p className="text-dzignex-blue font-bold text-sm uppercase tracking-tight">
                  [Project form]
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-dzignex-white md:text-2xl">
                  Start a conversation
                </p>
                <p className="mt-2 text-sm text-dzignex-white/55">
                  Fields marked with context help us respond with a clear
                  proposal.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Cooper"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label htmlFor="company" className={labelClass}>
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Studio or brand"
                        className={inputClass}
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="budget" className={labelClass}>
                        Budget
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        defaultValue=""
                        className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23F3F6FF' stroke-opacity='0.5'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="" disabled>
                          Select range
                        </option>
                        <option value="Under $2k">Under $2k</option>
                        <option value="$2k – $5k">$2k – $5k</option>
                        <option value="$5k – $15k">$5k – $15k</option>
                        <option value="$15k+">$15k+</option>
                        <option value="Not sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about the project, deliverables, and deadlines…"
                      className={`${inputClass} min-h-[140px] resize-y`}
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-dzignex-blue px-8 py-3.5 text-base font-semibold uppercase tracking-tight text-white transition hover:opacity-90 active:scale-[0.99]"
                    >
                      <Send className="size-4" />
                      Submit
                    </button>
                    {status === "sent" && (
                      <motion.span
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-medium text-dzignex-blue"
                      >
                        Opening your mail app…
                      </motion.span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
