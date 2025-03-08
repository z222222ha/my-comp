import { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import cs from "classnames";

export interface MessageProps {
  type: "error" | "warn"; // 消息类型，可以是"error"或"warn"
  content: string; // 消息内容
}

// MessageTip组件，根据传入的props显示错误或警告信息
export default function MessageTip(props: MessageProps) {
  const { type, content } = props;
  const [visible, setVisible] = useState(false); // 状态管理，控制消息提示的显示与隐藏

  // handleClick函数，用于关闭消息提示
  const handleClick = () => {
    setVisible(false); // 将visible状态设置为false，隐藏消息提示
  };

  // 使用useEffect监听content的变化
  useEffect(() => {
    setVisible(!!content); // !!作用：将content转为布尔值，用于控制消息提示的显示
  }, [content]); // 依赖项为content，当content变化时重新渲染组件

  // 根据visible状态决定是否渲染消息提示组件
  return visible ? (
    <div className={cs(Styles.ct, Styles[type])}>
      {/* 动态设置类名，根据消息类型改变样式  */}
      {/* pre标签文本中的空白符（比如空格和换行符）都会显示出来 */}
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      {/* 直接将content作为HTML渲染，注意安全性 */}
      <button className={Styles.close} onClick={handleClick}>
        ✕
      </button>
      {/* 关闭按钮，点击时调用handleClick函数 */}
    </div>
  ) : null;
}
