import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dzignex Studio",
  description: "Learn how Dzignex Studio collects, uses, and protects your personal information.",
};

interface ContentItem {
  text: string;
  subtitle?: string;
  list?: string[];
}

interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

const sections: Section[] = [
  {
    id: "collection",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect personal information that you voluntarily provide when contacting us, requesting services, or using our chat support. This may include your name, email address, phone number, company name, and project details.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect certain information about your device and how you interact with our website. This includes your IP address, browser type, operating system, referring URLs, and pages viewed.",
      },
      {
        subtitle: "Cookies & Analytics",
        text: "We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. We use privacy-focused analytics tools that do not track you across other websites.",
      },
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    content: [
      {
        text: "We use the information we collect to:",
        list: [
          "Provide and improve our design services",
          "Communicate with you about projects and inquiries",
          "Send relevant updates and marketing communications (with your consent)",
          "Analyze website performance and user experience",
          "Comply with legal obligations and protect our rights",
        ],
      },
    ],
  },
  {
    id: "protection",
    title: "Data Protection & Security",
    content: [
      {
        text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security practices include:",
        list: [
          "Encrypted data transmission using industry-standard SSL/TLS",
          "Secure data storage with restricted access controls",
          "Regular security assessments and updates",
          "Limited retention periods based on business needs",
        ],
      },
    ],
  },
  {
    id: "sharing",
    title: "Information Sharing",
    content: [
      {
        text: "We do not sell, trade, or rent your personal information to third parties. We may share information only in these limited circumstances:",
        list: [
          "With trusted service providers who assist our operations (under strict confidentiality agreements)",
          "When required by law or to protect our legal rights",
          "In connection with a business transfer, merger, or acquisition",
        ],
      },
    ],
  },
  {
    id: "rights",
    title: "Your Rights",
    content: [
      {
        text: "Depending on your location, you may have the following rights regarding your personal information:",
        list: [
          "Access the personal information we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your personal information",
          "Object to or restrict certain processing activities",
          "Withdraw consent for marketing communications",
          "Request data portability where applicable",
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    content: [
      {
        text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, or as required by law. Project-related communications are typically retained for [X] years to maintain business records and support ongoing relationships.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a revised effective date.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      {
        text: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      },
      {
        subtitle: "Dzignex Studio",
        text: "Email: dzignex.studio@gmail.com\nLocation: Algiers, Algeria",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-dzignex-black text-white">


      {/* Policy Content */}
      <div className="border-b-2 border-dzignex-white/15">
        <div className="container mx-auto border-r-2 border-l-2 border-dzignex-white/15 py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-10 lg:px-16">
          <div className="max-w-4xl mx-auto space-y-20">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8 pb-4 border-b-2 border-dzignex-white/10">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((item, idx) => (
                    <div key={idx}>
                      {item.subtitle && (
                        <h3 className="text-lg font-bold text-dzignex-white/90 mb-3">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-dzignex-white/70 leading-relaxed whitespace-pre-line">
                        {item.text}
                      </p>
                      {item.list && (
                        <ul className="mt-4 space-y-3">
                          {item.list.map((listItem, listIdx) => (
                            <li
                              key={listIdx}
                              className="flex items-start gap-3 text-dzignex-white/70"
                            >
                              <span className="text-dzignex-blue mt-1.5">•</span>
                              <span className="leading-relaxed">{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}
