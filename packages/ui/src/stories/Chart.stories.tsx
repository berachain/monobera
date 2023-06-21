import type { Meta, StoryObj } from "@storybook/react";
import faker from "faker";

import { BeraChart } from "~/bar-chart";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "BeraUI/Chart",
  component: BeraChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BeraChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export const Bar: Story = {
  args: {
    data,
    type: "bar",
  },
  render: (args) => <BeraChart {...args} />,
};
