import React, { cloneElement, useState } from "react";

type Element = React.ReactElement | ((state: boolean) => React.ReactElement);
export default function useHover(element: Element) {
  console.log(element);

  const [isHover, setIsHover] = useState(false);

  if (typeof element === "function") {
    element = element(isHover);
  }

  // TODO:如果传入的 React Element 本身有 onMouseEnter、onMouseLeave 的事件处理函数，要先调用下
  const onMouseEnter = () => {
    console.log("mouseenter");
    setIsHover(true);
  };
  const onMouseLeave = () => {
    console.log("mouseleave");
    setIsHover(false);
  };

  const el = cloneElement(element, {
    onMouseEnter,
    onMouseLeave,
  });
  return [el, isHover];
}
