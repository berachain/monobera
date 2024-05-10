export const Info = () => {
  const data = [
    { title: "Expected total amount", value: "~$6938.0669" },
    { title: "Pool tokens", value: "1436.728798 PT" },
    { title: "Percentage of pool", value: "0.000069%" },
  ];
  return (
    <div className="border-boder flex flex-col gap-2 rounded-md border bg-muted px-4 py-3">
      {data.map((d, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="text-xs leading-5 text-muted-foreground">
            {d.title}
          </div>
          <div className="front-medium text-xs leading-5">{d.value}</div>
        </div>
      ))}
    </div>
  );
};
