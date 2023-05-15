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
import dynamic from "next/dynamic";

export const runtime = "edge";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Swap() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <div>
        <Card>
          <CardHeader>My wallet</CardHeader>
          <CardContent>
            <CardDescription className="mt-2">
              <Button title="Connect your wallet" variant="link">
                Connect your wallet
              </Button>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex justify-between center">
              Swap
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
                      <h4 className="font-medium leading-none">
                        Slippage tolerance
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Set the dimensions for the layer.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          defaultValue="100%"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxWidth">Max. width</Label>
                        <Input
                          id="maxWidth"
                          defaultValue="300px"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          defaultValue="25px"
                          className="col-span-2 h-8"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="maxHeight">Max. height</Label>
                        <Input
                          id="maxHeight"
                          defaultValue="none"
                          className="col-span-2 h-8"
                        />
                      </div>
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
      <div>
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
