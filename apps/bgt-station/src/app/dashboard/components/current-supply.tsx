import { usePollBgtSupply } from "@bera/berajs";
import { Card, CardContent, CardHeader } from "@bera/ui/card";

export const CurrentSupply = () => {
  const { useBgtSupply } = usePollBgtSupply();
  const bgtSupply = useBgtSupply();
  return (
    <Card>
      <CardHeader>
        <h3 className="text-md font-semibold text-backgroundSecondary">
          Current supply
        </h3>
      </CardHeader>
      <CardContent>
        <h4 className="text-2xl font-medium">
          {Number(bgtSupply ?? 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          BGT
        </h4>
      </CardContent>
    </Card>
  );
};
