import React, { useEffect, useRef, useState } from "react";

interface LazyLoadProps {
  className?: string;
  style?: React.CSSProperties;
  placeholder?: React.ReactNode;
  offset?: number;
  children?: React.ReactNode;
  onContentVisible?: () => void;
}

export default function LazyLoad(props: LazyLoadProps) {
  const ctRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { className, style, children, placeholder, offset, onContentVisible } =
    props;

  const elmObserver = useRef<IntersectionObserver>();

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === "number" ? `${offset}px` : offset,
      threshold: 0.1,
    };

    elmObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onContentVisible?.();
          const node = ctRef.current!;
          elmObserver.current?.unobserve(node);
        }
      });
    }, options);

    const node = ctRef.current;

    if (node instanceof HTMLElement) {
      elmObserver.current.observe(node);
    }

    return () => {
      if (node && node instanceof HTMLElement) {
        elmObserver.current?.unobserve(node);
      }
    };
  }, []);

  return (
    <div ref={ctRef} className={className} style={style}>
      {visible ? children : placeholder}
    </div>
  );
}
