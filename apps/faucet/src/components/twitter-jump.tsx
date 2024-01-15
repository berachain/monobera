import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function TwitterJump({
  bid,
  disabled,
}: {
  bid: string | undefined;
  disabled: boolean;
}) {
  const url = "https://artio.faucet.berachain.com/";
  const text = `HENLO+%26+OOGA+BOOGA+🐻%0A%0ASnag+your+testnet+tokens+now+%26+join+the+Bera+Brigade!%0A%0AExperience+the+forefront+of+innovation+with+@berachain%0AArtio+-+the+first+L1+NOT+backed+by+Paradigm🫵🐻⛓️%0A%0AProof+of+Drip🔑:%23BID=${bid}%0A`;
  const link = `https://twitter.com/intent/tweet?text=${text}&url=${url}%0A%23Berachain+%23LiquidityUnchained`;

  return (
    <Button
      onClick={() => window.open(link, "_blank")}
      className="w-full"
      disabled={!bid && !disabled}
    >
      <Icons.twitter className="mr-2" />
      Open Twitter
    </Button>
  );
}
