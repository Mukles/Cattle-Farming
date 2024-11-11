import { Home } from "lucide-react";
import InfoCard from "./_components/info-card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <InfoCard
        title={"Balance"}
        amount={"399k"}
        ratings={"5"}
        varients={"destructive"}
        icon={<Home className="size-5" />}
      />
      <InfoCard
        title={"Coast"}
        amount={"399k"}
        ratings={"5"}
        varients={"destructive"}
        icon={<Home className="size-5" />}
      />
      <InfoCard
        title={"Total Earnings"}
        amount={"399k"}
        ratings={"5"}
        varients={"destructive"}
        icon={<Home className="size-5" />}
      />
    </div>
  );
}
