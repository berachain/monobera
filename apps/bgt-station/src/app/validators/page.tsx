import React from "react";
import { type Metadata } from "next";
import { getMetaTitle } from "~/utils/metadata";
import Validators from "./validators";

export const metadata: Metadata = {
  title: getMetaTitle("Validators"),
  description: "View active validators on Berachain",
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page: number;
    limit: number;
  };
}) {
  const { page, limit } = searchParams;
  return <Validators page={page ?? 0} limit={limit ?? 10} />;
}
