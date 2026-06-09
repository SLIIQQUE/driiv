import FaqAccordion from "@/components/faq/FaqAccordion";

export default function FAQPage() {
  return (
    <main className="bg-[#030305] pt-32 pb-40 lg:pb-64 overflow-hidden flex flex-col gap-10">
      <section className="container mb-40 lg:mb-64 relative">
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8 animate-fade-left">
            <div className="w-12 h-px bg-accent" />
            Knowledge Base
          </div>

          <h1 className="sr-only">
            Driving School FAQ — Surrey, ICBC Road Test & Lesson Questions
          </h1>
          <div className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 animate-fade-up">
            Questions? <br />
            <span className="text-accent underline decoration-accent/20 decoration-8 underline-offset-12">
              Answered instantaneously.
            </span>
          </div>

          <p className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium animate-fade-up delay-100">
            Every detail about our programs, technology, and process. Or simply
            engage our AI concierge.
          </p>
        </div>
      </section>

      <FaqAccordion />
    </main>
  );
}
