import dynamic from "next/dynamic";

const NonSSRWrapper = (props: any) => <>{props.children}</>;
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
});
