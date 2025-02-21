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
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const lessons = hackingLessons[system]?.lessons || hackingLessons.terminal.lessons;
  const currentLessonData = lessons[currentLesson];

  const addSystemMessage = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const prefix = type === 'success' ? '[SUCCESS]' : type === 'error' ? '[ERROR]' : '[SYSTEM]';
    setLines(prev => [...prev, `${prefix} ${message}`]);
  };

  useEffect(() => {
    if (open) {
      // Initial system messages
      setLines([
        `INITIALIZING ${system.toUpperCase()} TRAINING PROTOCOL...`,
        "ESTABLISHING SECURE CONNECTION...",
        "BYPASSING SECURITY MEASURES...",
        "ACCESS GRANTED",
        "----------------------------------------",
        `WELCOME TO ${hackingLessons[system]?.name.toUpperCase() || "HACKING"} TRAINING`,
        `CURRENT PATH: ${hackingLessons[system]?.description}`,
        "----------------------------------------",
        ...currentLessonData.content
      ]);

      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          const command = userInput.trim().toLowerCase();

          // Process command
          if (command === 'help') {
            setLines(prev => [
              ...prev,
              "> help",
              "Available commands:",
              "- help     : Show this help message",
              "- clear    : Clear terminal",
              "- progress : Show your progress",
              "- exit     : Exit current lesson",
              "----------------------------------------"
            ]);
          } else if (command === 'clear') {
            setLines([]);
          } else if (command === 'progress') {
            const totalLessons = lessons.length;
            const completed = completedLessons.size;
            setLines(prev => [
              ...prev,
              "> progress",
              `Progress: ${completed}/${totalLessons} lessons completed`,
              `Current lesson: ${currentLessonData.title}`,
              `Commands mastered: ${Array.from(completedLessons).join(', ')}`,
              "----------------------------------------"
            ]);
          } else if (currentLessonData.commands.includes(command)) {
            addSystemMessage(`Executing: ${command}`, 'info');

            setTimeout(() => {
              addSystemMessage(`Command '${command}' executed successfully`, 'success');
              setCompletedLessons(prev => new Set([...prev, command]));

              if (lessonProgress < currentLessonData.commands.length - 1) {
                setLessonProgress(prev => prev + 1);
                addSystemMessage(currentLessonData.hints[lessonProgress], 'info');
              } else if (currentLesson < lessons.length - 1) {
                setLines(prev => [
                  ...prev,
                  "----------------------------------------",
                  "CONGRATULATIONS! LESSON COMPLETE!",
                  "Initializing next training module...",
                  "----------------------------------------"
                ]);
                setTimeout(() => {
                  setCurrentLesson(prev => prev + 1);
                  setLessonProgress(0);
                  setLines(prev => [...prev, ...lessons[currentLesson + 1].content]);
                }, 2000);
              } else {
                setLines(prev => [
                  ...prev,
                  "----------------------------------------",
                  "TRAINING COMPLETE! You've mastered all lessons!",
                  `You are now a certified ${hackingLessons[system]?.name}`,
                  "Remember: With great power comes great responsibility.",
                  "Use these skills ethically and legally.",
                  "----------------------------------------"
                ]);
              }
            }, 500);
          } else {
            addSystemMessage(`Command not recognized: ${command}`, 'error');
            addSystemMessage("Type 'help' for available commands", 'info');
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
        setCompletedLessons(new Set());
      };
    }
  }, [open, system, currentLesson, currentLessonData, lessonProgress, completedLessons]);

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
                className={`text-sm sm:text-base ${
                  line.startsWith('[SUCCESS]') ? 'text-green-400' :
                  line.startsWith('[ERROR]') ? 'text-red-400' :
                  line.startsWith('[SYSTEM]') ? 'text-blue-400' :
                  'text-green-500'
                }`}
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