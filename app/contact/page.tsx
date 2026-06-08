import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <main className="bg-[#030305] pb-40 lg:pb-64 overflow-hidden">
      <ContactHero />

      <section className="relative pt-30 z-10">
        <div className="container overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5 pt-8 lg:pt-0">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
