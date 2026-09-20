import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  target,
  rel,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-blue-600 text-black bg-white border-white hover:border-blue-500/70 cursor-pointer",
    secondary: "border border-white-500/70 text-white hover:text-blue-300 cursor-pointer",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  // Link button
  if (href) {
    return (
      <Link href={href} className={styles} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  // Normal button
  return (
    <button type={type} className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
