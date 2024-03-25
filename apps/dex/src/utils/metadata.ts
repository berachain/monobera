import { dexName } from "@bera/config";

export function getMetaTitle(text: string) {
  return `${text} | ${dexName}`;
}
