import type { Metadata } from "next";
import ContactSection from "../../../features/contact/components/ContactSection";


export const metadata: Metadata = {
  title: "Contact | Dzignex Studio",
  description:
    "Get in touch with Dzignex Studio — brand, product, and digital design inquiries.",
};

const ContactPage = () => {
  return (
    <div>
      <ContactSection />
    </div>
  );
};

export default ContactPage;
