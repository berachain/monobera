import { Button } from "@bera/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@bera/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Label } from "@bera/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Switch } from "@bera/ui/switch";
import dynamic from "next/dynamic";

export const runtime = "edge";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Swap() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      <div className="col-span-1"></div>
      <div className="col-span-3">
        <Card>
          <CardHeader>
            <div className="flex justify-between center">
              Swap{" "}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-10 rounded-full p-0">
                    <Icons.settings />
                    <span className="sr-only">Open popover</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none flex gap-1 align-middle">
                        Slippage tolerance
                        <Button
                          variant="ghost"
                          className="w-5 h-5 rounded-full p-0"
                        >
                          <Icons.tooltip className="h-3 w-3 text-muted-foreground" />
                          <span className="sr-only">Help</span>
                        </Button>
                      </h4>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      <Button variant="outline" className="col-span-1">
                        0.5%
                      </Button>
                      <Button variant="outline" className="col-span-1">
                        1.0%
                      </Button>
                      <Button variant="outline" className="col-span-1">
                        2.0%
                      </Button>
                      <Input
                        type="text"
                        className="col-span-1"
                        placeholder="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none flex gap-1 align-middle">
                        Transaction type
                        <Button
                          variant="ghost"
                          className="w-5 h-5 rounded-full p-0"
                        >
                          <Icons.tooltip className="h-3 w-3 text-muted-foreground" />
                          <span className="sr-only">Help</span>
                        </Button>
                      </h4>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <Button variant="outline" className="col-span-1">
                        Legacy
                      </Button>
                      <Button variant="outline" className="col-span-1">
                        EIP1559
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none flex gap-1 align-middle">
                        Use signatures
                        <Button
                          variant="ghost"
                          className="w-5 h-5 rounded-full p-0"
                        >
                          <Icons.tooltip className="h-3 w-3 text-muted-foreground" />
                          <span className="sr-only">Help</span>
                        </Button>
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="use-signatures" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-2">
              <div className="flex gap-2 flex-col">
                <Input type="text" placeholder="0.0" />
                <Button variant="outline" size="sm">
                  <Icons.swap />
                </Button>
                <Input type="text" placeholder="0.0" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Preview</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          value="Pedro Duarte"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value="@peduarte"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardContent>
            <CardDescription className="mt-2">
              <DynamicChart />
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
