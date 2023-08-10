interface IProgressBar {
  color: string;
  width: number; // 1 = 0.01  50 = 50%
}

interface ILabel {
  label: string;
  width: number;
}
interface IProgressBarProps {
  dataList: IProgressBar[];
  labelList: ILabel[];
}

export function ProgressBarChart({ dataList, labelList }: IProgressBarProps) {
  return (
    <div>
      <div className="relative h-[25px]">
        {labelList.map((data) => (
          <>
            <div
              key={(data.width, data.label)}
              className={`absolute top-0 text-xs font-medium capitalize leading-tight text-muted-foreground`}
              style={{
                left: `${data.width}%`,
                transform: `translateX(-50%)`,
              }}
            >
              {data.label}
            </div>
            <div
              className="border-l-1 absolute top-[14px] h-[8px] border border-muted-foreground"
              key={(data.width, data.label, "bar")}
              style={{ left: `${data.width}%` }}
            />
          </>
        ))}
      </div>
      <div className="relative">
        <div className="h-2 w-full rounded-full bg-secondary-foreground" />
        {dataList
          .sort((a, b) => b.width - a.width)
          .map((data) => (
            <div
              key={(data.width, data.color)}
              className={`absolute left-0 top-0 h-2 rounded-full`}
              style={{ width: `${data.width}%`, backgroundColor: data.color }}
            />
          ))}
      </div>
    </div>
  );
}
