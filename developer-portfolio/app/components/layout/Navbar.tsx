"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navigation } from "@/app/data/navigation";
import { ResumePreview } from "../common/ResumePreview";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const resumePath = "/Prattyancha_Patharkar_ResumeI_MERN_MEAN_Outsystems.pdf";
  const handleResumeClick = () => {
    window.open(
      "/Prattyancha_Patharkar_ResumeI_MERN_MEAN_Outsystems.pdf",
      "_blank",
      "noopener,noreferrer",
    );
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Smooth scroll to section
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const sectionId = href.replace("#", "");

    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveSection("home");
      closeMenu();
      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      const navbarOffset = 90;

      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - navbarOffset;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
    }

    closeMenu();
  };

  // Detect active section while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      let currentSection = "home";

      navigation.forEach((item) => {
        const sectionId = item.href.replace("#", "");

        if (sectionId === "home") {
          return;
        }

        const section = document.getElementById(sectionId);

        if (!section) {
          return;
        }

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = sectionId;
        }
      });

      // If we're near the top, Home is active
      if (window.scrollY < 100) {
        currentSection = "home";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-12 md:py-5"
      >
        {/* Main Navbar */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-full
            border
            border-white/10
            bg-black/60
            px-5
            py-3
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleNavigation(e, "#home")}
            className="
              group
              text-xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Prattyancha
            <span
              className="
                text-blue-400
                transition-colors
                group-hover:text-blue-300
              "
            >
              .
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`
                    relative
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${isActive
                      ? "text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {item.name}

                  {/* Active Indicator */}
                  <span
                    className={`
                      absolute
                      bottom-0
                      left-1/2
                      h-0.5
                      -translate-x-1/2
                      rounded-full
                      bg-blue-400
                      shadow-[0_0_8px_rgba(59,130,246,0.8)]
                      transition-all
                      duration-300
                      ${isActive ? "w-4 opacity-100" : "w-0 opacity-0"}
                    `}
                  />
                </Link>
              );
            })}


            <span
              onClick={handleResumeClick}
              className="
              cursor-pointer
        ml-3
        rounded-full
        border
        border-blue-400/40
        bg-white/10
        px-5
        py-2
        text-sm
        font-medium
        text-blue-300
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-blue-400/40
        hover:bg-blue-500/10
        hover:text-blue-300
      "
            >
              Resume
            </span>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((prev) => !prev)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white
              transition
              hover:bg-white/10
              md:hidden
            "
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>

            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`
                  h-0.5
                  w-full
                  bg-white
                  transition-all
                  duration-300
                  ${isOpen ? "translate-y-2 rotate-45" : ""}
                `}
              />

              <span
                className={`
                  h-0.5
                  w-full
                  bg-white
                  transition-all
                  duration-300
                  ${isOpen ? "opacity-0" : "opacity-100"}
                `}
              />

              <span
                className={`
                  h-0.5
                  w-full
                  bg-white
                  transition-all
                  duration-300
                  ${isOpen ? "-translate-y-2 -rotate-45" : ""}
                `}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`
            overflow-hidden
            transition-all
            duration-300
            md:hidden
            ${isOpen ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-black/95
              p-4
              shadow-2xl
              backdrop-blur-xl
            "
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const sectionId = item.href.replace("#", "");

                const isActive = activeSection === sectionId;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item.href)}
                    className={`
                      rounded-xl
                      px-4
                      py-3.5
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      ${isActive
                        ? "bg-blue-500/10 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>

                      {isActive && (
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-blue-400
                            shadow-[0_0_8px_rgba(59,130,246,0.8)]
                          "
                        />
                      )}
                    </div>
                  </Link>
                );
              })}

              {/* Mobile Resume */}

              <span
                onClick={handleResumeClick}
                className="
                              cursor-pointer

        ml-3
        rounded-full
        border
        border-blue-400/40
        bg-white/10
        px-5
        py-2
        text-sm
        font-medium
        text-blue-300
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-blue-400/40
        hover:bg-blue-500/10
        hover:text-blue-300
      "
              >
                Resume
              </span>

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
