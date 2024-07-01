import React from "react";
import copy from "copy-to-clipboard";

interface CopyToClipboardProps {
  text: string;
  children: React.ReactElement;
  onCopy?: (text: string, result: boolean) => void;
  options?: {
    format?: string;
    message?: string;
    debug?: boolean;
  };
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
  const { text, children, onCopy, options } = props;

  const elem = React.Children.only(children);

  function onClick(e: MouseEvent) {
    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    // 触发原本的点击事件
    if (typeof elem.props.onClick === "function") {
      elem.props.onClick(e);
    }
  }

  return React.cloneElement(elem, {
    onClick: onClick,
  });
}
