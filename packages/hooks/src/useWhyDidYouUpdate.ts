import React, { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IProps = Record<string, any>; /**
 * 自定义React钩子，用于监测组件属性的变化。
 * 当组件的某些属性发生改变时，此钩子会记录并打印出这些属性的改变详情。
 * 主要用于开发阶段识别不必要的重渲染，以优化性能。
 *
 * @param componentName 组件名称，用于在打印信息时标识哪个组件发生了变化。
 * @param props 组件的属性对象，用于比较前后属性的变化。
 */
export default function useWhyDidYouUpdate(
  componentName: string,
  props: IProps
) {
  // 使用 useRef 来存储上一次的属性值，以便于本次渲染时进行比较。
  const previousProps = React.useRef<IProps>({});

  // 使用 useEffect 来在组件渲染后执行属性变化的检查，但仅在组件挂载时执行一次。
  useEffect(() => {
    // 如果之前已经有属性值，则进行属性变化的检查。
    if (previousProps.current) {
      // 合并当前属性和之前的属性，以确保检查所有属性的变化。
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // 用于存储属性变化的对象。
      const changesObj: IProps = {};

      // 遍历所有属性，比较当前值和之前的值，如果不同，则记录变化。
      allKeys.forEach((key) => {
        if (!Object.is(previousProps.current[key], props[key])) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // 如果有属性发生变化，则打印变化详情。
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", componentName, changesObj);
      }
    }

    // 更新之前的属性值为当前属性值，以备下一次渲染时比较。
    previousProps.current = props;
  }, []); // 确保只在组件挂载时执行一次。
}
