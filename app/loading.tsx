import { Car } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030305]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-accent via-primary-light to-primary rounded-2xl flex items-center justify-center animate-pulse">
            <Car className="w-8 h-8 text-black" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent via-primary-light to-primary rounded-2xl blur-xl opacity-30 animate-pulse" />
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
          <span className="w-2.5 h-2.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
          <span className="w-2.5 h-2.5 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>
      </div>
    </div>
  );
}
