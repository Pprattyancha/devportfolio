import { AnimatedNumber } from "../common/AnimatedNumber";
import { BackgroundImage } from "../common/BackgroundImage";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-0 md:px-12 md:py-20"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        {/* ================= IMAGE - LEFT ================= */}
        <div className="relative w-full">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="
      absolute
      inset-0
      rounded-full
      bg-blue-500/10
      blur-[100px]
      scale-75
    "
          />

          {/* Image Container */}
          <div
            className="
      relative
      mx-auto
      h-[300px]
      w-full
      overflow-hidden
      sm:h-[500px]
      md:h-[600px]
      lg:h-[650px]
    "
          >
            <BackgroundImage
              src="/DxJPI.gif"
              priority
              objectPosition="center"
              fit="contain"
              className="h-full w-full scale-110"
            />
          </div>
        </div>

        {/* ================= CONTENT - RIGHT ================= */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
            About Me
          </p>

          <h2 className="max-w-2xl text-xl font-bold leading-tight text-white md:text-xl lg:text-2xl">
            Building digital experiences that actually work.
          </h2>
          <div className="mt-5 max-w-xl text-lg leading-8 text-gray-400">
            <p>
              I’m Prattyancha Patharkar, a Frontend Lead with 5+ years of
              experience in MERN/MEAN stack development, specializing in React,
              Angular, TypeScript, JavaScript, and Node.js. I have worked on
              scalable web applications, financial systems, real-time
              dashboards, and data-driven platforms, with strong experience in
              frontend architecture, performance optimization, API integration,
              and team leadership. I enjoy turning complex problems into simple,
              intuitive, and reliable digital experiences using modern
              technologies.
            </p>

            <p className="mt-5">
              Academically, I completed my schooling in Maharashtra, followed
              by:
            </p>

            <ul className="list-disc pl-6">
              <li>
                B.Sc. in Physics, Statistics, and Mathematics from Dharampeth M
                P Deo Memorial Science College, Nagpur in 2018
              </li>
              <li>
                M.Sc. in Computer Applications from Fergusson College, Pune in
                2021
              </li>
            </ul>
          </div>
          {/* Stats */}
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-white">
                <AnimatedNumber end={5} suffix="+" />
              </p>

              <p className="mt-1 text-sm text-gray-500">Years Experience</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">
                <AnimatedNumber end={10} suffix="+" />
              </p>

              <p className="mt-1 text-sm text-gray-500">Projects</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-white">
                <AnimatedNumber end={11} suffix="+" />
              </p>

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
