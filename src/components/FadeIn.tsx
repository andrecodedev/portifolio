import { type ReactNode } from 'react';
import '../index.css';

type FadeInProps = {
  children: ReactNode;
  duration?: number;
};

export default function FadeIn({ children, duration = 500 }: FadeInProps) {
  return (
    <div
      className="fade-in w-full flex flex-col items-center"
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
