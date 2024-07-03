import type { Meta, StoryObj } from "@storybook/react";
import { Watermark } from "zhh-components";

const meta = {
  title: "React-components/Watermark",
  component: Watermark,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Watermark>;

export default meta;

type Story = StoryObj<typeof meta>;

const TestChildren = (
  <div>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
      deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
      recusandae minus, eaque, harum exercitationem esse sapiente? Eveniet, id
      provident!
    </p>
  </div>
);

export const Content: Story = {
  args: {
    content: ["测试水印", "但求其是爱"],
    children: TestChildren,
  },
};

export const Gap: Story = {
  args: {
    content: ["测试水印", "但求其是爱"],
    gap: [0, 0],
    children: TestChildren,
  },
};

export const Font: Story = {
  args: {
    content: ["测试水印", "但求其是爱"],
    children: TestChildren,
    gap: [0, 0],
    font: { color: "red", fontSize: 20, fontWeight: 700 },
  },
};
