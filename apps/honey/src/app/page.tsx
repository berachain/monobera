import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center py-56">
      <div className="w-[800px] p-12">
        <Image
          src={`/honeytitle.png`}
          width={1816}
          height={774}
          alt="Honey logo"
        />
      </div>
    </div>
  );
}
