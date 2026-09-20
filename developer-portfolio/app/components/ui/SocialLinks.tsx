"use client";

import Link from "next/link";
import type { IconType } from "react-icons";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";

import { TbBrandHackerrank } from "react-icons/tb";

interface SocialLink {
  name: string;
  href: string;
  external: boolean;
  icon: IconType;
}

interface SocialLinksProps {
  showContact?: boolean;
}

// Wrap MUI icons so they work with React Icons' IconType
const GitHub = GitHubIcon as IconType;
const LinkedIn = LinkedInIcon as IconType;
const Contact = PermPhoneMsgIcon as IconType;

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Pprattyancha/Pprattyancha",
    external: true,
    icon: GitHub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prattyancha-patharkar/",
    external: true,
    icon: LinkedIn,
  },
  {
    name: "HackerRank",
    href: "https://www.hackerrank.com/profile/prattyancha26",
    external: true,
    icon: TbBrandHackerrank,
  },
  {
    name: "Contact",
    href: "#contact",
    external: false,
    icon: Contact,
  },
];

export function SocialLinks({ showContact = true }: SocialLinksProps) {
  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-50

        flex
        flex-col
        items-center
        gap-3

        sm:bottom-28
        sm:right-7
      "
    >
      {socialLinks.map((social) => {
        if (social.name === "Contact" && !showContact) {
          return null;
        }

        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            aria-label={social.name}
            title={social.name}
            className="
              group
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full
              border
              border-blue-400/40
              bg-black/60
              text-gray-400

              backdrop-blur-xl

              shadow-[0_8px_30px_rgba(0,0,0,0.35)]

              transition-all
              duration-300
              ease-out

              hover:-translate-y-1
              hover:scale-110
              hover:border-blue-400
              hover:bg-blue-500/10
              hover:text-blue-400
              hover:shadow-[0_0_25px_rgba(59,130,246,0.30)]
            "
          >
            <Icon
              className="
                h-5
                w-5
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
