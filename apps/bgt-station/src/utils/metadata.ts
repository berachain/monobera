import { bgtName } from "@bera/config";

export function getMetaTitle(text: string) {
  return `${text} | ${bgtName}`;
}
