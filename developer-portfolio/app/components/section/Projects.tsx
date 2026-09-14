import { projects } from "@/app/data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { BackgroundImage } from "../common/BackgroundImage";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-6 md:px-12 md:py-20"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <BackgroundImage
          src="/imglogo.png"
          alt=""
          priority
          objectPosition="center"
          fit="cover"
          className="opacity-60"
        />
      </div>

      {/* ================= DARK OVERLAY ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/45"
      />

      {/* ================= GRADIENT OVERLAY ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-black/80
          via-black/25
          to-black/90
        "
      />

      {/* ================= CENTER BLUE GLOW ================= */}
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
          bg-blue-500/15
          blur-3xl
        "
      />

      {/* ================= RIGHT BLUE GLOW ================= */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
          z-[3]
          h-72
          w-72
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-400">
          Projects
        </p>

        <h2 className="mt-4 text-4xl font-bold text-white md:text-6xl">
          Selected work
        </h2>

        {/* Projects */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}