//@ts-nocheck
import { NextResponse } from "next/server";
import Papa from "papaparse";

interface EcosystemProject {
  icon: string;
  name: string;
  subtitle: string;
  description: string;
  goto: string;
  twitter: string;
  ecosystemType1: string;
  ecosystemType2: string;
}

const CSV_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.NEXT_PUBLIC_ECOSYSTEM_GOOGLE_SHEET_ID}/pub?output=csv`;

export async function GET() {
  try {
    const res = await fetch(CSV_URL);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch projects: ${res.status} ${res.statusText}`,
      );
    }
    const text = await res.text();
    const projects = Papa.parse<EcosystemProject>(text, {
      header: true,
    });

    return new NextResponse(JSON.stringify(projects.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to retrieve projects" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
