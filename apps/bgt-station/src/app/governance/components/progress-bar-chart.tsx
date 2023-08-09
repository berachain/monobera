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
    <div className="block h-5 w-10 rounded-full border border-border bg-warning">
      <p className="text-red-600">hello??</p>
    </div>
  );
}
