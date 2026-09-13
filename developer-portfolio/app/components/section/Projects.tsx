import { projects } from "@/app/data/projects";
import { ProjectCard } from "../ui/ProjectCard";

export function Projects() {
  return (
    <section
      id="projects"
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
          Projects
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white md:text-6xl">
          Selected work
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
