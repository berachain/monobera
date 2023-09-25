export function GeneralInfoBanner() {
  const data = [
    {
      title: "24h Change",
      amount: "+0.77%",
    },
    {
      title: "24h Volume",
      amount: "$1.64M",
    },
    {
      title: "Mark Price",
      amount: "25,312.69",
    },
    {
      title: "Index Price",
      amount: "25,314.42",
    },
    {
      title: "Open Interest (L)",
      amount: "$445.3K / ∞",
    },
    {
      title: "Open Interest (S)",
      amount: "$445.3K / ∞",
    },
    {
      title: "Funding Rate",
      amount: "0.0060%",
    },
  ];
  return (
    <div className="flex h-[65px] w-full items-center justify-between border-b border-border px-4">
      <div className="flex items-center text-muted-foreground">
        <div className="mr-4">
          <div className="text-xl font-semibold leading-7 text-muted-foreground">
            25,316.12
          </div>
          <div className="text-xs text-success-foreground">+326.69</div>
        </div>
        {data.map((item, index) => (
          <div
            className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-[10px] xl:block"
            key={index}
          >
            {item.title}
            <div className="text-success-foreground">{item.amount}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-shrink-0 text-[10px] text-muted-foreground">
        <div className="flex h-8 cursor-pointer items-center border-r border-border p-3 hover:underline">
          Market Details
        </div>
        <div className="flex h-8 cursor-pointer items-center p-3 hover:underline">
          Berpetuals Tutorial
        </div>
      </div>
    </div>
  );
}
