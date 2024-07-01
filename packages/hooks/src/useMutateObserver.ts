import { useEffect } from "react";

const defaultOptions: MutationObserverInit = {
  // 监听子节点属性+children
  subtree: true,
  // 监听 children
  childList: true,
  attributeFilter: ["style", "class"],
};

export default function useMutateObserver(
  nodeOrList: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    if (!nodeOrList) return;

    let instance: MutationObserver;

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

    if ("MutationObserver" in window) {
      instance = new MutationObserver(callback);

      nodeList.forEach((node) => {
        instance.observe(node, options);
      });

      return () => {
        // 删除所有剩余通知
        instance.takeRecords();
        // 停止接受新的通知
        instance.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeOrList, options]);
}
