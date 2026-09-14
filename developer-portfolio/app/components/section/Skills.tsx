import { skills } from "@/app/data/skills";
import { BackgroundImage } from "../common/BackgroundImage";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-black px-6 py-6 md:px-12 md:py-20"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 z-0">
        <BackgroundImage
          src="/imglogo.png"
          alt=""
          priority
          objectPosition="center"
          fit="contain"
          className="opacity-70"
        />
      </div>

      {/* ================= DARK OVERLAY ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/35"
      />

      {/* ================= GRADIENT ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-black/70
          via-black/20
          to-black/80
        "
      />

      {/* ================= BLUE GLOW ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-[3]
          h-96
          w-96
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Skills
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white md:text-6xl">
          Technologies I work with
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="
                rounded-2xl
                border
                border-white/10
                bg-black/45
                p-6
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-blue-400/30
                hover:bg-blue-950/30
                hover:shadow-[0_0_40px_rgba(37,99,235,0.12)]
              "
            >
              <h3 className="text-xl font-semibold text-white">
                {skill.category}
              </h3>

              <div className="mt-5 flex flex-wrap gap-3">
                {skill.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.05]
                      px-4
                      py-2
                      text-sm
                      text-gray-300
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:border-blue-400/40
                      hover:bg-blue-500/10
                      hover:text-blue-300
                    "
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}