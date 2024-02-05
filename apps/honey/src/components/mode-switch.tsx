import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";

export default function ModeSwitch({ arcade = false }: { arcade: boolean }) {
  return (
    <section
      className="hidden h-fit w-full cursor-pointer text-center font-medium honey:block"
      id="mint"
    >
      {arcade ? (
        <Link
          href="/"
          className="flex items-center justify-center gap-1 bg-sky-50 p-2 font-honey"
        >
          <Image
            src={`${cloudinaryUrl}/honey/k67yfz1uswqqvfh2pmgo`}
            className="block w-8"
            alt="arcade bear"
            width={32}
            height={32}
          />{" "}
          Switch To Simple Mode
        </Link>
      ) : (
        <Link
          href="/?mode=arcade"
          className="flex items-center justify-center gap-1 bg-yellow-50 bg-opacity-20 p-2 backdrop-blur-2xl"
        >
          <Image
            src={`${cloudinaryUrl}/honey/k67yfz1uswqqvfh2pmgo`}
            className="block w-8"
            alt="arcade bear"
            width={32}
            height={32}
          />{" "}
          Switch To Arcade Mode
        </Link>
      )}
    </section>
  );
}
