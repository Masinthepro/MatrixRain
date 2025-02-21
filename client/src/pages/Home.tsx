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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-12">
        <GlowingText className="text-4xl md:text-6xl font-bold mb-4 block">
          <ScrambleText text="SYSTEM BREACH" />
        </GlowingText>
        <p className="text-green-400 text-lg md:text-xl font-mono">
          <ScrambleText text="Access Protocol: INITIATED" speed={75} />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
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
            className="p-6 bg-black/50 border-green-500/50 hover:border-green-500 transition-colors group"
          >
            <div className="flex flex-col items-center text-center">
              <item.icon className="w-12 h-12 mb-4 text-green-500 group-hover:animate-pulse" />
              <GlowingText className="text-xl mb-2">{item.title}</GlowingText>
              <p className="text-green-400/80 font-mono text-sm">
                {item.description}
              </p>
              <Button 
                variant="outline"
                className="mt-4 border-green-500/50 hover:border-green-500 text-green-500 hover:text-green-400"
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