import Image from "next/image";

export function OrderChart() {
  return (
    <div>
      <Image
        src={`/chart-lg.png`}
        alt="fake chart"
        width={2000}
        height={1000}
        className="w-full"
      />
    </div>
  );
}
