import Image from "next/image";

export default function SupplyModalContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Supply</div>
      <Image
        src={"/supply.png"}
        alt="supply-img"
        className="h-36 w-96"
        width={100}
        height={100}
      />
      <div></div>
    </div>
  );
}
