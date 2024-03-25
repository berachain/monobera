import { honeyName } from "@bera/config";

export function getMetaTitle(text: string) {
  return `${text} | ${honeyName}`;
}
