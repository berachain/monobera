import dynamic from "next/dynamic";
import { Spinner } from "@bera/shared-ui";

const NonSSRWrapper = (props: any) => <>{props.children}</>;
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
  loading: () => (
    <div
      style={{ animation: "spin 3 1s linear", width: "18px", height: "18px" }}
    >
      <Spinner size={16} color="white" />
    </div>
  ),
});
