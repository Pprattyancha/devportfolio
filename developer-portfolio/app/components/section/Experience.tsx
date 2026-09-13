import { experience } from "@/app/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
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
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
            Experience
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Where I've worked
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            My professional journey building scalable applications, solving
            complex problems and creating better digital experiences.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative mt-16">
          {/* Timeline Line */}
          <div className="absolute left-[7px] top-2 hidden h-full w-px bg-white/10 md:block" />

          <div className="space-y-12">
            {experience.map((item, index) => (
              <article
                key={`${item.company}-${item.role}`}
                className="relative md:pl-14"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 hidden h-4 w-4 rounded-full border-4 border-black bg-blue-400 md:block" />

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-white/20 md:p-8">
                  {/* Header */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-400">
                        {item.period}
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {item.role}
                      </h3>

                      <p className="mt-1 text-base text-gray-400">
                        {item.company}
                        <span className="mx-2 text-gray-600">•</span>
                        {item.location}
                      </p>
                    </div>

                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                      {index === 0 ? "Current" : "Previous"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-6 max-w-3xl leading-7 text-gray-400">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  <ul className="mt-6 space-y-3">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-3 text-sm leading-6 text-gray-300"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-gray-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
