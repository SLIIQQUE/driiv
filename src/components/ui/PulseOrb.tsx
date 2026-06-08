interface PulseOrbProps {
  className?: string;
}

export function PulseOrb({ className = "" }: PulseOrbProps) {
  return (
    <div
      className={`absolute -top-20 -right-20 w-48 h-48 bg-accent/10 blur-[80px] rounded-full pointer-events-none ${className}`}
    />
  );
}
