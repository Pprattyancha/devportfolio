export function GradientOverlay() {
  return (
    <>
      {/* Main dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"
      />

      {/* Left dark overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent"
      />
    </>
  );
}