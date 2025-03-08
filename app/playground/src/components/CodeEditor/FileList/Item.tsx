import React, { useEffect, useRef, useState } from "react";
import Styles from "./index.module.scss";
import cs from "classnames";
import { Popconfirm } from "antd";

export interface Props {
  value: string;
  active: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  onRemove: () => void;
}

export default function Item(props: Props) {
  const {
    value,
    active,
    onClick,
    onEditComplete,
    onRemove,
    readonly,
    creating,
  } = props;
  const [name, setName] = useState(value);

  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(creating);

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

  const handleDoubleClick = () => {
    console.log("double click");
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
    // wrong： inputRef?.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止冒泡，否则会出触发tab上的点击事件
    onRemove();
  };

  return (
    <div className={cs(Styles.item, active && Styles.active)} onClick={onClick}>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={name}
          className={Styles.input}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <div className={Styles.name}>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
        </div>
      )}
      {!readonly ? (
        <Popconfirm
          title="确认删除该文件吗？"
          okText="确定"
          cancelText="取消"
          onConfirm={(e) => handleRemove(e!)}
        >
          <span className={Styles.close}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
              <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </Popconfirm>
      ) : null}
    </div>
  );
}

// TODO：点击 item scroll 定位
