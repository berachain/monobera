import { Watermark } from "@hirohe/react-watermark";
import { useSession } from "next-auth/react";

const ContentWithWatermark = ({ children }: any) => {
  const { data: session } = useSession();

  // @ts-ignore
  const user = session?.token["cognito:username"]
    // @ts-ignore
    ? session?.token["cognito:username"]
    : "";
  return (
    <Watermark text={user}>
      <div style={{ width: "100vw", height: "100%" }}>{children}</div>
    </Watermark>
  );
};

export default ContentWithWatermark;
