import { cn } from "@/lib/utils";

interface GlowingTextProps {
  children: React.ReactNode;
  className?: string;
}

const GlowingText = ({ children, className }: GlowingTextProps) => {
  return (
    <span
      className={cn(
        "text-green-500 font-mono animate-pulse",
        "drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]",
        className
      )}
    >
      {children}
    </span>
  );
};

export default GlowingText;
