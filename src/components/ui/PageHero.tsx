import type { ReactNode } from "react";

interface PageHeroProps {
  label: string;
  className?: string;
}

export function PageHero({ label, className = "" }: PageHeroProps) {
  return (
    <div className={`flex items-center gap-3 text-accent font-bold uppercase tracking-[0.3em] text-xs mb-8 animate-fade-left ${className}`}>
      <div className="w-12 h-px bg-accent" />
      {label}
    </div>
  );
}

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <div
      className={`text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 animate-fade-up ${className}`}
      style={{ animationDelay: "0.1s" }}
    >
      {children}
    </div>
  );
}

interface PageDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function PageDescription({ children, className = "" }: PageDescriptionProps) {
  return (
    <p
      className={`text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed font-medium animate-fade-up ${className}`}
      style={{ animationDelay: "0.2s" }}
    >
      {children}
    </p>
  );
}

interface PageHeaderSectionProps {
  label: string;
  badge?: ReactNode;
  title: string | string[];
  description?: string;
  children?: ReactNode;
}

export function PageHeaderSection({ label, badge, title, description, children }: PageHeaderSectionProps) {
  const titleParts = Array.isArray(title) ? title : [title];

  return (
    <div className="max-w-4xl relative z-10">
      {badge || <PageHero label={label} />}

      <PageTitle>
        {titleParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < titleParts.length - 1 && <br />}
          </span>
        ))}
      </PageTitle>

      {description && <PageDescription>{description}</PageDescription>}
      {children}
    </div>
  );
}
