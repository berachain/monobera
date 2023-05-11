import { Metadata } from "next";
import { Button, Card } from "ui";

const CARD_CONTENT = [
  {
    title: "Caching Tasks",
    href: "https://turbo.build/repo/docs/core-concepts/caching",
    cta: "Read More",
  },
  {
    title: "Running Tasks",
    href: "https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks",
    cta: "Read More",
  },
  {
    title: "Configuration Options",
    href: "https://turbo.build/repo/docs/reference/configuration",
    cta: "Read More",
  },
];

export const metadata: Metadata = {
  title: "Bera Home Page",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pb-8 pt-16 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold leading-5 tracking-tight text-white sm:text-7xl">
          Bera
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text px-2 text-transparent">
            Home
          </span>
        </h1>
        <div className="mx-auto mt-5 max-w-xl sm:flex sm:justify-center md:mt-8">
          <Button />
        </div>

        <div className="mt-12 grid grid-cols-1 place-content-evenly gap-4 sm:grid-cols-3">
          {CARD_CONTENT.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </main>
    </div>
  );
}
