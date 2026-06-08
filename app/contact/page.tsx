import { ContactHero } from "@/components/contact/ContactHero";
import { ContactInfo } from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <main className="bg-[#030305] pb-40 lg:pb-64 overflow-hidden">
      <ContactHero />

      <section className="relative z-10">
        <div className="container">
          <ContactInfo />
        </div>
      </section>
    </main>
  );
}
