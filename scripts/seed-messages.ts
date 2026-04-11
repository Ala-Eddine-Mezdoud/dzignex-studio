import { drizzle } from "drizzle-orm/neon-http";
import { messages } from "../db/schema/messages";
import * as dotenv from "dotenv";
import { config } from "dotenv";

config({ path: ".env" });

const db = drizzle(process.env.DATABASE_URL!);

const mockMessages = [
  {
    fullName: "Amine Barkat",
    email: "amine.b@techflow.dz",
    whatsappNumber: "+213 550 12 34 56",
    companyName: "TechFlow Solutions",
    industry: "Technology & SaaS",
    serviceRequired: "Websites & Apps",
    websiteOrInstagram: "techflow.dz",
    message: "We are looking for a complete redesign of our SaaS platform. We need something modern and minimalist that appeals to international clients.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    fullName: "Sarah Chen",
    email: "sarah@lume-skincare.com",
    whatsappNumber: "+213 661 45 89 22",
    companyName: "Lumé Skincare",
    industry: "Health & Wellness",
    serviceRequired: "Packaging Design",
    websiteOrInstagram: "@lume_label",
    message: "Hi! We're launching a new organic line and need premium packaging design. We love your work with Avure.",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    fullName: "Yacine Belkacem",
    email: "y.belkacem@immovue.dz",
    whatsappNumber: "+213 770 99 11 33",
    companyName: "ImmoVue Realty",
    industry: "Real Estate",
    serviceRequired: "Branding & Visual Identity",
    websiteOrInstagram: "immovue.dz",
    message: "We need a strong visual identity for our premium real estate agency in Algiers. Logo, stationery, and brand guidelines.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    fullName: "Lina Mansouri",
    email: "lina@vogueaura.com",
    whatsappNumber: "+213 552 33 44 55",
    companyName: "Vogue Aura",
    industry: "Fashion & Lifestyle",
    serviceRequired: "Full Strategic Design Partner",
    websiteOrInstagram: "vogueaura.com",
    message: "Looking for a long-term partner to handle all our design needs: from web to social media and lookbooks.",
    status: "REPLIED" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    fullName: "Omar Haddad",
    email: "omar@grindcoffee.dz",
    whatsappNumber: "+213 660 77 88 99",
    companyName: "The Grind Coffee Co.",
    industry: "Food & Beverage",
    serviceRequired: "Motion Design",
    websiteOrInstagram: "@thegrind_dz",
    message: "We want some cool motion graphics for our upcoming social media campaign. Something jazzy and energetic.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    fullName: "Meriem Rouis",
    email: "m.rouis@learnway.dz",
    whatsappNumber: "+213 554 11 22 33",
    companyName: "LearnWay Academy",
    industry: "Education",
    serviceRequired: "Websites & Apps",
    websiteOrInstagram: "learnway.dz",
    message: "We need a user-friendly platform for our students. Clean UI and great UX are our top priorities.",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  },
  {
    fullName: "Sofiane Zerrari",
    email: "sofiane@pixelart.com",
    whatsappNumber: "+213 771 55 66 77",
    companyName: "Pixel Art Studio",
    industry: "Entertainment",
    serviceRequired: "Branding & Visual Identity",
    websiteOrInstagram: "pixelart.dz",
    message: "We're a small indie game studio. We need a logo that feels 'gaming' but professionally executed.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
  },
  {
    fullName: "Karim Djebbar",
    email: "karim@buildstrong.dz",
    whatsappNumber: "+213 558 00 11 22",
    companyName: "BuildStrong Construction",
    industry: "Other",
    serviceRequired: "Packaging Design",
    websiteOrInstagram: "buildstrong.dz",
    message: "Wait, actually we need a catalog design for our new tool kits. Not exactly packaging, but close?",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12), // 12 days ago
  },
  {
    fullName: "Anis Meddah",
    email: "anis@freshly.dz",
    whatsappNumber: "+213 663 22 33 44",
    companyName: "Freshly Algiers",
    industry: "Food & Beverage",
    serviceRequired: "Branding & Visual Identity",
    websiteOrInstagram: "@freshly_dz",
    message: "Healthy food delivery service. We need a green, fresh, and modern identity.",
    status: "REPLIED" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
  },
  {
    fullName: "Djamila Sadi",
    email: "d.sadi@luxnest.com",
    whatsappNumber: "+213 559 44 55 66",
    companyName: "LuxNest Interior",
    industry: "Real Estate",
    serviceRequired: "Websites & Apps",
    websiteOrInstagram: "luxnest.dz",
    message: "Portfolio website to showcase our interior design projects. Minimalism is key.",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
  },
  {
    fullName: "Rayan Hamoudi",
    email: "rayan@quickbuy.dz",
    whatsappNumber: "+213 772 88 99 00",
    companyName: "QuickBuy E-comm",
    industry: "E-commerce",
    serviceRequired: "Social Media Design",
    websiteOrInstagram: "quickbuy.dz",
    message: "We need 20 templates for Instagram posts and stories. Bold and colorful.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25), // 25 days ago
  },
  {
    fullName: "Farid Amari",
    email: "farid@logisticpro.dz",
    whatsappNumber: "+213 551 22 33 44",
    companyName: "LogisticPro",
    industry: "Other",
    serviceRequired: "Branding & Visual Identity",
    websiteOrInstagram: "logisticpro.dz",
    message: "Redesigning our 10-year old logo. It needs to feel more corporate and established.",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
  },
  {
    fullName: "Zahra Bouali",
    email: "zahra@zenbeauty.dz",
    whatsappNumber: "+213 664 55 66 77",
    companyName: "Zen Beauty Spa",
    industry: "Health & Wellness",
    serviceRequired: "Branding & Visual Identity",
    websiteOrInstagram: "@zenbeauty_spa",
    message: "New spa opening soon. We need everything from logo to signage design.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35), // 35 days ago
  },
  {
    fullName: "Hicham Larbi",
    email: "hicham@solarpoint.dz",
    whatsappNumber: "+213 553 77 88 99",
    companyName: "SolarPoint Energy",
    industry: "Technology & SaaS",
    serviceRequired: "Websites & Apps",
    websiteOrInstagram: "solarpoint.dz",
    message: "A website to explain solar energy benefits to homeowners. Needs infographics.",
    status: "REPLIED" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40), // 40 days ago
  },
  {
    fullName: "Nadia Tahi",
    email: "nadia@artisanat.dz",
    whatsappNumber: "+213 773 11 22 33",
    companyName: "Artisanat d'Algérie",
    industry: "Fashion & Lifestyle",
    serviceRequired: "Packaging Design",
    websiteOrInstagram: "artisanat.dz",
    message: "Traditional pottery in modern packaging. We want to export to Europe.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45), // 45 days ago
  },
  {
    fullName: "Abdel Karim",
    email: "ak.fitness@gmail.com",
    whatsappNumber: "+213 555 99 88 77",
    companyName: "AK Fitness",
    industry: "Health & Wellness",
    serviceRequired: "Social Media Design",
    websiteOrInstagram: "@ak_fitness_dz",
    message: "Motiviation posts and workout guides. High contrast, aggressive style.",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 50), // 50 days ago
  },
  {
    fullName: "Samira Kaci",
    email: "samira@bakerydelight.dz",
    whatsappNumber: "+213 665 00 11 22",
    companyName: "Bakery Delight",
    industry: "Food & Beverage",
    serviceRequired: "Packaging Design",
    websiteOrInstagram: "@bakery_delight_algiers",
    message: "Cake boxes and bread wraps. Something warm and welcoming.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 55), // 55 days ago
  },
  {
    fullName: "Tarek Fekir",
    email: "tarek@autopart.dz",
    whatsappNumber: "+213 557 33 44 55",
    companyName: "AutoPart DZ",
    industry: "E-commerce",
    serviceRequired: "Websites & Apps",
    websiteOrInstagram: "autopart.dz",
    message: "Spare parts marketplace. Needs advanced filtering and search.",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 2 months ago
  },
  {
    fullName: "Ines Ghrieb",
    email: "ines@evently.dz",
    whatsappNumber: "+213 774 55 66 77",
    companyName: "Evently",
    industry: "Entertainment",
    serviceRequired: "Branding & Visual Identity",
    websiteOrInstagram: "evently.dz",
    message: "Event planning app. Needs a fun and vibrant brand.",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 65), // 65 days ago
  },
  {
    fullName: "Walid Toumi",
    email: "walid@smartfarm.dz",
    whatsappNumber: "+213 556 88 99 00",
    companyName: "SmartFarm",
    industry: "Technology & SaaS",
    serviceRequired: "Websites & Apps",
    websiteOrInstagram: "smartfarm.dz",
    message: "IoT for agriculture. Dashboard for farmers to monitor crops.",
    status: "REPLIED" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 70), // 70 days ago
  },
];

async function seed() {
  console.log("🌱 Seeding messages...");
  try {
    await db.insert(messages).values(mockMessages);
    console.log("✅ Seed complete! Inserted 20 messages.");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
