"use client";
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const base = 'px-4 py-2.5 rounded-button transition-colors duration-200 font-medium text-sm';
  const variants: Record<string, string> = {
    primary: 'bg-primary text-background hover:opacity-90',
    secondary: 'bg-secondary text-primary hover:opacity-90',
    outline: 'border border-border text-primary hover:bg-muted',
  };
  return (
    <button className={cn(base, variants[variant], 'hover:scale-105', className)} {...props}>
      {children}
    </button>
  );
};
