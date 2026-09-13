import { BackgroundImage } from "../common/BackgroundImage";
import { GradientOverlay } from "../common/GradientOverlay";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-24 md:px-12 md:py-32"
    >
      <div className="relative z-10 mx-auto grid w-full items-center gap-12 md:grid-cols-2 md:gap-20">
        {/* ================= IMAGE - LEFT ================= */}
        {/* Image Container */}
        <div className="relative h-[450px] w-full md:h-[600px]">
          {/* Blurred background image */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 opacity-70 blur-3xl"
          >
            <BackgroundImage
              src="/work.jpeg"
              priority
              objectPosition="65% 25%"
              className="h-full w-full"
            />
          </div>

          {/* Main image */}
          <div className="relative h-full w-full overflow-hidden">
            <BackgroundImage
              src="/work.jpeg"
              priority
              objectPosition="65% 25%"
              className="h-full w-full"
            />

            <GradientOverlay></GradientOverlay>
          </div>
        </div>
        {/* ================= CONTENT - RIGHT ================= */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
            About Me
          </p>

          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Building digital experiences that actually work.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
            I'm a Full Stack Developer focused on building scalable,
            maintainable and high-performance web applications.
          </p>

          <p className="mt-5 max-w-xl text-lg leading-8 text-gray-400">
            I enjoy turning complex problems into simple, intuitive and reliable
            digital experiences using modern technologies.
          </p>

          {/* Stats */}
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-white">5+</p>
              <p className="mt-1 text-sm text-gray-500">Years Experience</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">20+</p>
              <p className="mt-1 text-sm text-gray-500">Projects</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">10+</p>
              <p className="mt-1 text-sm text-gray-500">Technologies</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-blue-400/50 hover:bg-blue-500/10"
            >
              Explore My Work
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
