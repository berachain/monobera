"use client";

import { useEffect } from "react";
import { Fit, Layout, useRive } from "@rive-app/react-canvas";

export default function RiveAnimation() {
  const { RiveComponent, rive } = useRive({
    src: "/faucetredo.riv",
    stateMachines: "faucetStateMachine",
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain }),
  });

  useEffect(() => {
    if (rive) rive.play();
  }, [rive]);

  return (
    <div className="hidden h-[614px] w-full max-w-[523px] object-cover xl:block">
      <RiveComponent />
    </div>
  );
}
