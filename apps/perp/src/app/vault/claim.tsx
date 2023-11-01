import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";

export default function Claim() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-r from-[#180B01] to-[#3B220F] px-10 py-8">
      <div className=" relative z-10 w-[115px] h-[52px] px-3 py-2 bg-stone-900 rounded-xl border border-yellow-600 justify-center items-center gap-1 inline-flex">
        <div className="text-yellow-600 text-3xl font-semibold font-['IBM Plex Sans'] leading-9">6.69%</div>
      </div>
      <div className=" relative z-10 mt-4 text-xs text-muted-foreground w-full">
        Honey Staking Projected <br /> Reward Rate (PRR)
      </div>
      <Image
        src={`${cloudinaryUrl}/BERPS/nsc94gwejblw1oj8yyoo`}
        alt="honey-jar"
        width={1080}
        height={186}
        className="absolute bottom-0 right-0 z-0 hidden h-[186px] object-cover sm:block"
        style={{ objectPosition: "right" }}
      />
      <Image
        src={`${cloudinaryUrl}/BERPS/ehohrtn3bi6inl4uv2ks`}
        alt="honey-jar"
        width={1080}
        height={186}
        className="absolute bottom-0 right-0 z-0 block h-[186px] object-cover sm:hidden"
        style={{ objectPosition: "right" }}
      />
    </div>
  );
}
