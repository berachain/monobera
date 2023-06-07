import { useTokenApprove, type Token } from "@bera/berajs";
import { Button } from "@bera/ui/button";

type Props = {
  token: Token | undefined;
  spender: string;
};

export const ApproveTokenButton = ({ token, spender }: Props) => {
  const { approve, isLoading } = useTokenApprove({
    token: token?.address as `0x${string}`,
    spender: spender as `0x${string}`,
  });
  return (
    <Button onClick={approve}>
      {isLoading ? "Loading..." : `Approve ${token?.symbol}`}
    </Button>
  );
};
