import { useEffect, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const ScrambleText = ({ text, speed = 50, className = '' }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const scramble = () => {
      if (iteration >= text.length) {
        clearInterval(interval);
        return;
      }

      setDisplayText(prev => {
        const scrambled = text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
        return scrambled;
      });

      iteration += 1/3;
    };

    interval = setInterval(scramble, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
    </span>
  );
};

export default ScrambleText;
