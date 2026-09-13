  "use client";

  import { useEffect, useState } from "react";
  import Link from "next/link";
  import { navigation } from "@/app/data/navigation";

  export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const closeMenu = () => {
      setIsOpen(false);
    };

    // Detect currently visible section
    useEffect(() => {
      const sections = navigation
        .map((item) => document.querySelector(item.href))
        .filter(Boolean) as HTMLElement[];

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                b.intersectionRatio - a.intersectionRatio
            )[0];

          if (visibleSection) {
            setActiveSection(visibleSection.target.id);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: [0.1, 0.25, 0.5, 0.75],
        }
      );

      sections.forEach((section) => observer.observe(section));

      return () => {
        sections.forEach((section) => observer.unobserve(section));
      };
    }, []);

    // Close mobile menu when screen becomes desktop
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
          {/* Navbar */}
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 shadow-2xl backdrop-blur-xl">
            
            {/* Logo */}
            <Link
              href="#home"
              onClick={closeMenu}
              className="group text-xl font-bold tracking-tight text-white"
            >
              Prattyancha
              <span className="text-blue-400 transition-colors group-hover:text-blue-300">
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
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.name}

                    {/* Active indicator */}
                    <span
                      className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-400 transition-all duration-300 ${
                        isActive ? "w-4" : "w-0"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* Resume */}
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/20"
              >
                Resume
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>

              <div className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-0.5 w-full bg-white transition-all duration-300 ${
                    isOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />

                <span
                  className={`h-0.5 w-full bg-white transition-all duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />

                <span
                  className={`h-0.5 w-full bg-white transition-all duration-300 ${
                    isOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            id="mobile-navigation"
            className={`overflow-hidden transition-all duration-300 md:hidden ${
              isOpen
                ? "mt-3 max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="rounded-3xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenu}
                      className={`rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                        )}
                      </div>
                    </Link>
                  );
                })}

                {/* Mobile Resume */}
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 rounded-xl bg-white px-4 py-3.5 text-center text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200"
                >
                  Download Resume
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }