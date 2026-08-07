import { cn } from "@/lib/utils";
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

const base =
  "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-60";

export function Field({
  label,
  error,
  required,
  htmlFor,
  className,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-orange-500"> *</span>}
      </label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, "min-h-28 resize-y", className)} {...props} />;
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(base, className)} {...props} />;
}
