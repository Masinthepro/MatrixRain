import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import ScrambleText from "./ScrambleText";
import GlowingText from "./GlowingText";
import { hackingLessons } from "@/lib/hackingLessons";

interface TerminalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  system: string;
}

const TerminalDialog = ({ open, onOpenChange, system }: TerminalDialogProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [userInput, setUserInput] = useState("");

  const lessons = hackingLessons[system]?.lessons || hackingLessons.terminal.lessons;
  const currentLessonData = lessons[currentLesson];

  useEffect(() => {
    if (open) {
      // Initial system messages
      setLines([
        `INITIALIZING ${system.toUpperCase()} TRAINING PROTOCOL...`,
        "ESTABLISHING SECURE CONNECTION...",
        `WELCOME TO ${hackingLessons[system]?.name.toUpperCase() || "HACKING"} TRAINING`,
        "----------------------------------------",
        ...currentLessonData.content
      ]);

      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const command = userInput.trim().toLowerCase();

          // Process command
          if (currentLessonData.commands.includes(command)) {
            setLines(prev => [
              ...prev,
              `> ${command}`,
              `Successfully executed: ${command}`,
              currentLessonData.hints[lessonProgress] || "Good work! Keep practicing."
            ]);

            if (lessonProgress < currentLessonData.commands.length - 1) {
              setLessonProgress(prev => prev + 1);
            } else if (currentLesson < lessons.length - 1) {
              setLines(prev => [
                ...prev,
                "----------------------------------------",
                "LESSON COMPLETE! Loading next lesson...",
                "----------------------------------------"
              ]);
              setTimeout(() => {
                setCurrentLesson(prev => prev + 1);
                setLessonProgress(0);
              }, 2000);
            } else {
              setLines(prev => [
                ...prev,
                "----------------------------------------",
                "CONGRATULATIONS! You've completed all lessons!",
                "You're now equipped with basic hacking knowledge.",
                "Remember to use these skills responsibly!",
                "----------------------------------------"
              ]);
            }
          } else {
            setLines(prev => [
              ...prev,
              `> ${command}`,
              "Invalid command. Try one of the suggested commands."
            ]);
          }
          setUserInput("");
        } else if (e.key === 'Backspace') {
          setUserInput(prev => prev.slice(0, -1));
        } else if (e.key.length === 1) {
          setUserInput(prev => prev + e.key);
        }
      };

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        setLines([]);
        setCurrentLesson(0);
        setLessonProgress(0);
        setUserInput("");
      };
    }
  }, [open, system, currentLesson, currentLessonData, lessonProgress]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-green-500/50 w-[95vw] sm:w-[85vw] md:w-[75vw] max-w-2xl mx-auto">
        <div 
          className="font-mono text-green-500 p-3 sm:p-4 h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent" 
          id="terminal-content"
        >
          {lines.map((line, index) => (
            <div key={index} className="mb-2">
              <span className="text-green-600 mr-2">{line.startsWith('>') ? '' : '>'}</span>
              <ScrambleText 
                text={line} 
                speed={25} 
                className="text-sm sm:text-base"
              />
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-green-600 mr-2">&gt;</span>
            <span className="text-green-500 text-sm sm:text-base">{userInput}</span>
            <span className="animate-pulse ml-1">_</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminalDialog;