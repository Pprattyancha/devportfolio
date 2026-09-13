import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">

        <h3 className="text-2xl font-semibold text-white">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-gray-400">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-5">
          {github && (
            <Link
              href={github}
              target="_blank"
              className="text-sm font-medium text-white hover:text-blue-400"
            >
              GitHub →
            </Link>
          )}

          {demo && (
            <Link
              href={demo}
              target="_blank"
              className="text-sm font-medium text-white hover:text-blue-400"
            >
              Live Demo →
            </Link>
          )}
        </div>

      </div>
    </article>
  );
}