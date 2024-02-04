import Image from "next/image";

import EcosystemAnnouncements from "./components/ecosystem-announcements";
import EcosystemProjects from "./components/ecosystem-projects";
import Hero from "./components/hero";
import TopProjects from "./components/top-projects";

export default function Home() {
  return (
    <main>
      <div className="flex w-full flex-col items-center justify-between">
        <Hero />
        <TopProjects />
        <EcosystemProjects />
        <EcosystemAnnouncements />
      </div>
    </main>
  );
}
