
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function Header({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "mx-auto text-center"
      : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {/* Eyebrow */}
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
        {eyebrow}
      </p>

      {/* Title */}
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

