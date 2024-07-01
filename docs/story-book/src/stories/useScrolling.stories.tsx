import type { StoryObj } from "@storybook/react";
import { useRef } from "react";
import { useScrolling } from "zhh-hooks";

const meta = {
  title: "Hooks/useScrolling",
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrolling = useScrolling(scrollRef);
    return (
      <>
        <div>{scrolling ? "滚动中.." : "没有滚动"}</div>
        <div ref={scrollRef} style={{ height: "200px", overflow: "auto" }}>
          {new Array(100).fill(0).map((_, index) => (
            <div key={index}>Element-{index}</div>
          ))}
        </div>
      </>
    );
  },
};
