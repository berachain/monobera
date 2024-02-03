"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Avatar, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";

import Announcements from "./announcements";
import FAQ from "./faq";

const projects = [
  {
    name: "Beras in NYC",
    image: "/bear_1.png",
    date: "04/04/2024",
    numParticipants: "4.20k",
  },
  {
    name: "Bears in Denver",
    image: "/bear_2.png",
    date: "04/04/2024",
    numParticipants: "4.20k",
  },
  {
    name: "Beras in LA",
    image: "/bear_3.png",
    date: "04/04/2024",
    numParticipants: "4.20k",
  },
];

const ambassadors = [
  {
    name: "Brigade General",
    image: "/bear_center.png",
    tier: "Tier 2",
    intro: "Amet avec adios abibas abelao donde",
  },
  {
    name: "The King’s Oath",
    image: "/bear_center.png",
    tier: "Tier 1",
    intro: "Amet avec adios abibas abelao donde",
  },
  {
    name: "Foot Solider ",
    image: "/bear_center.png",
    tier: "Tier 2",
    intro: "Amet avec adios abibas abelao donde",
  },
];

export default function AmbassadorPageContent() {
  return (
    <div className="absolute z-20 justify-center pt-8 text-center">
      <div className="flex flex-col items-center justify-center pt-8">
        <h1 className="md:leading-14 leading-24 text-3xl font-extrabold md:text-5xl">
          Connect with the{" "}
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Community
          </span>
        </h1>
        <div className="mt-8 grid h-fit grid-cols-1 gap-4 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div className="relative col-span-1 flex h-[224px] w-[280px] flex-col rounded-xl border border-solid bg-background">
              <Link href="" target="_blank">
                <Image
                  src={project.image}
                  alt="bera banner"
                  width={452}
                  height={175}
                  priority
                  loading="eager"
                />
                <div className="flex flex-row justify-between gap-1 p-2">
                  <div className="justify-start">
                    <div className="text-md font-semibold text-foreground">
                      {project.name}
                    </div>
                    <div className="text-sm text-foreground">
                      {project.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground">
                      {project.numParticipants} Participants
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button onClick={() => {}} variant="outline">
            View more events
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center pt-8">
        <h1 className="md:leading-14 leading-24 text-3xl font-extrabold md:text-5xl">
          Who are the{" "}
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Ambassadors?
          </span>
        </h1>
        <div className="mt-8 grid h-fit grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {ambassadors.map((ambassador) => (
            <Link href="" target="_blank">
              <div className="relative col-span-1 flex h-[440px] w-[300px] flex-col rounded-xl border border-solid bg-background">
                <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={ambassador.image}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div className="h-[40px] w-[86px] rounded-sm border border-solid p-2">
                    {ambassador.tier}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {ambassador.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {ambassador.intro}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Button onClick={() => {}} variant="outline">
            Register
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-4 pt-8 ">
        <Image
          className="max-[600px]:mx-auto"
          src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
          alt="proposal-bear"
          width={500}
          height={500}
        />
        <h1 className="md:leading-14 leading-24 text-3xl font-extrabold md:text-5xl">
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Unlock
          </span>
          Your <br />
          Potential as an
          <br />
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Ambassador
          </span>
        </h1>
        <Image
          className="max-[600px]:mx-auto"
          src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
          alt="proposal-bear"
          width={500}
          height={500}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center gap-4 pt-8">
        <div className="mx-auto flex h-[320px] w-full flex-col items-center justify-center bg-[#FF8443]">
          <Image
            className="absolute h-full w-full object-cover"
            src="/orange_bg.png"
            alt="bg"
            layout="fill"
          />

          <div className="absolute z-20 max-w-[653px] pt-8">
            <h1 className="md:leading-14 leading-24 w-[653px] text-2xl font-extrabold text-white md:text-xl">
              Experience the collaboration of numerous creators. Register now
              and become a part of a community comprising over 10,000 local and
              international creators.
            </h1>
            <div className="mt-8">
              <Button
                onClick={() => {}}
                variant="outline"
                className=" text-white"
              >
                Sign up as an Ambassador
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Announcements />
      <FAQ />
    </div>
  );
}
