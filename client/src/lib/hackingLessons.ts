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
    description: "Master the art of terminal commands and system navigation",
    lessons: [
      {
        id: "welcome",
        title: "Welcome to Terminal Hacking",
        content: [
          "WELCOME TO THE MATRIX, OPERATOR",
          "Before we begin our journey into the digital underground,",
          "you must master the basic tools of our trade.",
          "",
          "LESSON OBJECTIVES:",
          "- Understand basic terminal navigation",
          "- Learn essential system commands",
          "- Begin your path as a digital warrior",
          "",
          "Type 'start' to begin your training...",
        ],
        commands: ["start"],
        hints: ["Enter 'start' to proceed to the next lesson"]
      },
      {
        id: "basic-navigation",
        title: "Basic Terminal Navigation",
        content: [
          "LESSON 1: NAVIGATING THE DIGITAL REALM",
          "",
          "Every hacker's journey begins with understanding how to move through the system.",
          "Here are your essential movement commands:",
          "",
          "pwd - Print Working Directory (shows current location)",
          "ls  - List contents of current directory",
          "cd  - Change Directory",
          "",
          "Try these commands:",
          "1. Type 'pwd' to see your current location",
          "2. Type 'ls' to view available files",
          "3. Type 'cd ..' to move up one directory",
        ],
        commands: ["pwd", "ls", "cd"],
        hints: [
          "Good! Now try 'ls' to see what's in this directory",
          "Excellent! Use 'cd' to navigate between directories",
          "Perfect! You're getting the hang of basic navigation"
        ]
      },
      {
        id: "file-ops",
        title: "File Operations",
        content: [
          "LESSON 2: MANIPULATING THE SYSTEM",
          "",
          "A skilled hacker must know how to interact with files:",
          "",
          "cat   - Display file contents",
          "touch - Create new files",
          "mkdir - Create directories",
          "cp    - Copy files",
          "mv    - Move/rename files",
          "",
          "Practice sequence:",
          "1. mkdir secret_files",
          "2. touch hack.txt",
          "3. cat /etc/passwd (simulated)",
        ],
        commands: ["mkdir", "touch", "cat"],
        hints: [
          "Directory created! Now create a file with 'touch'",
          "File created! Try reading a system file with 'cat'",
          "Excellent work! You're learning to manipulate files"
        ]
      },
      {
        id: "permissions",
        title: "System Permissions",
        content: [
          "LESSON 3: UNDERSTANDING PERMISSIONS",
          "",
          "Security systems use permissions to control access:",
          "",
          "chmod - Change file permissions",
          "sudo  - Superuser do (elevated privileges)",
          "chown - Change file ownership",
          "",
          "Try these commands:",
          "1. ls -l (view permissions)",
          "2. chmod 755 hack.txt",
          "3. sudo su (simulated)",
        ],
        commands: ["ls -l", "chmod", "sudo"],
        hints: [
          "Good! You can now see file permissions",
          "Permission modified! Try accessing elevated privileges",
          "Caution: Always use sudo responsibly"
        ]
      }
    ]
  },
  security: {
    name: "Network Security Specialist",
    description: "Learn to analyze and secure network infrastructure",
    lessons: [
      {
        id: "network-recon",
        title: "Network Reconnaissance",
        content: [
          "MISSION: NETWORK INFILTRATION BASICS",
          "",
          "Before attacking a network, we must gather intelligence.",
          "Essential network reconnaissance tools:",
          "",
          "ping     - Test network connectivity",
          "ifconfig - View network interfaces",
          "netstat  - Network statistics",
          "traceroute - Trace network path",
          "",
          "Begin with basic network scanning:",
          "1. ping localhost",
          "2. ifconfig",
          "3. netstat -an"
        ],
        commands: ["ping", "ifconfig", "netstat"],
        hints: [
          "Target responding! Check network interfaces",
          "Network interfaces identified. Monitor connections",
          "You're mapping the network like a pro"
        ]
      },
      {
        id: "port-scanning",
        title: "Port Scanning Techniques",
        content: [
          "ADVANCED NETWORK MAPPING",
          "",
          "Ports are doorways into systems. Learn to find them:",
          "",
          "nmap    - Network mapping tool",
          "nc      - Netcat (Swiss army knife)",
          "ss      - Socket statistics",
          "",
          "Scanning sequence:",
          "1. nmap localhost",
          "2. nc -zv localhost 80",
          "3. ss -tulpn"
        ],
        commands: ["nmap", "nc", "ss"],
        hints: [
          "Scanning ports... Found open services",
          "Established connection! Check socket stats",
          "You're becoming a network expert"
        ]
      },
      {
        id: "firewall",
        title: "Firewall Analysis",
        content: [
          "FIREWALL EVASION TECHNIQUES",
          "",
          "Understanding firewall rules is crucial:",
          "",
          "iptables - Manage firewall rules",
          "ufw     - Uncomplicated firewall",
          "tcpdump - Packet analysis",
          "",
          "Practice these commands:",
          "1. sudo iptables -L",
          "2. ufw status",
          "3. tcpdump -i any"
        ],
        commands: ["iptables", "ufw", "tcpdump"],
        hints: [
          "Firewall rules exposed! Check UFW status",
          "Security status identified. Monitor packets",
          "You're learning to bypass security systems"
        ]
      }
    ]
  },
  encryption: {
    name: "Cryptography Specialist",
    description: "Master the art of encryption and cryptographic security",
    lessons: [
      {
        id: "crypto-basics",
        title: "Basic Cryptography",
        content: [
          "ENCRYPTION FUNDAMENTALS",
          "",
          "Learn to protect and decrypt data:",
          "",
          "base64   - Basic encoding",
          "md5sum   - Generate MD5 hash",
          "sha256sum - SHA256 hashing",
          "",
          "Try these encryption commands:",
          "1. echo 'secret' | base64",
          "2. echo 'password' | md5sum",
          "3. echo 'secure' | sha256sum"
        ],
        commands: ["base64", "md5sum", "sha256sum"],
        hints: [
          "Message encoded! Try creating a hash",
          "MD5 hash generated. Try SHA256",
          "You're learning to secure data"
        ]
      },
      {
        id: "advanced-crypto",
        title: "Advanced Encryption",
        content: [
          "ADVANCED CRYPTOGRAPHIC OPERATIONS",
          "",
          "Professional encryption tools:",
          "",
          "openssl - SSL/TLS toolkit",
          "gpg     - GNU Privacy Guard",
          "ccrypt  - Secure encryption",
          "",
          "Encryption sequence:",
          "1. openssl rand -base64 32",
          "2. gpg --gen-key",
          "3. ccrypt -e file.txt"
        ],
        commands: ["openssl", "gpg", "ccrypt"],
        hints: [
          "Key generated! Try GPG encryption",
          "GPG key created. Encrypt a file",
          "You're becoming a crypto expert"
        ]
      },
      {
        id: "steganography",
        title: "Steganography",
        content: [
          "HIDDEN MESSAGES IN PLAIN SIGHT",
          "",
          "Hide data within other data:",
          "",
          "steghide - Hide data in images",
          "outguess - Statistical steganography",
          "exiftool - Metadata manipulation",
          "",
          "Practice sequence:",
          "1. steghide embed -cf image.jpg",
          "2. outguess -k key -d hidden.txt",
          "3. exiftool image.jpg"
        ],
        commands: ["steghide", "outguess", "exiftool"],
        hints: [
          "Data hidden! Try extracting with outguess",
          "Message extracted. Check metadata",
          "You've mastered data concealment"
        ]
      }
    ]
  }
};