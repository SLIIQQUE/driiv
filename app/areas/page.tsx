import { ArrowRight } from "lucide-react";
import BookNowTrigger from "@/components/BookNowTrigger";
import { PageHero, PageTitle, PageDescription, EcosystemGrid, ScrollReveal } from "@/components/ui";
import { AreasGridSection } from "@/components/areas/AreasGridSection";

export default function AreasPage() {

  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <PageHero label="Coverage" />

          <h1 className="sr-only">
            Our Driving Lesson Service Areas in BC
          </h1>
          <PageTitle className="mb-10">
            Our Driving Lesson Service Areas in BC
          </PageTitle>

          <PageDescription>
            Pickup and drop-off included across Metro Vancouver. Book online, pay securely, receive automated pulses — wherever you&apos;re located.
          </PageDescription>
        </div>
      </section>

      <AreasGridSection />

      <section className="container">
        <ScrollReveal className="glass-card border-white/5 p-10 lg:p-16 rounded-[3rem] relative overflow-hidden mb-10">
          <div
            className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full"
          />
          <div className="text-center mb-8 relative z-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Every service area includes</h3>
          </div>
          <EcosystemGrid />
        </ScrollReveal>
      </section>

      <section className="container mt-20">
        <ScrollReveal direction="scale" className="premium-card p-12 lg:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-secondary-foreground/10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-[0.95]">
                Your Area Not Listed?
              </h2>
              <p className="text-white/40 text-lg font-medium leading-relaxed">
                We&apos;re expanding rapidly. Contact us to verify availability — and if we can&apos;t reach you, we&apos;ll recommend the nearest pickup point.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <BookNowTrigger className="group relative px-14 py-5 bg-accent text-primary rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 overflow-hidden shadow-2xl shadow-accent/20">
                <span className="relative z-10 flex items-center gap-3">
                  Check Availability <ArrowRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </BookNowTrigger>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
