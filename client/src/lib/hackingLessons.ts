interface Lesson {
  id: string;
  title: string;
  content: string[];
  commands: string[];
  hints: string[];
}

interface LessonPath {
  name: string;
  description: string;
  lessons: Lesson[];
}

export const hackingLessons: Record<string, LessonPath> = {
  terminal: {
    name: "Command Line Mastery",
    description: "Learn the fundamentals of terminal commands and system navigation",
    lessons: [
      {
        id: "basic-commands",
        title: "Basic Terminal Commands",
        content: [
          "Welcome to Terminal Hacking 101",
          "In this lesson, you'll learn essential commands used by hackers:",
          "ls - List files in current directory",
          "cd - Change directory",
          "pwd - Print working directory",
          "cat - Display file contents",
          "Try these commands by typing them below!"
        ],
        commands: ["ls", "cd", "pwd", "cat"],
        hints: ["Start with 'ls' to see what files are available"]
      },
      {
        id: "file-manipulation",
        title: "File System Navigation",
        content: [
          "Advanced File Operations:",
          "mkdir - Create new directory",
          "touch - Create empty file",
          "rm - Remove files (use with caution!)",
          "cp - Copy files",
          "Practice these commands to understand file manipulation"
        ],
        commands: ["mkdir", "touch", "rm", "cp"],
        hints: ["Create a new directory with 'mkdir test'"]
      }
    ]
  },
  security: {
    name: "Network Security",
    description: "Master network security concepts and tools",
    lessons: [
      {
        id: "network-basics",
        title: "Network Reconnaissance",
        content: [
          "Network Security Fundamentals:",
          "ping - Test network connectivity",
          "netstat - Network statistics",
          "ifconfig/ipconfig - Network interface configuration",
          "nmap - Network mapping (requires proper authorization)",
          "These tools help understand network structure"
        ],
        commands: ["ping", "netstat", "ifconfig", "nmap"],
        hints: ["Start with 'ping' to test connectivity"]
      }
    ]
  },
  encryption: {
    name: "Cryptography Basics",
    description: "Learn about encryption and cryptographic tools",
    lessons: [
      {
        id: "crypto-101",
        title: "Basic Cryptography",
        content: [
          "Introduction to Cryptography:",
          "base64 - Basic encoding/decoding",
          "md5sum - Generate MD5 hash",
          "sha256sum - Generate SHA256 hash",
          "gpg - GNU Privacy Guard for encryption",
          "Learn how data is encrypted and secured"
        ],
        commands: ["base64", "md5sum", "sha256sum", "gpg"],
        hints: ["Try encoding a message with 'base64'"]
      }
    ]
  }
};
