import { PoolCardLoading } from "./PoolCard";

export default function CarsViewLoading() {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[0, 0, 0, 0].map((_, index) => (
        <PoolCardLoading key={index} />
      ))}
    </div>
  );
}
