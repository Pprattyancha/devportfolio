import { BackgroundVideo } from "../common/BackgroundVideo";
import { ResumePreview } from "../common/ResumePreview";
import { Button } from "../ui/Button";
import { ScrollIndicator } from "../ui/ScrollIndicator";
import { SocialLinks } from "../ui/SocialLinks";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Two-column Hero */}
      <div className="mx-auto flex min-h-screen w-full flex-col lg:flex-row">
        {/* ================= LEFT - TEXT ================= */}
        <div className="relative z-10 flex w-full items-center px-6 py-24 sm:px-10 lg:w-[42%] lg:px-12 xl:px-16">
          <div className="max-w-2xl">
            {/* Small intro */}
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-blue-400 md:text-base">
              Hello, I'm
            </p>

            {/* Name */}
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl">
              Prattyancha
            </h1>

            {/* Role */}
            <h2 className="mt-6 text-3xl font-semibold leading-tight text-gray-200 sm:text-4xl md:text-5xl">
              Full Stack Developer
              <span className="text-blue-400">.</span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg md:text-xl">
              I build scalable, high-performance web applications and modern
              digital experiences using React, Next.js, Node.js and TypeScript.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#projects">View My Work</Button>

              {/* <Button
                href="/resume.pdf"
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </Button> */}
              <ResumePreview
                trigger={
                  <Button type="button" variant="secondary">
                    Download Resume
                  </Button>
                }
              />
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* ================= RIGHT - VIDEO ================= */}
        <div className="relative min-h-[60vh] w-full lg:min-h-screen lg:w-[100%]">
          <BackgroundVideo
            src="/walk.mp4"
            objectPosition="center center"
            className="absolute inset-0 h-full w-full"
          />

          {/* Video edge gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent"
          />

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"
          />
        </div>
      </div>

      {/* Blue Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
      />

      {/* Scroll Indicator */}
      <ScrollIndicator target="#projects" />
    </section>
  );
}
