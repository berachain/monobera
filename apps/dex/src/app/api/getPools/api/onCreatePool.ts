"use server";

import { revalidatePath } from "next/cache";

export default function onCreatePool() {
  revalidatePath("/api/getPools/api");
}
