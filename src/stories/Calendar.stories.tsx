import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "zhh-comp";
import dayjs from "dayjs";

const meta = {
  title: "React/日历组件",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Value: Story = {
  args: {
    value: dayjs("2023-11-08"),
  },
};

export const RenderCell: Story = {
  args: {
    value: dayjs("2023-11-08"),
    renderCell(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
};

export const RenderCellContent: Story = {
  args: {
    value: dayjs("2023-11-08"),
    renderCellContent(currentDate) {
      return <div style={{ background: "yellowgreen" }}>{currentDate.format("YYYY-MM-DD")}</div>;
    },
  },
};

export const Locale: Story = {
  args: {
    value: dayjs("2023-11-08"),
    locale: "en-US",
  },
};
