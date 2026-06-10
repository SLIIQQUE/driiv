import { Car, Shield, CheckCircle } from "lucide-react";

export function HeroCard() {
  return (
    <div className="lg:col-span-5 hidden lg:block">
      <div className="animate-fade-in delay-200">
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent backdrop-blur-xl border border-white/20 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />

            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-lg shadow-accent/30 hover-scale">
                  <Car className="w-10 h-10 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white leading-none">CLASS 5/7</div>
                  <div className="text-accent font-bold uppercase tracking-widest text-xs mt-1">Road Test Specialist</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6 border-white/10 hover-lift">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-2 h-10 bg-accent rounded-full" />
                    <div>
                      <div className="text-white font-bold">Today&apos;s Session</div>
                      <div className="text-white/40 text-xs">Surrey Training Center</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-xs text-white/60">08:00 AM - 10:00 AM</div>
                    <div className="text-accent flex items-center gap-1 text-sm font-bold">
                      <CheckCircle className="w-4 h-4" /> Confirmed
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {[
                    { value: "5+", label: "Years Of Mastery" },
                    { value: "1k+", label: "Students Trained" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex-1 glass-card p-4 text-center border-white/5 hover-lift"
                    >
                      <div className="text-2xl font-black text-white">
                        {stat.value}
                      </div>
                      <div className="text-[10px] uppercase text-white/40 font-bold tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-28 h-28 glass-card rounded-full border-accent/30 flex items-center justify-center text-accent shadow-xl">
            <Shield className="w-10 h-10" />
          </div>

          <div className="absolute -bottom-8 -left-12 px-6 py-4 glass-card border-white/20 rounded-2xl flex items-center gap-3 backdrop-blur-2xl shadow-xl">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm font-bold text-white uppercase tracking-widest whitespace-nowrap">ICBC Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
