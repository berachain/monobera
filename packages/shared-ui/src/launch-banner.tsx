import { Icons } from "@bera/ui/icons";

export const LaunchBanner = ({ appName }: { appName: string }) => {
  return (
    <header className="top-[72px] z-50 flex h-12 w-[100vw] items-center justify-center gap-2 bg-warning-foreground px-1 py-3 text-white">
      <div className="flex items-center gap-2">
        <Icons.clock8 className="h-4 w-4" />
        <div className="font-semibold leading-tight text-sm md:text-md">
          {`Validators can now point liquidity to ${appName}. Users may interact after
          Artio Epoch 1`}
        </div>
      </div>
    </header>
  );
};
