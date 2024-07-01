import { useEffect } from "react";

export default function useLifeCycles(mount: () => void, unmount: () => void) {
  useEffect(() => {
    // useEffect 里调用 mount，这时候 dom 操作完了，组件已经 mount
    if (mount) {
      mount();
    }
    // 返回的清理函数里调用 unmount，在组件从 dom 卸载时调用
    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []);
  return;
}
