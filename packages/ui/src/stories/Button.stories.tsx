import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "~/button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "BeraUI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
  },
  render: () => <Button>Button</Button>,
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Secondary: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Link: Story = {
  args: {
    variant: "link",
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Large: Story = {
  args: {
    size: "lg",
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Small: Story = {
  args: {
    size: "sm",
  },
  render: (args) => <Button {...args}>Button</Button>,
};
