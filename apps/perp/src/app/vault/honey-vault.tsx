import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";

export default function HoneyVault() {
  const content = [
    {
      title: "Total value Locked",
      value: "$69,420,669",
      subtitle: "Worth of Honey",
    },
    {
      title: "bHONEY Price",
      value: "$1.69",
      subtitle: "bHONEY supply 46,860,472",
    },
    { title: "Vault APR%", value: "69,420%", subtitle: "In HONEY Yields" },
  ];
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-r from-[#180B01] to-[#3B220F] p-8">
      <Image
        src={`${cloudinaryUrl}/BERPS/ly3o2bc8rdjscoeqbe3w`}
        alt="vault-bear"
        width={300}
        height={400}
        className=" absolute -bottom-[125px] -right-12 z-0"
      />
      <div className="mb-8 text-3xl font-semibold leading-9">
        🍯 Honey Vault
      </div>
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:gap-8">
        {content.map((item, index) => (
          <div key={index}>
            <div className=" text-xs font-medium leading-tight text-muted-foreground">
              {item.title}
            </div>
            <div className="mt-2 text-xl font-semibold leading-7">
              {item.value}
            </div>
            <div className="mt-1 text-xs leading-3 text-muted-foreground">
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
