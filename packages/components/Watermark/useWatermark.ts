import { useEffect, useRef, useState } from "react";
import { WatermarkProps } from ".";
import { merge } from "lodash-es";

export type DrawOptions = Omit<
  WatermarkProps,
  "children" | "className" | "style"
>;

/**
 * 判断一个值是否为数字。
 *
 * 使用Object.prototype.toString方法获取值的类型，然后与"[object Number]"进行比较，
 * 以确定该值是否为数字类型。这种方式比直接使用typeof操作符更准确，因为typeof会将NaN也视为"number"类型。
 * 判断NaN，这个也是 number，但不等于自身
 *
 * @param value 任意类型的值，需要判断是否为数字。
 * @returns 如果value是数字类型，则返回true；否则返回false。
 */
function isNumber(value: any): value is number {
  return (
    Object.prototype.toString.call(value) === "[object Number]" &&
    value === value
  );
}

/**
 * 将给定的值转换为数字类型。
 * 如果无法转换，则返回默认值。
 *
 * @param value - 需要转换的值，可以是字符串或数字类型。
 * @param defaultValue - 当无法将`value`转换为数字时，返回的默认值。
 * @returns 转换后的数字或默认值。
 */
function toNumber(value?: string | number, defaultValue?: number) {
  // 如果value已经是数字类型，则直接返回该值
  if (isNumber(value)) {
    return value;
  }
  // 如果value未定义，则返回默认值
  if (value === undefined) return defaultValue;
  // 尝试将value转换为浮点数
  const numberValue = parseFloat(value);
  // 如果转换后的值是有效的数字，则返回该值，否则返回默认值
  return isNumber(numberValue) ? numberValue : defaultValue;
}

const defaultOptions: DrawOptions = {
  rotate: -20,
  gap: [100, 100],
  font: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.15)",
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
};

function getMergedOptions(o: Partial<DrawOptions>) {
  const ops = o || {};

  const mergedOps = {
    ...ops,
    rotate: ops.rotate || defaultOptions.rotate,
    font: { ...defaultOptions.font, ...ops.font },
    // 如果是图片就用默认 width，否则 undefined，因为后面文字宽度是动态算的
    width: toNumber(ops.width, defaultOptions.width),
    height: toNumber(ops.height, defaultOptions.height),
    gap: [
      toNumber(ops.gap?.[0], defaultOptions.gap?.[0]),
      toNumber(ops.gap?.[1], defaultOptions.gap?.[1]),
    ],
    getContainer: ops.getContainer,
  };

  const mergedOffsetX = toNumber(mergedOps.offset?.[0], 0)!;
  const mergedOffsetY = toNumber(mergedOps.offset?.[1], 0)!;
  mergedOps.offset = [mergedOffsetX, mergedOffsetY];

  return mergedOps;
}

function measureTextSize(
  ctx: CanvasRenderingContext2D,
  text: string[],
  rotate: number
) {
  let width = 0;
  let height = 0;
  const lineSize: Array<{ width: number; height: number }> = [];

  text.forEach((item) => {
    const {
      width: textWidth,
      fontBoundingBoxAscent,
      fontBoundingBoxDescent,
    } = ctx.measureText(item);

    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;

    if (textWidth > width) {
      width = textWidth;
    }

    height += textHeight;
    lineSize.push({ height: textHeight, width: textWidth });
  });

  const angle = (rotate * Math.PI) / 180;

  return {
    originWidth: width,
    originHeight: height,
    lineSize,
    width: Math.ceil(
      Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)
    ),
    height: Math.ceil(
      Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))
    ),
  };
}

function getCanvasData(ops: Required<DrawOptions>) {
  console.log(ops);
  const { rotate, image, content, font, gap } = ops;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const ratio = window.devicePixelRatio || 1;

  const configCanvas = (width: number, height: number) => {
    console.log(width, height);
    const canvasWidth = gap[0] + width;
    const canvasHeight = gap[1] + height;
    console.log(canvasWidth, canvasHeight);
    canvas.setAttribute("width", `${canvasWidth * ratio}px`);
    canvas.setAttribute("height", `${canvasHeight * ratio}px`);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  const drawText = () => {
    const { color, fontSize, fontFamily, fontWeight } = font;
    const realFontSize = toNumber(fontSize, 0);

    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    const measureSize = measureTextSize(ctx, [...content], rotate);

    console.log(measureSize, ops, realFontSize);

    const width = ops.width || measureSize.width;
    const height = ops.height || measureSize.height;

    configCanvas(width, height);

    ctx.fillStyle = color!;
    ctx.font = `${fontWeight} ${realFontSize}px ${fontFamily}`;
    ctx.textBaseline = "top";

    [...content].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } =
        measureSize.lineSize[index];

      const xStartPoint = -lineWidth / 2;
      const yStartPoint = -measureSize.originHeight / 2 + lineHeight * index;
      console.log(xStartPoint, yStartPoint);
      ctx.fillText(item, xStartPoint, yStartPoint);
      // ctx.fillText("Hello world", width / 2, height / 2);
    });

    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  };

  const drawImage = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";

      img.src = image;
      img.onload = () => {};

      img.onerror = () => {};
    });
  };

  return image ? drawImage() : drawText();
}

export default function useWatermark(ops: DrawOptions) {
  // console.log(ops);
  const [options, setOptions] = useState(ops || {});

  const mergedOptions = getMergedOptions(options);
  console.log(mergedOptions.getContainer());
  const watermarkDiv = useRef<HTMLDivElement>();
  const container = mergedOptions.getContainer();

  function drawWatermark() {
    if (!container) {
      return;
    }
    getCanvasData(mergedOptions).then((res) => {
      console.log(res);
      const { base64Url } = res;

      const wmStyle = `
      width: 100%;
      height: 300px;
      background-image:url(${base64Url});
      background-repeat: repeat;
      position:absolute;
      top:0;
      left:0;
      `;

      if (!watermarkDiv.current) {
        const div = document.createElement("div");
        watermarkDiv.current = div;
        container.append(div);
        container.style.position = "relative";
      }
      watermarkDiv.current.setAttribute("style", wmStyle);
    });
  }

  useEffect(() => {
    drawWatermark();
  }, [options]);

  return {
    generateWatermark: (newOptions: Partial<DrawOptions>) => {
      setOptions(merge({}, options, newOptions));
    },
    destroy: () => {},
  };
}
