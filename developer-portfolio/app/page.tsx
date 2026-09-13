import { Navbar } from "./components/layout/Navbar";
import { Bottom } from "./components/layout/Bottom";

import { About } from "./components/section/About";
import { Contact } from "./components/section/Contact";
import { Experience } from "./components/section/Experience";
import { Hero } from "./components/section/Hero";
import { Projects } from "./components/section/Projects";
import { Skills } from "./components/section/Skills";

export default function Home() {
  return (
    <>
      {/* Fixed navigation */}
      <Navbar />

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
