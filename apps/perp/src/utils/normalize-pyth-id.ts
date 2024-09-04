export const normalizePythId = (id: string) =>
  id?.startsWith("0x") ? id : `0x${id}`;
