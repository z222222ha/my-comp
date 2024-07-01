import React from "react";

export interface WatermarkProps {
  style?: React.CSSProperties;
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
  gap?: [number, number];
  offset?: [number, number];
}

export default function Watermark() {
  return <div>Watermark</div>;
}
