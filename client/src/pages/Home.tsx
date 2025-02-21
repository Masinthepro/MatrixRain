import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GlowingText from "@/components/GlowingText";
import ScrambleText from "@/components/ScrambleText";
import TerminalDialog from "@/components/TerminalDialog";
import { Terminal, Shield, Lock } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInitialize = (system: string) => {
    setActiveSystem(system);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8 sm:mb-12">
        <GlowingText className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 block">
          <ScrambleText text="SYSTEM BREACH" />
        </GlowingText>
        <p className="text-green-400 text-base sm:text-lg md:text-xl font-mono">
          <ScrambleText text="Access Protocol: INITIATED" speed={75} />
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full">
        {[
          {
            icon: Terminal,
            title: "Terminal Access",
            description: "Direct system interface protocol",
            system: "terminal"
          },
          {
            icon: Shield,
            title: "Security Matrix",
            description: "Firewall penetration systems",
            system: "security"
          },
          {
            icon: Lock,
            title: "Encryption Keys",
            description: "Advanced cryptographic algorithms",
            system: "encryption"
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="p-4 sm:p-6 bg-black/50 border-green-500/50 hover:border-green-500 transition-colors group"
          >
            <div className="flex flex-col items-center text-center">
              <item.icon className="w-8 h-8 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-green-500 group-hover:animate-pulse" />
              <GlowingText className="text-lg sm:text-xl mb-2">{item.title}</GlowingText>
              <p className="text-green-400/80 font-mono text-xs sm:text-sm">
                {item.description}
              </p>
              <Button 
                variant="outline"
                className="mt-3 sm:mt-4 border-green-500/50 hover:border-green-500 text-green-500 hover:text-green-400 text-sm sm:text-base"
                onClick={() => handleInitialize(item.system)}
              >
                Initialize
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <TerminalDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        system={activeSystem || 'terminal'}
      />
    </div>
  );
}