import { type Metadata } from "next";
import { Footer } from "@bera/shared-ui";

export const metadata: Metadata = {
  title: "Ambassador",
  description: `Welcome!`,
};

export default function Page() {
  return (
    <>
      <div className="container max-w-1280 pb-16">
        Test Ambassador Page for Coin
      </div>
      <Footer />
    </>
  );
}
