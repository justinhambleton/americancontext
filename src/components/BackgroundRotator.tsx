'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  images?: string[];
  /** Interval between background changes in milliseconds */
  intervalMs?: number;
  /** Crossfade duration in milliseconds (must match the Tailwind class used) */
  fadeMs?: number;
};

const DEFAULT_IMAGES = [
  '/images/home_1.jpeg',
  '/images/home_2.jpeg',
  '/images/home_3.jpeg',
  '/images/home_4.jpeg',
  '/images/home_5.jpeg',
  '/images/home_6.jpeg',
  '/images/home_7.jpeg',
  '/images/home_8.jpeg',
  '/images/home_9.jpeg',
  '/images/home_10.jpeg',
];

export default function BackgroundRotator({
  images = DEFAULT_IMAGES,
  intervalMs = 12000,
  fadeMs = 700,
}: Props) {
  const options = useMemo(() => images.filter(Boolean), [images]);

  // Base/overlay indices for crossfade
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);

  // Refs for current active index and timers (avoid stale closures)
  const activeRef = useRef<number | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  // Initial image after mount (no fade), then rotate on interval with preloaded crossfade
  useEffect(() => {
    mountedRef.current = true;
    if (options.length === 0) return;

    // Initial pick after mount (single render, no fade)
    setActiveIndex((prev) => {
      if (prev != null) return prev;
      return Math.floor(Math.random() * options.length);
    });

    if (options.length <= 1) return; // nothing to rotate

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        if (typeof img.decode === 'function') {
          img
            .decode()
            .then(() => resolve())
            .catch(() => resolve());
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      });

    const tick = async () => {
      if (isTransitioningRef.current || !mountedRef.current) return;
      const curr = activeRef.current ?? 0;
      let next = Math.floor(Math.random() * options.length);
      if (next === curr) next = (curr + 1) % options.length;
      const nextSrc = options[next];

      isTransitioningRef.current = true;
      await preload(nextSrc);
      if (!mountedRef.current) return;

      // Mount overlay first at opacity-0, then animate to 1
      setNextIndex(next);
      setFading(false);
      // Double RAF ensures the browser paints the initial state before we flip to 1
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = requestAnimationFrame(() => {
          if (!mountedRef.current) return;
          setFading(true);
          // After fade completes, swap active and clear overlay
          if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
          fadeTimeoutRef.current = setTimeout(() => {
            if (!mountedRef.current) return;
            // First update base to the new image
            setActiveIndex(next);
            // Then, on the next frame, remove the overlay to avoid any flash
            rafRef.current = requestAnimationFrame(() => {
              if (!mountedRef.current) return;
              setNextIndex(null);
              setFading(false);
              isTransitioningRef.current = false;
            });
          }, fadeMs);
        });
      });
    };

    const id = setInterval(() => {
      void tick();
    }, intervalMs);

    return () => {
      mountedRef.current = false;
      clearInterval(id);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      isTransitioningRef.current = false;
    };
  }, [options, intervalMs, fadeMs]);

  // Preload all images once after mount to avoid decode hiccups mid-transition
  useEffect(() => {
    if (options.length === 0) return;
    const imgs: HTMLImageElement[] = [];
    for (const src of options) {
      const img = new Image();
      img.src = src;
      imgs.push(img);
    }
    return () => {
      // allow GC; browsers will handle cache; no explicit cleanup needed
    };
  }, [options]);

  const activeSrc = activeIndex != null ? options[activeIndex] : '';
  const overlaySrc = nextIndex != null ? options[nextIndex] : '';

  return (
    <div
      aria-hidden
      suppressHydrationWarning
      className="absolute inset-0 pointer-events-none z-0 opacity-20"
    >
      {/* Base layer (always fully visible) */}
      <div
        className={"absolute inset-0 bg-center bg-cover bg-no-repeat opacity-100"}
        style={{
          backgroundImage: activeSrc ? `url(${activeSrc})` : undefined,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          contain: 'paint',
        }}
      />
      {/* Overlay layer */}
      {overlaySrc ? (
        <div
          className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity ease-in-out ${fading ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${overlaySrc})`,
            transitionDuration: `${fadeMs}ms`,
            willChange: 'opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            contain: 'paint',
          }}
        />
      ) : null}
    </div>
  );
}
