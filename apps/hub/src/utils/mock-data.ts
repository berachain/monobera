type UptimeStatus = {
  status: boolean;
  block: number;
  fill: string;
  content: number;
};

export function createUptimeArray(size: number): UptimeStatus[] {
  const array: UptimeStatus[] = [];
  for (let i = 0; i < size; i++) {
    const status = Math.random() < 0.8;
    array.push({
      status: status,
      block: 1000 + i,
      content: 100,
      fill: status ? "var(--color-active)" : "var(--color-inactive)",
    });
  }
  return array;
}
