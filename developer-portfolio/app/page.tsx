import { Navbar } from "./components/layout/Navbar";
import { Bottom } from "./components/layout/Bottom";

import { About } from "./components/section/About";
import { Contact } from "./components/section/Contact";
import { Experience } from "./components/section/Experience";
import { Hero } from "./components/section/Hero";
import { Projects } from "./components/section/Projects";
import { Skills } from "./components/section/Skills";

import { FloatingChatButton } from "./components/ui/FloatingChatButton";
import { SocialLinks } from "./components/ui/SocialLinks";

export default function Home() {
  return (
    <>
      {/* Fixed navigation */}
      <Navbar />

      {/* Fixed AI Assistant */}
      <FloatingChatButton />
      <SocialLinks />

      <main className="bg-black text-white">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Bottom />
      </main>
    </>
  );
}
