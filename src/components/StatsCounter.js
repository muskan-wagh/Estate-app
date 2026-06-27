'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

function Counter({ end, duration = 2000, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const startValue = 0;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ value, label, suffix = '' }) {
  const numericValue = parseInt(value);

  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-secondary">
        {isNaN(numericValue) ? value : <Counter end={numericValue} suffix={suffix} />}
      </p>
      <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mt-1">
        {label}
      </p>
    </div>
  );
}
