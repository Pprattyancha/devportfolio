"use client";

import Link from "next/link";
import type { SvgIconComponent } from "@mui/icons-material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";

interface SocialLink {
  name: string;
  href: string;
  external: boolean;
  icon: SvgIconComponent;
}

interface SocialLinksProps {
  showContact?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Pprattyancha/Pprattyancha",
    external: true,
    icon: GitHubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prattyancha-patharkar/",
    external: true,
    icon: LinkedInIcon,
  },
  {
    name: "Contact",
    href: "#contact",
    external: false,
    icon: PermPhoneMsgIcon,
  },
];

export function SocialLinks({
  showContact = true,
}: SocialLinksProps) {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        // Hide Contact when showContact is false
        if (social.name === "Contact" && !showContact) {
          return null;
        }

        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={
              social.external
                ? "noopener noreferrer"
                : undefined
            }
            aria-label={social.name}
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-gray-400
              backdrop-blur-sm
              transition-all
              duration-300
              hover:border-blue-400/40
              hover:bg-blue-500/10
              hover:text-blue-400
              hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]
            "
          >
            <Icon
              fontSize="small"
              className="
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />
          </Link>
        );
      })}
    </div>
  );
}
