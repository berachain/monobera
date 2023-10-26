import { type Address } from "wagmi";

export function AddToWalletBtn({ address }: { address: Address }) {
  console.log(address);
  return (
    <div className="flex h-7 w-fit cursor-pointer items-center whitespace-nowrap rounded bg-muted px-2 text-xs font-medium text-muted-foreground hover:opacity-70">
      ADD TO WALLET
    </div>
  );
}
