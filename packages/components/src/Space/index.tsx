import React, { Fragment, useContext } from "react";
import cs from "classnames";
import "./index.scss";
// import { ConfigContext, ConfigContextType } from "./ConfigProvider";
import { ConfigContext } from "../ConfigProvider";

export type SizeType = "small" | "medium" | "large" | number | undefined;

const spaceSize = {
  small: 8,
  medium: 16,
  large: 24,
};

function getSizeNumber(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size;
}

// React.HTMLAttributes<HTMLDivElement> 和 React.HTMLProps<HTMLDivElement> 都是React中用于定义与HTML元素相关的属性类型，但它们之间存在一些差异：
// React.HTMLAttributes<HTMLDivElement>: 这个类型只包含了HTML <div> 元素的标准属性，比如 id, class, style, onClick 等事件处理函数。它主要用于定义组件将接收哪些原生DOM属性。
// React.HTMLProps<HTMLDivElement>: 这个类型是更全面的一个类型，它不仅包含了React.HTMLAttributes<HTMLDivElement>的所有属性，还额外包含了ref属性以及其他可能由React特定功能引入的属性。使用React.HTMLProps可以让组件支持通过ref来直接访问DOM节点，这对于需要直接操作DOM或者使用某些库（如React Router的<Link>组件）的场景非常有用。
// 总结来说，如果你的组件只需要处理标准的HTML属性，使用React.HTMLAttributes<HTMLDivElement>就足够了。但如果你的组件还需要支持ref或React特定的其他属性，应该使用React.HTMLProps<HTMLDivElement>。在现代React和TypeScript项目中，直接使用React.FC<Props>, React.Component<Props, State>或函数组件的泛型通常已经足够处理包括ref在内的所有情况，因此直接使用React.HTMLAttributes更为常见。

// 使用React.HTMLAttributes<HTMLDivElement>可以让space组件接收到原生div元素的所有属性，包括className、style等。
// 即：可以将 Space 当做一个 div 元素使用，然后进行相关的拓展，实现 Space 功能
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  // 类名
  className?: string;
  // 样式
  style?: React.CSSProperties;
  // 尺寸：small、middle、large、number 传入一个作用于横竖，传入数组分别作用于横竖
  size?: SizeType | [SizeType, SizeType];
  // 方向
  direction?: "horizontal" | "vertical";
  // 对齐方式
  align?: "start" | "end" | "center" | "baseline";
  // 分割
  split?: React.ReactNode;
  // 是否换行，仅水平 horizontal 有效
  wrap?: boolean;
}

export default function Space(props: SpaceProps) {
  // 读取 context
  const { space } = useContext(ConfigContext);
  // console.log("space context!!!!!!!", space);

  const {
    style,
    className,
    direction,
    size = space?.size || "small",
    wrap,
    align,
    split,
    ...res
  } = props;

  // 给所有子节点包装一层div
  const childNodes = React.Children.toArray(props.children);

  const nodes = childNodes.map((child, index) => {
    // 如果 child上存在key属性，则使用key，否则使用index
    const isHasKey =
      typeof child === "object" && child !== null && "key" in child
        ? child.key
        : null;
    const key = isHasKey || `space-item-${index}`;
    return (
      <Fragment key={key}>
        <div className="space-item">{child}</div>
        {index < childNodes.length - 1 && split && <span>{split}</span>}
      </Fragment>
    );
  });

  // 处理样式
  const cns = cs(className, "space", {
    "space-horizontal": direction === "horizontal",
    "space-vertical": direction === "vertical",
    "space-wrap": wrap,
    "space-align-start": align === "start",
    "space-align-center": align === "center",
    "space-align-end": align === "end",
    "space-align-baseline": align === "baseline",
  });
  // todo：使用 usememo？
  // 根据 size 值，计算横竖方向的gap值
  const otherStyles: React.CSSProperties = {};

  function calcSize() {
    console.log("calc-size!");
    return (
      Array.isArray(size) ? size : ([size, size] as [SizeType, SizeType])
    ).map((item) => getSizeNumber(item));
  }

  const [hSize, vSize] = calcSize();
  console.log(hSize, vSize);
  otherStyles.columnGap = hSize;
  otherStyles.rowGap = vSize;

  return (
    <div className={cns} style={{ ...style, ...otherStyles }} {...res}>
      {nodes}
    </div>
  );
}

// // 封装 context 组件，已将 context 抽离为全局管理
// interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {}

// Space.ConfigProvider = (props: ConfigProviderProps) => {
//   const { space, children } = props;
//   return (
//     <ConfigContext.Provider value={{ space }}>
//       {children}
//     </ConfigContext.Provider>
//   );
// };
