import { Details } from "./components";
import { bgtDetails } from "./constants";

export default function Dashboard() {
  return (
    <div className="container">
      <Details details={bgtDetails} />
    </div>
  );
}
