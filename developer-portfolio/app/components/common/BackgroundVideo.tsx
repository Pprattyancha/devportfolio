interface BackgroundVideoProps {
  src: string;
  poster?: string;
  className?: string;
  objectPosition?: string;
}

export function BackgroundVideo({
  src,
  poster,
  className = "",
  objectPosition = "center",
}: BackgroundVideoProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{
        objectPosition,
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}