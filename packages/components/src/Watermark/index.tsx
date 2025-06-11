import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import useWatermark from "./useWatermark";

// 当传入的内容是文字时，用 canvas 画出，做一些旋转，并导出 base64 图片，作为 background
// mutationObserver 监听dom修改后重新添加水印
// 也可以直接传入图片作为水印
// canvas 会根据传入的参数来画：宽、高、旋转角度、字体样式、水印间距、水印偏移
export interface WatermarkProps {
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  gap?: [number, number];
  offset?: [number, number];
  content?: string | string[];
  image?: string;
  font?: {
    fontSize?: number | string;
    fontFamily?: string;
    fontWeight?: number | string;
    color?: string;
  };
  getContainer?: () => HTMLElement;
}

export default function Watermark(props: PropsWithChildren<WatermarkProps>) {
  const { className, style } = props;

  const ctRef = useRef(null);

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : ctRef.current;
  }, [ctRef.current, props.getContainer]);

  const { generateWatermark } = useWatermark({ ...props, getContainer });

  useEffect(() => {
    generateWatermark({ ...props, getContainer });
  }, []);
  return (
    <div className={className} style={style} ref={ctRef}>
      {props.children}
    </div>
  );
}
