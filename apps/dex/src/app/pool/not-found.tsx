"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

const NotFoundPage = () => {
  return (
    <div className="mx-auto mt-8 flex w-fit flex-col items-center justify-center gap-4">
      <Image
        src={
          "https://res.cloudinary.com/duv0g402y/image/upload/f_auto,q_auto/v1/bears/e6monhixzv21jy0fqes1"
        }
        alt="not found bear"
        width={345.35}
        height={200}
      />
      <div>
        <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-foreground">
          Pool not found
        </div>
        <div className="text-center leading-7 text-muted-foreground">
          Something went wrong finding this pool.
        </div>
        <div className="text-center leading-7 text-muted-foreground">
          Please check the address and try again.
        </div>
      </div>
      <Link href={"/pools"} className="mx-auto">
        {" "}
        <Button>See Pools</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
