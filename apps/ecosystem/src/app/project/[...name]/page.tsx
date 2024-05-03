import Link from "next/link";
import { Icons } from "@bera/ui/icons";

import ProjectPage from "./projectPage";

interface ProjectPageProps {
  params: {
    name: string;
  };
}

// TODO (mei): Implement this page
export default async function Page({ params }: ProjectPageProps) {
  return (
    <>
      <div className="relative mx-auto flex w-full items-start p-4 xl:w-[1280px]">
        <Link href="/" className="flex flex-row items-center">
          <Icons.chevronLeft className="mr-2 h-6 w-6" />
          <div className="pr-2 text-lg font-semibold text-foreground">
            Ecosystem Projects
          </div>
        </Link>
      </div>
      <div className="relative mx-auto flex w-full flex-col items-center justify-between bg-contain bg-no-repeat px-4 xl:w-[1280px]">
        <ProjectPage name={params.name[0]} />
      </div>
    </>
  );
}
