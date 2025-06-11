import React, { PropsWithChildren } from "react";
import cs from "classnames";
import "./index.scss";

interface CustomIconComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  test: string;
}

type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
  component?: React.ComponentType<CustomIconComponentProps>;
};

const svgBaseProps = {
  fill: "currentColor",
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em",
  focusable: "false",
  "aria-hidden": "true",
};

// React.SVGProps<SVGSVGElement>是React SVG元素的属性类型，通过Omit去除与BaseIconProps相同的属性
export type IconProps = BaseIconProps & Omit<React.SVGProps<SVGSVGElement>, keyof BaseIconProps>;

// 处理 size 得到 icon 的宽高
function getWidthAndHeight(size: string | string[]) {
  if (Array.isArray(size) && size.length === 2) {
    return {
      width: size[0],
      height: size[1],
    };
  }
  return {
    width: (size as string) || "1em",
    height: (size as string) || "1em",
  };
}

// 使用 forwardRef 将内部的 svg ref 转发出去
// React.forwardRef的第一个泛型参数 SVGSVGElement 指定了转发的 ref 类型
// 第二个泛型参数 PropsWithChildren<IconProps> 定义了组件接受的props类型
// PropsWithChildren<T> 是用来自动添加 children prop 到T类型的快捷方式
// 表明该组件除了 IconProps 中定义的属性外，还可以接受 children prop
const Icon = React.forwardRef<SVGSVGElement, PropsWithChildren<IconProps>>((props, ref) => {
  const { className, style, size = "1em", spin, children, component: Component, ...rest } = props;

  const cns = cs("icon", className, { "icon-spin": spin });

  const { width, height } = getWidthAndHeight(size);

  // compoent/children
  const renderContent = () => {
    const innerSvgProps = {
      ...svgBaseProps,
      test: "test",
    };
    if (Component) {
      return <Component {...innerSvgProps}>{children}</Component>;
    }
    if (children) {
      return (
        // currentColor 是 CSS 变量，用于在 SVG 元素中引用当前主题的颜色
        <svg ref={ref} width={width} height={height} fill="currentColor" {...rest}>
          {children}
        </svg>
      );
    }
  };

  return (
    <span className={cns} style={style}>
      {renderContent()}
    </span>
  );
});

export default Icon;
