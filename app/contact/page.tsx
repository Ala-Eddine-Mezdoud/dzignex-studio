import type { Metadata } from "next";
import Landing from "../../features/contact/components/Landing";
import ContactSection from "../../features/contact/components/ContactSection";
import NextStep from "../../features/home/components/NextStep";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contact | Dzignex Studio",
  description:
    "Get in touch with Dzignex Studio — brand, product, and digital design inquiries.",
};

const ContactPage = () => {
  return (
    <div>
      <ContactSection />
      <NextStep />
      <Footer />
    </div>
  );
};

export default ContactPage;
