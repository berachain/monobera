import { Details } from "./components/Details";
import { bgtDetails } from "./constants";

export default function Dashboard() {
  return (
    <div className="container">
      <Details details={bgtDetails} />
    </div>
  );
}
