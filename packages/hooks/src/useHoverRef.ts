import React, { useEffect, useState } from "react";

interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHover: boolean) => void;
}
export default function useHoverRef(
  ref: React.RefObject<HTMLElement>,
  options?: Options
) {
  const [isEnter, setIsEnter] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", () => {
      setIsEnter(true);
      options?.onEnter?.();
      options?.onChange?.(true);
    });

    ref.current?.addEventListener("mouseleave", () => {
      setIsEnter(false);
      options?.onLeave?.();
      options?.onChange?.(false);
    });
  }, [ref]);
  return isEnter;
}
