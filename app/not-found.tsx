import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#030305] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-accent/20 mb-6">404</div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-3">
          Page not <span className="text-accent">found</span>
        </h1>
        <p className="text-white/40 font-medium mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-black uppercase tracking-widest text-sm rounded-xl hover:opacity-90 transition-all"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
