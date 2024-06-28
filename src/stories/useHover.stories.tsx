import type { StoryObj } from "@storybook/react";
import { useHover } from "zhh-comp";

const meta = {
  title: "Hooks/useHover",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
  render: () => {
    const element = (hovered: boolean) => (
      <span>Hover me! {hovered && "Thanks! "}</span>
    );

    const [hoverable, hovered] = useHover(element);
    return (
      <>
        {hoverable}
        <span>{hovered ? "HOVERED!" : ""}</span>
      </>
    );
  },
};
