import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  demo?: string;
}

export function ProjectCard({
  title,
  description,
  technologies,
  demo,
}: ProjectCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-black/45
        p-6
        backdrop-blur-sm
        transition
        duration-300
        hover:border-blue-400/30
        hover:bg-blue-950/20
        hover:shadow-[0_0_40px_rgba(37,99,235,0.12)]
        md:p-8
      "
    >
      {/* Project Title */}
      <h3 className="text-2xl font-semibold text-white transition duration-300 group-hover:text-blue-300">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 leading-7 text-gray-400">
        {description}
      </p>

      {/* Technologies */}
      <div className="mt-5 flex flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-3
              py-1.5
              text-xs
              text-gray-300
              transition
              duration-300
              group-hover:border-blue-400/20
            "
          >
            {technology}
          </span>
        ))}
      </div>

      {/* Live Demo */}
      {demo && (
        <div className="mt-6">
          <Link
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm
              font-medium
              text-white
              transition
              hover:text-blue-400
            "
          >
            Live Demo →
          </Link>
        </div>
      )}
    </article>
  );
}