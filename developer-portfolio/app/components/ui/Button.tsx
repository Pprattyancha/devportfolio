import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  target,
  rel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold transition duration-300 hover:scale-105";

  const variants = {
    primary:
      "bg-white text-black hover:bg-gray-200",

    secondary:
      "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}