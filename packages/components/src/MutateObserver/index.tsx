import React, { cloneElement, useLayoutEffect, useRef, useState } from "react";
import { useMutateObserver } from "zhh-hooks";

interface MutateObserverProps {
  children: React.ReactElement;
  onMutate: (mutations: MutationRecord[], observer: MutationObserver) => void;
  options?: MutationObserverInit;
}

export default function MutateObserver(props: MutateObserverProps) {
  const { children, onMutate, options } = props;

  const elementRef = useRef<HTMLElement>(null);

  const [target, setTarget] = useState<HTMLElement>();

  useMutateObserver(target!, onMutate, options);

  // 和useEffect一样，useLayoutEffect会在组件挂载后和每次更新后执行
  // 与异步执行的useEffect不同，它是同步的，会阻塞浏览器渲染过程，直到回调完成
  // 由于执行时机在渲染流程中，可以在页面布局最终确定前进行必要的调整，比如测量尺寸、调整样式以避免闪烁或重排
  useLayoutEffect(() => {
    setTarget(elementRef.current!);
  }, []);

  if (!children) return null;

  // React.cloneElement是React中的一个方法，用于创建一个React元素的浅拷贝
  // 动态传递属性：允许父组件在不修改子组件源码的情况下，向子组件传递额外的属性。
  // 重用组件：通过添加或修改特定属性，可以灵活地重用已有组件，以适应不同的场景。
  // 扩展功能：例如，为子组件添加事件处理器、样式类名等，而不需要子组件预先知道这些属性
  return cloneElement(children, { ref: elementRef });
}
