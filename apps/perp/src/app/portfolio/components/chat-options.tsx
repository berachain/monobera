export const Options = {
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			display: false,
			border: {
				display: false,
			},
			grid: {
				display: false,
			},
		},
		y: {
			border: {
				display: false,
			},
			grid: {
				display: false,
			},
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
			text: "Bera Chart",
		},
		tooltip: {
			displayColors: false,
			position: "nearest",
			borderRadius: 18,
			caretSize: 0,
			interaction: {
				intersect: false,
			},
			callbacks: {
				label: (context: {
					dataset: { label: string };
					parsed: { y: number | bigint | null };
				}) => {
					let label = context.dataset.label || "";

					if (label) {
						label += ": ";
					}
					if (context.parsed.y !== null) {
						label += new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(context.parsed.y);
					}
					return label;
				},
			},
		},
	},
};

export const chartColor = {
	default: {
		light: "#E7E5E4",
		dark: "#373332",
	},
	hover: {
		light: "#57534E",
		dark: "#CFCCCC",
	},
};
