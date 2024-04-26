"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SearchInput } from "@bera/shared-ui";
import { Avatar, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { useProjects } from "../../hooks/useProjects";

export interface EcosystemProject {
  icon: string;
  name: string;
  subtitle: string;
  description: string;
  goto: string;
  twitter: string;
  ecosystemType1: string;
  ecosystemType2: string;
}

export default function ProjectPage({ name }: { name: string | undefined }) {
  const { projects: projectList, isLoading } = useProjects();

  const project = (projectList as EcosystemProject[])?.find(
    (p: EcosystemProject) => p.name === decodeURIComponent(name ?? ""),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div
      id="dapps"
      className="flex flex-col items-center justify-center gap-6 text-center"
    >
      <Avatar className="h-[96px] w-[96px]">
        <AvatarImage
          src={
            project.icon?.endsWith(".svg")
              ? "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/bera.png"
              : project.icon
          }
          className="rounded-full"
        />
      </Avatar>
      <div className="pt-4">
        <div className="text-3xl font-semibold">{project.name}</div>

        {/* Show 2 types */}
        <div className="flex flex-col items-center justify-center gap-2 pt-4 text-foreground">
          <Button variant="secondary" className="text-xs">
            {project.ecosystemType1}
          </Button>
          {project.ecosystemType2 && (
            <Button variant="secondary" className="text-xs">
              {project.ecosystemType2}
            </Button>
          )}
          <div className="flex items-center justify-center gap-2 pt-4">
            {project.goto && (
              <Link href={project.goto}>
                <Icons.externalLink />
              </Link>
            )}
            <Link href={project.twitter ? project.twitter : project.goto}>
              <Icons.twitter />
            </Link>
          </div>
          <div className="flex flex-col items-start gap-4 p-6">
            <div className="text-xl font-semibold">About {project.name}</div>
            <div className="flex text-left text-sm leading-5 text-foreground">
              {project.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
