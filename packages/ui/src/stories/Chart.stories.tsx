import type { Meta, StoryObj } from "@storybook/react";
import { type ChartData, type ChartOptions } from "chart.js";
import faker from "faker";

import { BeraChart } from "~/bera-chart";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "BeraUI/Chart",
  component: BeraChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BeraChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const barLineLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

const barLineData: ChartData = {
  labels: barLineLabels,
  datasets: [
    {
      label: "Dataset 1",
      data: barLineLabels.map(() =>
        faker.datatype.number({ min: 0, max: 1000 }),
      ),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgb(255, 99, 132)",
    },
  ],
};

const pieDonutData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bera Chart",
    },
  },
};

export const Bar: Story = {
  args: {
    data: barLineData,
    options: Options,
    type: "bar",
  },
  render: (args) => <BeraChart {...args} />,
};

export const Line: Story = {
  args: {
    data: barLineData,
    options: Options,
    type: "line",
  },
  render: (args) => <BeraChart {...args} />,
};

export const Pie: Story = {
  args: {
    data: pieDonutData,
    options: Options,
    type: "pie",
  },
  render: (args) => <BeraChart {...args} />,
};

export const Donut: Story = {
  args: {
    data: pieDonutData,
    options: Options,
    type: "doughnut",
  },
  render: (args) => <BeraChart {...args} />,
};
