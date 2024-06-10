"use client";

import { Dialog, DialogContent } from "@bera/ui/dialog";

export const AccessDenyModal = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        hideClose
        className="focus:outline-none md:w-[calc(100vw-32px)] lg:w-[800px] lg:min-w-[800px]"
      >
        <div className="flex flex-col gap-8">
          <div className="leading-12 text-center text-5xl font-bold">
            Access Denied
          </div>
          <div className="leading-6">
            We’re sorry, but due to geographical restrictions, our services are
            not available in your current location. This is due to regulatory
            and compliance reasons and includes residents and citizens of the
            restricted country.
          </div>
          <div className="text-sm leading-6">
            Please be advised that any attempts to bypass these restrictions,
            including but not limited to the use of VPNs, proxy services, or
            other circumvention techniques, are strictly prohibited.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const AccessDeny = () => {
  return <AccessDenyModal open={true} />;
};
