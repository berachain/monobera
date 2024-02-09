import { MoonLoader } from "react-spinners";

export const Spinner = ({
  size,
  color,
  ...props
}: { size?: number; color?: string }) => {
  return <MoonLoader size={size} color={color} {...props} />;
};
