import { BeraChart } from "@bera/ui/bera-chart";

export default function DonutChart({
  percentage,
  color = "rgba(5, 150, 105, 1)",
}: {
  percentage: number;
  color?: string;
}) {
  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "rgba(120, 113, 108, 1)"],
        borderColor: [color, "rgba(120, 113, 108, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const Options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: 33,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative h-[90px] w-[90px]">
      <div className="absolute top-[38px] w-full text-center text-xs font-medium leading-tight">
        {percentage}%
      </div>
      <BeraChart data={data} type="doughnut" options={Options as any} />
    </div>
  );
}
