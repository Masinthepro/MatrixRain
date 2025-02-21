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

  const simulateCommandOutput = (command: string) => {
    // Simulated command outputs
    const outputs: Record<string, string[]> = {
      'pwd': ['/home/hacker'],
      'ls': ['documents/', 'downloads/', 'hack.txt', 'secret.key'],
      'cd': ['Directory changed'],
      'mkdir': ['Directory created successfully'],
      'touch': ['File created successfully'],
      'cat': [
        'Reading file contents...',
        '--------------------',
        'root:x:0:0:root:/root:/bin/bash',
        'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
        '--------------------'
      ],
      'chmod': ['Changed file permissions'],
      'ls -l': [
        'total 20',
        'drwxr-xr-x 2 hacker hacker 4096 Feb 21 12:34 documents',
        'drwxr-xr-x 2 hacker hacker 4096 Feb 21 12:34 downloads',
        '-rw-r--r-- 1 hacker hacker  220 Feb 21 12:34 hack.txt',
        '-rw-r--r-- 1 hacker hacker  220 Feb 21 12:34 secret.key'
      ],
      'sudo': ['[sudo] password for hacker: ', 'Access granted'],
      'ping': [
        'PING localhost (127.0.0.1) 56(84) bytes of data.',
        '64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.034 ms',
        '64 bytes from localhost (127.0.0.1): icmp_seq=2 ttl=64 time=0.045 ms'
      ],
      'ifconfig': [
        'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
        '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255',
        '        ether 00:11:22:33:44:55  txqueuelen 1000  (Ethernet)'
      ],
      'netstat': [
        'Active Internet connections (servers and established)',
        'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
        'tcp        0      0 localhost:80            0.0.0.0:*               LISTEN',
        'tcp        0      0 localhost:443           0.0.0.0:*               LISTEN'
      ],
      'base64': ['c2VjcmV0', 'Encoded message'],
      'md5sum': ['5ebe2294ecd0e0f08eab7690d2a6ee69', 'MD5 hash generated'],
      'sha256sum': [
        '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        'SHA256 hash generated'
      ],
      'help': [
        'Available commands:',
        '- help     : Show this help message',
        '- clear    : Clear terminal',
        '- progress : Show your progress',
        '- start    : Begin the lesson',
        '- pwd      : Show current directory',
        '- ls       : List files',
        '- cd       : Change directory',
        '- cat      : View file contents',
        '- mkdir    : Create directory',
        '- touch    : Create file',
        '- chmod    : Change permissions',
        '- sudo     : Superuser access',
        '----------------------------------------'
      ]
    };

    return outputs[command] || [`Command executed: ${command}`];
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

          // Add command to terminal history
          setLines(prev => [...prev, `> ${command}`]);

          // Handle built-in commands
          if (command === 'clear') {
            setLines([]);
          } else if (command === 'progress') {
            const totalLessons = lessons.length;
            const completed = completedLessons.size;
            setLines(prev => [
              ...prev,
              `Progress: ${completed}/${totalLessons} lessons completed`,
              `Current lesson: ${currentLessonData.title}`,
              `Commands mastered: ${Array.from(completedLessons).join(', ')}`,
              "----------------------------------------"
            ]);
          } else if (command === 'help') {
            setLines(prev => [...prev, ...simulateCommandOutput('help')]);
          } else {
            // Check if command matches current lesson
            const isValidCommand = currentLessonData.commands.some(cmd => 
              command === cmd || command.startsWith(`${cmd} `)
            );

            if (isValidCommand) {
              // Show simulated output
              const output = simulateCommandOutput(command);
              setLines(prev => [...prev, ...output]);

              addSystemMessage(`Command '${command}' executed successfully`, 'success');
              setCompletedLessons(prev => new Set([...prev, command.split(' ')[0]]));

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
            } else {
              addSystemMessage(`Command not recognized: ${command}`, 'error');
              addSystemMessage("Type 'help' for available commands", 'info');
            }
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