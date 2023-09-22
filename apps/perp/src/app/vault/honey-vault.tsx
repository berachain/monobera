import { cloudinaryUrl } from "@bera/config";
import Image from "next/image";

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
    <div className="w-full rounded-xl border border-border p-8 bg-gradient-to-r from-[#180B01] to-[#3B220F] overflow-hidden relative">
        <Image
          src={`${cloudinaryUrl}/BERPS/ly3o2bc8rdjscoeqbe3w`}
          alt="vault-bear"
          width={300}
          height={400}
          className=" absolute -right-12 -bottom-[125px] z-0"
        />
      <div className="mb-8 text-3xl font-semibold leading-9">
        🍯 Honey Vault
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 relative z-10">
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
