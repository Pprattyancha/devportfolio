import { socialLinks } from "@/app/data/social";
import Link from "next/link";
import { SocialLinks } from "../ui/SocialLinks";


export function Bottom() {
  return (
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between md:px-12">

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} Prattyancha. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-5">
         {/* <SocialLinks showContact={false}/> */}
          {/* Back To Top */}
          <Link
            href="#about"
            className="transition hover:text-white"
          >
            Back to top ↑
          </Link>
        </div>

      </div>
    </div>
  );
}
