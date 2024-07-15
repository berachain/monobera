import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { dexName } from "@bera/config";
import { Documentation, Footer, getMetaTitle } from "@bera/shared-ui";

import Data from "./components/Data";
import Hero from "./components/Hero";

export const metadata: Metadata = {
  title: getMetaTitle("Home", dexName),
  description: `Welcome to ${dexName}!`,
};

export const revalidate = 60;

export default async function Homepage() {
  try {
    return (
      <>
        <div className="container max-w-1280 pb-16">
          <Hero />
          <Data />
          <Documentation className="my-24" />
        </div>
        <Footer />
      </>
    );
  } catch (e) {
    notFound();
  }
}
