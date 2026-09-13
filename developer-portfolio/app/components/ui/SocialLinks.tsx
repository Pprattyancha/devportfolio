import { socialLinks } from "@/app/data/social";
import Link from "next/link";

export function SocialLinks() {
  return (
    <div className="mt-10 flex items-center gap-6 text-sm text-gray-400">
      {socialLinks.map((social, index) => (
        <div key={social.name} className="flex items-center gap-6">
          <Link
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            className="transition hover:text-white"
          >
            {social.name}
          </Link>

          {index < socialLinks.length - 1 && (
            <span className="h-1 w-1 rounded-full bg-gray-600" />
          )}
        </div>
      ))}
    </div>
  );
}