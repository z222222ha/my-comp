import type { StoryObj } from "@storybook/react";
import { useCountDown } from "zhh-comp";
import dayjs from "dayjs";

const meta = {
  title: "Hooks/useCountDown",
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
    const [, formatRes] = useCountDown({
      //   targetTime: `${new Date().getFullYear()}-12-31 23:59:59`,
      targetTime: `${dayjs().format("YYYY-MM-DD")} 17:00:00`,
    });
    const { days, hours, minutes, seconds } = formatRes;

    return (
      <div>
        <span>距离下班还剩：</span>
        {days > 0 && <span>{days}天</span>}
        <span>{hours}时</span>
        <span>{minutes}分</span>
        <span>{seconds}秒</span>
      </div>
    );
  },
};
