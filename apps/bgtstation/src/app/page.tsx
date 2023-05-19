import { Button } from "@bera/ui/button";
import { Card, CardHeader } from "@bera/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { Toggle } from "@bera/ui/toggle";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Governance</h1>
        <Button>New proposal</Button>
      </div>
      <Tabs defaultValue="account">
        <TabsList className="flex justify-start">
          <TabsTrigger value="voting">Voting</TabsTrigger>
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="passed">Passed</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <Card>
          <CardHeader className="flex flex-row justify-start">
            <Toggle>All</Toggle>
            <Toggle className="mt-0">BERA</Toggle>
          </CardHeader>
        </Card>
        <TabsContent value="voting"></TabsContent>
      </Tabs>
    </div>
  );
}
