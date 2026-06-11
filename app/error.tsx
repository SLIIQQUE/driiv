"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="bg-[#030305] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl font-black text-accent/30 mb-6">!</div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-3">
          Something went <span className="text-accent">wrong</span>
        </h1>
        <p className="text-white/40 font-medium mb-8">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-black uppercase tracking-widest text-sm rounded-xl hover:opacity-90 transition-all"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
