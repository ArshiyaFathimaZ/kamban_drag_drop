import type { Meta, StoryObj } from "@storybook/react";
import {Button} from "./Button";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Primary Button",
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
  },
};

export const Large: Story = {
  args: {
    label: "Large Button",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    label: "Small Button",
    size: "small",
  },
};
