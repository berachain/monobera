import { useTheme } from "next-themes";

type ISemiCircleProgress = {
	strokeWidth: number;
	strokeLinecap?: "butt" | "round" | "square" | "inherit";

	percentage: number;
	percentageSeperator?: string;
	size: {
		width: number;
		height: number;
	};
	strokeColor?: string;
	fontStyle?: {
		fontSize: string;
		fontFamily?: string;
		fontWeight: string;
		fill: string;
	};
	hasBackground?: boolean;
	bgStrokeColor?: string;
	label: string;
};

const SemiCircleProgress = ({
	strokeWidth,
	percentage,
	strokeColor,
	size,
	strokeLinecap,
	percentageSeperator,
	hasBackground = false,
	bgStrokeColor,
	label,
}: ISemiCircleProgress) => {
	if (percentage < 0 || percentage > 100) {
		throw new Error("Percentage must be between 0 and 100");
	}

	if (Number.isNaN(strokeWidth) || strokeWidth <= 0) {
		throw new Error("Stroke width must be a positive number");
	}

	if (
		Number.isNaN(size.width) ||
		size.width <= 0 ||
		Number.isNaN(size.height) ||
		size.height <= 0
	) {
		throw new Error("Size must be a positive number");
	}

	const radius = 50 - strokeWidth / 2;
	const circumference = 1.1 * Math.PI * radius;
	const strokeDashoffset = circumference - (percentage / 100) * circumference;
	const bgStrokeDashoffset = circumference - 1 * circumference;
	const pathDescription = "M5,64 a1,1 0 0,1 90,0";

	const { theme, systemTheme } = useTheme();
	const dark = (theme === "system" ? systemTheme : theme) === "dark";
	return (
		<>
			<svg
				width={size.width}
				height={size.height}
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="_half-circular-progress"
			>
				{hasBackground && (
					<path
						cx="45"
						cy="45"
						r="32"
						d={pathDescription}
						style={{
							transition: "stroke-dashoffset 0.35s",
							stroke: bgStrokeColor || "#d3d3d3",
							strokeLinecap: strokeLinecap,
							strokeDasharray: `${circumference}`,
							strokeDashoffset: `${bgStrokeDashoffset}`,
							strokeWidth: `${strokeWidth}`,
						}}
						fill="none"
					/>
				)}
				<path
					cx="45"
					cy="45"
					r="32"
					d={pathDescription}
					style={{
						transition: "stroke-dashoffset 0.35s",
						stroke: strokeColor || "#04001b",
						strokeLinecap: strokeLinecap,
						strokeDasharray: `${circumference}`,
						strokeDashoffset: `${strokeDashoffset}`,
						strokeWidth: `${strokeWidth}`,
					}}
					fill="none"
				/>
				<animate
					attributeName="stroke-dashoffset"
					from="283"
					to="0"
					dur="1s"
					fill="freeze"
				/>

				<text
					x="52%"
					y="60%"
					dominantBaseline="middle"
					textAnchor="middle"
					fontFamily="Arial"
					fill={dark ? "#eae8e6" : "#292524"}
					style={{
						fontStyle: "normal",
						fontWeight: "600",
						lineHeight: "20px",
						fontSize: "12px",
					}}
				>
					{percentage.toFixed(2)}
					{percentageSeperator || "%"}
				</text>
				<text
					x="52%"
					y="80%"
					dominantBaseline="middle"
					textAnchor="middle"
					fill="hsl(var(--muted-foreground) / var(--tw-text-opacity))"
					style={{
						fontSize: "8px",
						fontStyle: "normal",
						fontWeight: "600",
						lineHeight: "20px",
					}}
				>
					{label}
				</text>
			</svg>
		</>
	);
};
export { SemiCircleProgress };
