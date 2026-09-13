import { skills } from "@/app/data/skills";

export function Skills() {
  return (
    <section
       id="skills"
      className="relative overflow-hidden bg-black px-6 py-24 md:px-12 md:py-32"
    >
      {/* Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      {/* Additional subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
      />
      <div className="mx-auto max-w-7xl">
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
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {skill.category}
              </h3>

              <div className="mt-5 flex flex-wrap gap-3">
                {skill.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300"
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
