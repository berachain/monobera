import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Claim() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-r from-[#180B01] to-[#3B220F] px-10 py-8">
      <div className="relative z-10 font-medium text-muted-foreground">
        Available to Claim
      </div>
      <div className="relative z-10 flex items-center gap-2 text-3xl font-semibold leading-9">
        <Icons.nature className="h-7 w-7" />
        207.10
      </div>
      <Button className="relative z-10 mt-4 bg-primary px-4 py-2 text-primary-foreground">
        Claim Rewards
      </Button>
      <Image
        src={`${cloudinaryUrl}/BERPS/wpvbk14quq4wm0zmcqmj`}
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
