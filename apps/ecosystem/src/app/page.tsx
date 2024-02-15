"use client";

// import EcosystemAnnouncements from "./components/ecosystem-announcements";
// import TopProjects from "./components/top-projects";
import { Footer } from "@bera/shared-ui";

import EcosystemProjects from "./components/ecosystem-projects";
import Hero from "./components/hero";
import MyProject from "./components/my-project";
import ProjectHighlights from "./components/project-highlights";

export default function Home() {
  return (
    <main>
      <div className="relative mx-auto flex flex-col items-center justify-between bg-contain bg-no-repeat">
        <Hero />
        {/* <TopProjects /> */}
        <EcosystemProjects />
        <ProjectHighlights />
        {/* <EcosystemAnnouncements /> */}
        <MyProject />
        <Footer />
      </div>
    </main>
  );
}
