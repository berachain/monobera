import Papa from "papaparse";

const CSV_URL = `https://docs.google.com/spreadsheets/d/e/${process.env.NEXT_PUBLIC_ECOSYSTEM_GOOGLE_SHEET_ID}/pub?output=csv`;
export async function getProjects() {
  const res = await fetch(CSV_URL);
  const text = await res.text();
  const projects = Papa.parse(text, {
    header: true,
  });

  return projects.data;
}
