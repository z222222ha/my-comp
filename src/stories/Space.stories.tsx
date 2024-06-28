import type { Meta, StoryObj } from "@storybook/react";
import { Space } from "zhh-comp";
import { Button } from "./Button";

const meta = {
  title: "React/Space",
  component: Space,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Space>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Children: Story = {
  args: {
    children: new Array(10).fill(null).map((_, index) => <Button key={index} label={`Button ${index}`} />),
  },
};

export const Direction: Story = {
  args: {
    direction: "vertical",
    children: new Array(10).fill(null).map((_, index) => <Button key={index} label={`Button ${index}`} />),
  },
};

export const Align: Story = {
  args: {
    align: "center",
    children: new Array(7).fill(null).map((_, index) => {
      if (index === 0) return <span>Baseline</span>;
      if (index === 1) return <Button key={index} label={`Button ${index}`} size="small" />;
      if (index === 2) return <Button key={index} label={`Button ${index}`} size="large" />;
      return <Button key={index} label={`Button ${index}`} />;
    }),
    style: {
      padding: "4px",
      border: "1px solid #40a9ff",
      height: "100px",
    },
  },
};

export const Wrap: Story = {
  args: {
    children: new Array(10).fill(null).map((_, index) => <Button key={index} label={`Button ${index}`} />),
    style: {
      width: "500px",
    },
    wrap: true,
  },
};

export const Split: Story = {
  args: {
    children: new Array(3).fill(null).map((_, index) => <Button key={index} label={`Button ${index}`} />),
    split: <div style={{ height: "100%", width: "2px", background: "red" }}></div>,
  },
};

export const Size: Story = {
  args: {
    children: new Array(10).fill(null).map((_, index) => <Button key={index} label={`Button ${index}`} />),
    style: {
      width: "500px",
    },
    wrap: true,
    size: ["large", 10],
  },
};
