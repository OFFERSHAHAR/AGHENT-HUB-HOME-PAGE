import { BrainCircuit, Sparkles, Cpu, Workflow, BarChart3 } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative hidden lg:flex items-center justify-center aspect-square w-full max-w-md mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-4 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute inset-24 rounded-full bg-blue-500/20 blur-2xl" />

      {/* Rotating orbit rings with travelling nodes */}
      <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_28s_linear_infinite]">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/60" />
      </div>
      <div className="absolute inset-10 rounded-full border border-white/10 animate-[spin_20s_linear_infinite_reverse]">
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/60" />
      </div>
      <div className="absolute inset-[4.5rem] rounded-full border border-white/5 animate-[spin_14s_linear_infinite]">
        <span className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/80" />
      </div>

      {/* Glowing core */}
      <div className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-2xl shadow-primary/40">
        <BrainCircuit className="w-16 h-16 text-white" strokeWidth={1.5} />
        <span className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20" />
      </div>

      {/* Floating capability chips */}
      <ChipCard className="top-2 right-2" icon={<Workflow className="w-4 h-4" />} label="אוטומציה" delay="0s" />
      <ChipCard className="top-1/2 left-0 -translate-y-1/2" icon={<Cpu className="w-4 h-4" />} label="סוכני AI" delay="1.2s" />
      <ChipCard className="bottom-4 right-10" icon={<BarChart3 className="w-4 h-4" />} label="אנליטיקה" delay="0.6s" />
      <ChipCard className="bottom-10 left-4" icon={<Sparkles className="w-4 h-4" />} label="ייעול" delay="1.8s" />
    </div>
  );
}

function ChipCard({
  className,
  icon,
  label,
  delay,
}: {
  className: string;
  icon: React.ReactNode;
  label: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute ${className} flex items-center gap-2 px-3 py-2 rounded-xl bg-card/80 border border-white/10 backdrop-blur-md shadow-xl text-sm font-medium animate-[float_5s_ease-in-out_infinite]`}
      style={{ animationDelay: delay }}
    >
      <span className="text-primary">{icon}</span>
      {label}
    </div>
  );
}
