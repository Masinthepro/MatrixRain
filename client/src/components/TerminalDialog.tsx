import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import GlowingText from "./GlowingText";

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  system: string;
}

const TerminalDialog = ({ open, onOpenChange, system }: TerminalDialogProps) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    if (open) {
      const responses: Record<string, string[]> = {
        "terminal": [
          "INITIALIZING TERMINAL ACCESS...",
          "ESTABLISHING SECURE CONNECTION...",
          "TERMINAL READY. AWAITING INPUT...",
        ],
        "security": [
          "SCANNING SECURITY PROTOCOLS...",
          "BYPASSING FIREWALL SYSTEMS...",
          "SECURITY MATRIX ENGAGED...",
        ],
        "encryption": [
          "LOADING ENCRYPTION ALGORITHMS...",
          "GENERATING QUANTUM KEYS...",
          "CRYPTOGRAPHIC SYSTEMS ONLINE...",
        ]
      };

      const systemLines = responses[system] || responses.terminal;
      let currentLine = 0;

      const interval = setInterval(() => {
        if (currentLine < systemLines.length) {
          setLines(prev => [...prev, systemLines[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        setLines([]);
      };
    }
  }, [open, system]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-green-500/50 max-w-2xl w-full">
        <div className="font-mono text-green-500 p-4 h-[300px] overflow-auto">
          {lines.map((line, index) => (
            <div key={index} className="mb-2">
              <span className="text-green-600 mr-2">&gt;</span>
              <ScrambleText text={line} speed={25} />
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;
