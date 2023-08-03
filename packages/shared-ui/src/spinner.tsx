import { MoonLoader } from "react-spinners";

export const Spinner = ({ size, color }: { size: number; color: string }) => {
  return <MoonLoader size={size} color={color} />;
};
