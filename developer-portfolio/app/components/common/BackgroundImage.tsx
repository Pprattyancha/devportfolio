import Image from "next/image";

interface BackgroundImageProps {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
  fit?: "cover" | "contain";
  mirror?: boolean;
}

export function BackgroundImage({
  src,
  alt = "",
  priority = false,
  className = "",
  objectPosition = "center",
  fit = "cover",
  mirror = false,
}: BackgroundImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="100vw"
      aria-hidden={alt === ""}
      className={`
        ${fit === "cover" ? "object-cover" : "object-contain"}
        ${mirror ? "scale-x-[-1]" : ""}
        ${className}
      `}
      style={{
        objectPosition,
      }}
    />
  );
}