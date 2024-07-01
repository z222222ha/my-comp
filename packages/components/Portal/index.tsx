import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  // 传入的节点
  children: React.ReactNode;
  // 插入的节点
  attach?: HTMLElement;
}

function getAttach(attach?: PortalProps["attach"]) {
  if (typeof attach === "string") return document.querySelector(attach);
  if (typeof attach === "object" && attach instanceof HTMLElement)
    return attach;
  return document.body;
}

const Portal = forwardRef((props: PortalProps, ref) => {
  const { children, attach = document.body } = props;

  // 在 attach 元素下添加一个 div 作为容器
  // 使用 useMemo 避免每次渲染都创建一个新的 div
  // 依赖项为空数组，表示只会在组件挂载时执行一次
  // 之后的渲染中，除非组件被卸载后重新挂载，否则useMemo会复用首次计算并记忆化的结果
  const container = useMemo(() => {
    const el = document.createElement("div");
    el.className = "portal-container";
    return el;
  }, []);

  // 插入
  useEffect(() => {
    const attachEl = getAttach(attach);
    attachEl?.appendChild(container);

    return () => {
      attachEl?.removeChild(container);
    };
  }, [attach, container]);

  // ref
  useImperativeHandle(ref, () => container);
  // 为啥需要使用 useImperativeHandle
  // forwardRef 只能在组建内部显式声明 ref
  // 而 Portal 中的 container 是手动创建的，无法通过 forwardRef 直接进行 ref 的绑定
  // 所以需要使用 useImperativeHandle 再进行一层转发

  return createPortal(children, container);
});

export default Portal;
