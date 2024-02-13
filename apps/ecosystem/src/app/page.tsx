import EcosystemAnnouncements from "./components/ecosystem-announcements";
import EcosystemProjects from "./components/ecosystem-projects";
import Hero from "./components/hero";
import TopProjects from "./components/top-projects";

export default function Home() {
  return (
    <main>
      <div className="relative mx-auto flex flex-col items-center justify-between bg-contain bg-no-repeat">
        <Hero />
        <div className="lg:w-[1280px]">
          <TopProjects />
          <EcosystemProjects />
          <EcosystemAnnouncements />
        </div>
      </div>
    </main>
  );
}
