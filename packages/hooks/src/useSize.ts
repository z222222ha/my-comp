import { useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};
export default function useSize(
  targetRef: React.RefObject<HTMLElement>
): Size | undefined {
  const [size, setSize] = useState<Size | undefined>(() => {
    const el = targetRef.current;
    return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
  });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { clientWidth, clientHeight } = entry.target;
        setSize({ width: clientWidth, height: clientHeight });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return size;
}
