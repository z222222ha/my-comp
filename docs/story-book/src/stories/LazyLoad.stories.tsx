import type { Meta, StoryObj } from "@storybook/react";
import { LazyLoad } from "zhh-components";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";

const meta = {
  title: "React-components/LazyLoad",
  component: LazyLoad,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LazyLoad>;

export default meta;

type Story = StoryObj<typeof meta>;

const TestChildren = new Array(20)
  .fill(0)
  .map((_item, index) => <p key={index}>xxxxxx</p>);

export const WithoutLazyLoad: Story = {
  render: () => {
    return (
      <>
        <div>{TestChildren}</div>
        <img src={img1} alt="" />
      </>
    );
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: <div>loading</div>,
  },
  render: () => {
    return (
      <>
        <div>{TestChildren}</div>
        <LazyLoad placeholder={<div>loading</div>}>
          <img src={img1} />
        </LazyLoad>
      </>
    );
  },
};

export const OnContentVisible: Story = {
  args: {},
  render: () => {
    return (
      <>
        <div>{TestChildren}</div>
        <LazyLoad
          placeholder={<div>loading</div>}
          onContentVisible={() => {
            console.log("img visible");
          }}
        >
          <img src={img2} />
        </LazyLoad>
      </>
    );
  },
};
