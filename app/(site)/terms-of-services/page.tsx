import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Services | Dzignex Studio",
  description: "Terms and conditions for using Dzignex Studio services.",
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
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      {
        text: "By accessing or using Dzignex Studio's website, services, or contacting us for design services, you agree to be bound by these Terms of Services. If you do not agree to these terms, please do not use our services or website.",
      },
      {
        text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after any changes constitutes acceptance of the updated terms.",
      },
    ],
  },
  {
    id: "services",
    title: "Our Services",
    content: [
      {
        text: "Dzignex Studio provides creative design services including but not limited to:",
        list: [
          "Graphic design and visual identity",
          "Web design and development",
          "UI/UX design",
          "Brand strategy and consulting",
          "Motion graphics and animation",
          "Other creative design solutions as agreed upon",
        ],
      },
      {
        text: "All services are subject to availability and will be provided according to the specific terms outlined in individual project agreements or contracts.",
      },
    ],
  },
  {
    id: "engagement",
    title: "Project Engagement",
    content: [
      {
        subtitle: "Proposals & Quotes",
        text: "All project proposals and quotes provided by Dzignex Studio are valid for 30 days unless otherwise stated. Acceptance of a proposal constitutes a binding agreement to proceed with the outlined scope of work.",
      },
      {
        subtitle: "Deposits & Payments",
        text: "A deposit may be required to commence work on projects. Payment terms will be specified in individual project agreements. Late payments may result in project delays or suspension of services.",
      },
      {
        subtitle: "Revisions & Changes",
        text: "The number of revision rounds is specified in each project proposal. Additional revisions beyond the agreed scope may incur extra charges. Major scope changes may require a revised proposal and timeline.",
      },
    ],
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Client Materials",
        text: "You retain all rights to materials, content, and assets you provide to us for use in projects. You warrant that you have the right to use such materials and that they do not infringe on third-party rights.",
      },
      {
        subtitle: "Deliverables Ownership",
        text: "Upon full payment of all fees, ownership of final deliverables transfers to the client. Dzignex Studio retains the right to display completed work in portfolios, case studies, and marketing materials unless otherwise agreed in writing.",
      },
      {
        subtitle: "Third-Party Assets",
        text: "Any third-party assets (stock images, fonts, software, etc.) used in projects remain subject to their respective licenses. It is the client's responsibility to obtain appropriate licenses for continued use of such assets.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    content: [
      {
        text: "Both parties agree to maintain confidentiality regarding:",
        list: [
          "Proprietary business information shared during the project",
          "Unreleased designs, concepts, and project details",
          "Client data and personal information",
          "Any information marked as confidential",
        ],
      },
      {
        text: "This confidentiality obligation survives the termination of our working relationship.",
      },
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      {
        text: "Either party may terminate a project engagement with written notice. Upon termination:",
        list: [
          "Client is responsible for payment of all work completed to date",
          "Dzignex Studio will deliver any completed work that has been paid for",
          "Any deposits are non-refundable unless otherwise specified",
          "Confidentiality obligations remain in effect",
        ],
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: [
      {
        text: "Dzignex Studio's liability is limited to the total amount paid for the specific project giving rise to the claim. We are not liable for:",
        list: [
          "Indirect, incidental, or consequential damages",
          "Loss of profits, revenue, or business opportunities",
          "Issues arising from client-provided materials or content",
          "Third-party claims arising from client use of deliverables",
        ],
      },
    ],
  },
  {
    id: "website",
    title: "Website Use",
    content: [
      {
        text: "When using our website, you agree to:",
        list: [
          "Use the site only for lawful purposes",
          "Not attempt to interfere with site security or functionality",
          "Not use automated systems to access the site without permission",
          "Not reproduce, duplicate, or resell any part of the site without authorization",
        ],
      },
    ],
  },
  {
    id: "governing",
    title: "Governing Law",
    content: [
      {
        text: "These Terms of Services are governed by the laws of Algeria. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Algiers, Algeria.",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      {
        text: "For questions about these Terms of Services or to discuss specific project terms, please contact us:",
      },
      {
        subtitle: "Dzignex Studio",
        text: "Email: dzignex.studio@gmail.com\nLocation: Algiers, Algeria",
      },
    ],
  },
];

export default function TermsOfServicesPage() {
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
