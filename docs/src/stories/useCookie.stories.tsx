import type { StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useCookie } from "zhh-hooks";

const meta = {
  title: "Hooks/useCookie",
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
    const [cookie, updateCookie, deleteCookie] = useCookie("hanhui");

    useEffect(() => {
      deleteCookie();
    }, []);

    const updateCookieHandler = () => {
      updateCookie("666");
    };
    return (
      <div>
        <p>cookie 值: {cookie}</p>
        <button onClick={updateCookieHandler}>更新 Cookie</button>
        <br />
        <button onClick={deleteCookie}>删除 Cookie</button>
      </div>
    );
  },
};
