import React from "react";
import Head from "next/head";
// import Image from "next/image";
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
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Ambassador Program Overview
          </h1>
          <p className="mb-6 text-muted-foreground">
            Nurturing Community Growth with the Bera Legion
          </p>
          <p className="mb-4 text-foreground">
            The Bera Legion is more than just a program; it&apos;s a commitment
            to fostering a vibrant and engaged community within the Berachain
            ecosystem. With a tiered system designed to empower individuals who
            share our passion, ambassadors play a pivotal role in driving
            adoption, nurturing community growth, and strengthening the
            Berachain ecosystem.
          </p>
          {/* <div className="mb-6">
            <Image src="/placeholder.jpg" alt="Bera Legion" width={640} height={360} layout="intrinsic" />
          </div> */}
        </div>
        <div className="max-w-4xl text-lg bg-background shadow-lg rounded-lg p-6 mb-6">
          <section className="mb-6 p-4 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              General Expectations
            </h2>
            <p className="text-muted-foreground">
              Ambassadors are expected to actively engage in Berachain community
              channels, create various types of content, including blogs,
              guides, videos, and memes, assist in localizing content into
              different languages, host and participate in virtual and physical
              events, represent their specific region within the Berachain
              community, and contribute to regular calls with other ambassadors
              and the Berachain team.
            </p>
          </section>
          <section className="mb-6 p-4 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Introducing the Berachain Legion: Uniting Advocates for Innovation
            </h2>
            <ul className="list-disc pl-8 text-muted-foreground">
              <li>
                Legates: Advocates for Berachain&apos;s vision, leveraging their
                influence to amplify Berachain&apos;s presence across various
                platforms.
              </li>
              <li>
                Centurions: Guardians of community harmony, ensuring positive
                user experiences and fostering inclusivity.
              </li>
              <li>
                Optios: Architects of memetic influence, crafting impactful
                memes to enhance brand awareness and community engagement.
              </li>
              <li>
                Imaginifiers: Champions of educational content, enriching the
                Berachain ecosystem through informative and insightful content
                creation.
              </li>
            </ul>
          </section>
          <section className="mb-6 p-4 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Benefits of Becoming an Ambassador
            </h2>
            <p className="text-muted-foreground">
              Ambassadors enjoy various benefits, including social incentives
              such as access to Berachain events, special badges, custom
              merchandise, and exclusive networking opportunities; financial
              incentives such as microgrants and boosted rewards, as well as
              career growth opportunities with the potential for career
              placement and peer recognition within the Berachain ecosystem.
            </p>
          </section>
          <section className="mb-6 p-4 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Program Objectives
            </h2>
            <p className="text-muted-foreground">
              The Bera Legion, Berachain&apos;s official Ambassador Program,
              aims to achieve the following key objectives: Community
              Engagement, Content Creation, Event Hosting & Facilitation,
              Regional Representation, and Ambassador Growth.
            </p>
          </section>
          <section className="mb-8 p-4 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Onboarding Process
            </h2>
            <p className="text-muted-foreground">
              New ambassadors undergo an onboarding process where expectations
              and Key Performance Indicators (KPIs) are set, relevant
              communication channels are accessed, and performance is monitored
              during a trial period.
            </p>
          </section>
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
