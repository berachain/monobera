import EcosystemAnnouncements from "./components/ecosystem-announcements";
import EcosystemProjects from "./components/ecosystem-projects";
import Hero from "./components/hero";
import TopProjects from "./components/top-projects";

export default function Home() {
  return (
    <main>
      <div className="relative mx-auto flex flex-col items-center justify-between bg-contain bg-no-repeat px-2 md:px-12 lg:px-32">
        <Hero />
        <TopProjects />
        <EcosystemProjects />
        <EcosystemAnnouncements />
      </div>
    </main>
  );
}
