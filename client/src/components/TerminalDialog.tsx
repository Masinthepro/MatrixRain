import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import GlowingText from "./GlowingText";

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  system: string;
}

const HACKING_MESSAGES = [
  "ACCESSING MAINFRAME...",
  "BYPASSING FIREWALL...",
  "DECRYPTING PROTOCOLS...",
  "INJECTING PAYLOAD...",
  "EXTRACTING DATA...",
  "COMPROMISING SECURITY...",
  "INFILTRATING NETWORK...",
  "SCANNING PORTS...",
  "DEPLOYING BACKDOOR...",
  "EXECUTING EXPLOIT..."
];

const TerminalDialog = ({ open, onOpenChange, system }: TerminalDialogProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [lastKeypress, setLastKeypress] = useState("");

  useEffect(() => {
    if (open) {
      const responses: Record<string, string[]> = {
        "terminal": [
          "INITIALIZING TERMINAL ACCESS...",
          "ESTABLISHING SECURE CONNECTION...",
          "TERMINAL READY. START TYPING TO HACK...",
        ],
        "security": [
          "SCANNING SECURITY PROTOCOLS...",
          "BYPASSING FIREWALL SYSTEMS...",
          "SECURITY MATRIX ENGAGED. START TYPING TO HACK...",
        ],
        "encryption": [
          "LOADING ENCRYPTION ALGORITHMS...",
          "GENERATING QUANTUM KEYS...",
          "CRYPTOGRAPHIC SYSTEMS ONLINE. START TYPING TO HACK...",
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

      const handleKeyPress = (e: KeyboardEvent) => {
        setLastKeypress(e.key);
        const randomMessage = HACKING_MESSAGES[Math.floor(Math.random() * HACKING_MESSAGES.length)];
        setLines(prev => [...prev, randomMessage]);
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyPress);
        setLines([]);
      };
    }
  }, [open, system]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-green-500/50 w-[95vw] sm:w-[85vw] md:w-[75vw] max-w-2xl mx-auto">
        <div 
          className="font-mono text-green-500 p-3 sm:p-4 h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent" 
          id="terminal-content"
        >
          {lines.map((line, index) => (
            <div key={index} className="mb-2">
              <span className="text-green-600 mr-2">&gt;</span>
              <ScrambleText 
                text={line} 
                speed={25} 
                className="text-sm sm:text-base"
              />
            </div>
          ))}
          {lastKeypress && (
            <div className="text-green-400 opacity-50 mb-2 text-sm sm:text-base">
              KEY PRESSED: {lastKeypress.toUpperCase()}
            </div>
          )}
          <div className="animate-pulse">_</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;