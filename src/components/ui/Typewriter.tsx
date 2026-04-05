import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  resetTrigger?: any;
  hideCursorOnComplete?: boolean;
}

const Typewriter = ({
  text,
  speed = 40,
  delay = 0,
  onComplete,
  className,
  style,
  resetTrigger,
  hideCursorOnComplete = false
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsFinished(false);

    let timeoutId: any;
    let initialDelayId: any;
    let charIndex = 0;

    const type = () => {
      if (charIndex < (text || '').length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
        timeoutId = setTimeout(type, speed);
      } else {
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    };

    initialDelayId = setTimeout(type, delay);

    return () => {
      clearTimeout(initialDelayId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, resetTrigger]);

  return (
    <span className={className} style={{ ...style, display: 'inline-flex', alignItems: 'center' }}>
      {displayedText}
      {(!isFinished || !hideCursorOnComplete) && (
        <span className="w-[1.2px] h-[1.1em] bg-current ml-[2px] animate-pulse" />
      )}
    </span>
  );
};

export default Typewriter;
