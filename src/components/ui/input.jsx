'use client';

import { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Input = forwardRef(({ className, type, label, id, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="relative">
      <input
        id={inputId}
        type={type}
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(!!e.target.value);
        }}
        onChange={(e) => setHasValue(!!e.target.value)}
        className={cn(
          'peer w-full rounded-xl border-2 border-border bg-card px-4 pt-6 pb-2 text-sm font-medium text-card-foreground transition-all duration-200',
          'focus:border-primary focus:outline-none focus:ring-0',
          'placeholder-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        placeholder={label || ' '}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground transition-all duration-200 pointer-events-none',
          'peer-focus:top-3 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary peer-focus:translate-y-0',
          (focused || hasValue) && 'top-3 text-[10px] font-semibold translate-y-0'
        )}
      >
        {label}
      </label>
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
