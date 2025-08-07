'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  /** Milliseconds per character */
  speedMs?: number;
  /** Initial delay before typing begins */
  startDelayMs?: number;
};

export default function Typewriter({ text, speedMs = 55, startDelayMs = 200 }: Props) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speedMs, startDelayMs]);

  return <span aria-live="polite">{displayed}</span>;
}
