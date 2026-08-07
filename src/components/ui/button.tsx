import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-orange-500 text-white shadow-[0_10px_30px_-10px_rgba(255,106,0,0.6)] hover:bg-orange-600 hover:-translate-y-0.5",
        navy: "bg-navy-800 text-white hover:bg-navy-700 hover:-translate-y-0.5",
        outline:
          "border border-current text-foreground hover:bg-orange-500 hover:border-orange-500 hover:text-white",
        ghost: "text-foreground hover:bg-muted",
        white:
          "bg-white text-navy-800 hover:bg-cloud hover:-translate-y-0.5 shadow-card",
        link: "text-orange-500 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base py-3.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export interface ButtonLinkProps
  extends React.ComponentProps<typeof Link>,
    ButtonBaseProps {}

/** Versão do botão que renderiza um <Link> do Next (para navegação). */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
