import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function TwitterJump({ bid }: { bid: string | undefined }) {
  const url = "https://artio.faucet.berachain.com/";
  const text = `Ooga+Booga!%0AI'm+claiming+my+testnet+tokens+for+Bearchain+Artio%0AThe+first+L1+not+backed+by+Paradigm+@berachain%20%0A%23bid=${bid}%0A%0A`;
  const link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  return (
    <Button
      onClick={() => window.open(link, "_blank")}
      className="w-full"
      disabled={!bid}
    >
      <Icons.twitter className="mr-2" />
      Open Twitter
    </Button>
  );
}
