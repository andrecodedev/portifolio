import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  resetKey: string; // chave para reiniciar quando idioma mudar
}

export default function Typewriter({ text, resetKey }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
    setFinished(false);
  }, [resetKey]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 70); // velocidade de escrita
      return () => clearTimeout(timeout);
    } else {
      setFinished(true);
    }
  }, [index, text]);

  return (
    <span className="typewriter">
      {displayedText}
      <span className={`cursor ${finished ? "blink" : ""}`}>|</span>
    </span>
  );
}
