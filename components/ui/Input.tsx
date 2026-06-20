"use client";
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-foreground">{label}</label>
    <input
      className={cn('rounded-card border border-border px-3 py-2 focus:outline-none focus:border-primary', className)}
      {...props}
    />
    {error && <p className="text-xs text-error mt-1">{error}</p>}
  </div>
);
