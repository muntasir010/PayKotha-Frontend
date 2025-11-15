import { useEffect, useState, useRef } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'hover' | 'view';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isActive, setIsActive] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const getNextIndex = (current: Set<number>) => {
    const len = text.length;
    if (revealDirection === 'start') return current.size;
    if (revealDirection === 'end') return len - 1 - current.size;
    if (revealDirection === 'center') {
      const mid = Math.floor(len / 2);
      return current.size % 2 === 0 ? mid + Math.floor(current.size / 2) : mid - Math.floor((current.size + 1) / 2);
    }
    return current.size;
  };

  const shuffleText = (revealedSet: Set<number>) => {
    const chars = useOriginalCharsOnly ? Array.from(new Set(text.replace(/\s/g, ''))) : characters.split('');
    return text
      .split('')
      .map((c, i) => (c === ' ' ? ' ' : revealedSet.has(i) ? c : chars[Math.floor(Math.random() * chars.length)]))
      .join('');
  };

  // Animation loop
  useEffect(() => {
    if (!isActive) return;
    let interval: number;
    let iteration = 0;

    // eslint-disable-next-line prefer-const
    interval = window.setInterval(() => {
      setRevealed(prev => {
        const newSet = new Set(prev);
        if (sequential && prev.size < text.length) {
          newSet.add(getNextIndex(prev));
        }
        setDisplayText(shuffleText(newSet));
        iteration++;
        if (!sequential && iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
        if (sequential && newSet.size >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
        return newSet;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, text, speed, maxIterations, sequential]);

  // Animate on view
  useEffect(() => {
    if (animateOn !== 'view') return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsActive(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [animateOn, hasAnimated]);

  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => setIsActive(true),
          onMouseLeave: () => setIsActive(false),
        }
      : {};

  return (
    <motion.span ref={containerRef} className={`inline-block whitespace-pre-wrap ${parentClassName}`} {...hoverProps} {...props}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((c, i) => (
          <span key={i} className={revealed.has(i) || !isActive ? className : encryptedClassName}>
            {c}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
