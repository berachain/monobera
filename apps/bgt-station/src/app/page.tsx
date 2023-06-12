import { type Metadata } from "next";

import MyBGT from "./MyBGT";

export const metadata: Metadata = {
  title: "MyBGT | Berachain",
  description: "BGT Station",
};

export default function Home() {
  return <MyBGT />;
}
