import React, { forwardRef } from "react";
import Icon, { IconProps } from "./Icon";

// viewBox接受四个参数，用空格分隔，格式为min-x min-y width height，其中：
// min-x和min-y定义了视图矩形在SVG坐标系中的左上角位置。
// width和height定义了视图矩形的宽度和高度。
// 当SVG的宽度和高度属性（width和height）改变时，通过设置合适的viewBox，SVG内容会自动缩放以适应新的尺寸，保持内容的比例不变。如果没有指定viewBox，SVG通常会以1:1的比例填充其指定的宽度和高度，可能导致变形或不符合预期的布局效果。

// 设置viewBox为0 0 1024 1024是一种常见的做法，这样的设置有以下几个原因：
// 适应性与缩放：选择1024x1024这样较大的尺寸能够确保在不同分辨率和屏幕尺寸的设备上，SVG图形有足够的细节和清晰度。当SVG被放大或缩小以适应不同的展示需求时，较大的viewBox可以帮助维持图形的质量。
// 易于计算：1024是一个2的十次幂，这对于编程和计算来说非常方便，因为它可以轻松地被2、4、8、16等数整除，便于实现图形的等比例缩放和布局设计。
// 标准化：在一些场景下，设计者可能遵循某种内部或行业标准，其中1024x1024是一个常用的尺寸，便于团队协作和资源的复用。
interface CreateIconProps {
  content: React.ReactNode;
  iconProps?: IconProps;
  viewBox?: string;
}

export default function createIcon(props: CreateIconProps) {
  const { content, iconProps = {}, viewBox = "0 0 1024 1024" } = props;
  return forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    return (
      <Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
        {content}
      </Icon>
    );
  });
}
