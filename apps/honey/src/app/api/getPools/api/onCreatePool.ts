"use server";

import { revalidatePath } from "next/cache";

/* eslint-disable */
export default async function onCreatePool() {
  revalidatePath("/api/getPools/api");
}
