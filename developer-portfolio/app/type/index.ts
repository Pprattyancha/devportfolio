export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export interface SkillCategory {
  category: string;
  technologies: string[];
}

export interface SocialLink {
  name: string;
  href: string;
  external?: boolean;
}