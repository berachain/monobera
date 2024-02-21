import React from "react";
import Head from "next/head";
import Image from "next/image";

// import Link from "next/link";

export default function AmbassadorProgram() {
  return (
    <>
      <Head>
        <title>Learn More About the Ambassador Program</title>
        <meta
          name="description"
          content="Learn more about the ambassador program and how you can contribute to the Berachain ecosystem."
        />
      </Head>
      <div className="flex max-w-[1440px] flex-wrap items-center justify-center p-4">
        <div className="mb-6 text-center">
          <div className="flex-start flex items-center justify-between px-8">
            <div className="mt-32">
              <h1 className="mb-4 text-left text-5xl font-bold text-foreground">
                Ambassador <br /> Program Overview
              </h1>
              <p className="mb-6 px-1 text-left text-xl text-muted-foreground">
                Nurturing Community Growth with the Bera Legion
              </p>
            </div>
            <div>
              <Image
                src="/knowmoarbear.png"
                alt="Bera Legion"
                width={420}
                height={280}
                layout="responsive"
              />
            </div>
          </div>
          <p className="mb-4 rounded-md bg-muted px-6 py-4 text-lg text-foreground">
            The Bera Legion is more than just a program; it&apos;s a commitment
            to fostering a vibrant and engaged community within the Berachain
            ecosystem. With a tiered system designed to empower individuals who
            share our passion, ambassadors play a pivotal role in driving
            adoption, nurturing community growth, and strengthening the
            Berachain ecosystem.
          </p>
        </div>
        <div className="mb-6 flex flex-wrap items-start justify-center gap-8 rounded-lg bg-background align-middle text-lg shadow-lg">
          <div className="flex w-full flex-col items-stretch justify-center gap-8 align-middle sm:flex-row">
            <section
              className="mb-6 flex-grow rounded-lg bg-muted p-4"
              style={{ flexBasis: "0" }}
            >
              <div className="flex flex-col rounded-md">
                <div className="flex-col ">
                  <div className="flex-start flex-col gap-8 p-6">
                    <h1 className="mb-2 text-3xl font-semibold text-foreground">
                      1. General Expectations
                    </h1>
                    <p className="text-wrap pb-8 text-muted-foreground">
                      Ambassadors are expected to actively engage in Berachain
                      community channels, create various types of content,
                      including blogs, guides, videos, and memes, assist in
                      localizing content into different languages, host and
                      participate in virtual and physical events, represent
                      their specific region within the Berachain community, and
                      contribute to regular calls with other ambassadors and the
                      Berachain team.
                    </p>
                    <Image
                      src="/SmokeyBongless.png"
                      alt="Bera Legion"
                      width={120}
                      height={80}
                      layout="responsive"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section
              className="mb-6 flex-grow rounded-lg bg-muted"
              style={{ flexBasis: "0" }}
            >
              <div className="flex rounded-md">
                <div className="flex-col gap-8 p-6">
                  <Image
                    src="/beralegion.png"
                    alt="Bera Legion"
                    width={320}
                    height={260}
                    layout="responsive"
                  />
                  <h2 className="mb-2 mt-[24px] text-[32px] font-semibold leading-tight text-foreground">
                    2. Introducing the Berachain Legion: Uniting Advocates for
                    Innovation
                  </h2>
                  <ul className="text-md list-decimal pl-6 text-muted-foreground">
                    <li>
                      <h4 className="text-bold">Legates:</h4> Advocates for
                      Berachain&apos;s vision, leveraging their influence to
                      amplify Berachain&apos;s presence across various
                      platforms.
                    </li>
                    <li>
                      <h4>Centurions:</h4> Guardians of community harmony,
                      ensuring positive user experiences and fostering
                      inclusivity.
                    </li>
                    <li>
                      <h4>Optios:</h4> Architects of memetic influence, crafting
                      impactful memes to enhance brand awareness and community
                      engagement.
                    </li>
                    <li>
                      <h4>Imaginifiers:</h4>
                      Champions of educational content, enriching the Berachain
                      ecosystem through informative and insightful content
                      creation.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          <div className="mb-6 flex flex-wrap items-start justify-center gap-8 rounded-lg bg-background align-middle text-lg shadow-lg">
            <div className="grid w-full items-stretch justify-center gap-8 align-middle sm:flex-row lg:grid-cols-3">
              <section className="flex flex-col rounded-lg bg-muted p-6">
                <div className="flex flex-col rounded-md">
                  <Image
                    src="/AmbassadorBera.png"
                    alt="Bera Legion"
                    width={640}
                    height={360}
                    layout="responsive"
                  />
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-foreground">
                      3. Benefits of Becoming an Ambassador
                    </h2>
                    <p className="text-muted-foreground">
                      Ambassadors enjoy various benefits, including social
                      incentives such as access to Berachain events, special
                      badges, custom merchandise, and exclusive networking
                      opportunities; financial incentives such as microgrants
                      and boosted rewards, as well as career growth
                      opportunities with the potential for career placement and
                      peer recognition within the Berachain ecosystem.
                    </p>
                  </div>
                </div>
              </section>
              <section className="mb-6 rounded-lg bg-muted p-6">
                <div className="flex flex-col justify-between rounded-md">
                  <Image
                    src="/BondBear.png"
                    alt="Bera Legion"
                    width={640}
                    height={360}
                    layout="responsive"
                  />
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-foreground">
                      4. Program Objectives
                    </h2>
                    <p className="text-muted-foreground">
                      The Bera Legion, Berachain&apos;s official Ambassador
                      Program, aims to achieve the following key objectives:
                      Community Engagement, Content Creation, Event Hosting &
                      Facilitation, Regional Representation, and Ambassador
                      Growth.
                    </p>
                  </div>
                </div>
              </section>
              <section className="mb-6 rounded-lg bg-muted p-6">
                <div className="flex flex-col rounded-md">
                  <Image
                    src="/AlienBoo.png"
                    alt="Bera Legion"
                    width={640}
                    height={360}
                    layout="responsive"
                  />
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-foreground">
                      5. Onboarding Process
                    </h2>
                    <p className="text-muted-foreground">
                      New ambassadors undergo an onboarding process where
                      expectations and Key Performance Indicators (KPIs) are
                      set, relevant communication channels are accessed, and
                      performance is monitored during a trial period.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* <div className="flex justify-center gap-4">
            <Link href="/sign-up" passHref>
              <button className="btn btn-primary">Sign Up</button>
            </Link>
            <Link href="/program-details" passHref>
              <button className="btn btn-secondary">Learn More</button>
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
}
