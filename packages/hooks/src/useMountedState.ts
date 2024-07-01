import { useCallback, useEffect, useRef } from "react";

export default function useMountedState() {
  // 使用 useRef 而不是 useState 保存 mount 的值是因为修改 ref.current 并不会引起组件重新渲染
  const mountedRef = useRef(false);

  // 用 useCallback 包裹，这样用它作为其它 memo 组件参数的时候，就不会导致额外的渲染
  //   const isMounted = () => mountedRef.current;
  const isMounted = useCallback(() => mountedRef.current, []);

  // useEffect 是在 dom 操作之后异步执行的，所以这时候就已经 mount 了
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return isMounted;
}
