// @client
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

interface Project {
  name: string;
  image: string;
  date: string;
  numParticipants: string;
}

// Define the projects
export const projects: Project[] = [
  // {
  //   name: "Beras in NYC",
  //   image: "/bear_1.png",
  //   date: "04/04/2024",
  //   numParticipants: "4.20k",
  // },
  {
    name: "Beras in denver",
    image: "/bear_1.png",
    date: "02/29/2024",
    numParticipants: "1.00k+",
  },
  {
    name: "Beras in Dubai",
    image: "/bear_2.png",
    date: "TBD",
    numParticipants: "N/A",
  },
  // {
  //   name: "Beras at your Mom's House",
  //   image: "/bear_11.png",
  //   date: "06/09/2420",
  //   numParticipants: "4.20k",
  // },
];

// Define the ProjectCard component
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href="https://lu.ma/Berapalooza">
      <div className="relative col-span-1 flex h-[auto] w-[280px] flex-col rounded-xl border border-solid bg-background">
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            width={452}
            height={175}
            style={{ borderRadius: "0.75rem 0.75rem 0 0" }}
            priority
            loading="eager"
          />
        )}
        <div className="flex flex-col justify-between gap-1 p-4 pb-4">
          <div className="text-md font-semibold text-foreground">
            {project.name}
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">{project.date}</div>
            <div className="text-sm text-muted-foreground">
              {project.numParticipants} Participants
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Define the Projects component
export function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [viewMore, setViewMore] = useState(true); // true = "View More", false = "View Less"

  const toggleDisplay = () => {
    if (viewMore) {
      setVisibleProjects((current) => current + 1);
    } else {
      setVisibleProjects(3);
    }
    setViewMore(!viewMore);
  };

  return (
    <div className="flex flex-col flex-wrap items-center justify-center pb-12 pt-12">
      <h1 className="md:leading-14 leading-24 pb-12 text-3xl font-extrabold md:text-5xl">
        Connect with the{" "}
        <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
          Community
        </span>
      </h1>
      <div className="z-1 flex flex-wrap justify-center gap-4">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <Button
        variant="outline"
        className="z-10 mb-8 mt-12"
        onClick={toggleDisplay}
      >
        {viewMore
          ? "View More Events (coming soon)"
          : "View Less Events (coming soon)"}
      </Button>
    </div>
  );
}
