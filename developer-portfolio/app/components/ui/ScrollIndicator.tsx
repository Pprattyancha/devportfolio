import Link from "next/link";

interface ScrollIndicatorProps {
  target: string;
}

export function ScrollIndicator({
  target,
}: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
      <Link
        href={target}
        className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-gray-400 transition hover:text-white"
      >
        <span>Scroll</span>

        <div className="h-10 w-px bg-gradient-to-b from-gray-400 to-transparent" />
      </Link>
    </div>
  );
}