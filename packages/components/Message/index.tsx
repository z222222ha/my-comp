import React, { useEffect, createRef, useMemo, forwardRef } from "react";
import useStore from "./useStore";
import useTimer from "./useTimer";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./msg.scss";
import { createPortal } from "react-dom";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: React.CSSProperties;
  className?: string;
  content: React.ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
  onClose?: (arg: number) => void;
}

const MessageItem = forwardRef(
  (item: MessageProps, ref: React.Ref<HTMLDivElement>) => {
    const { onMouseEnter, onMouseLeave } = useTimer({
      duration: item.duration,
      id: item.id!,
      remove: item.onClose!,
    });

    return (
      <div
        ref={ref}
        key={item.id}
        className="message-item"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {item.content}
      </div>
    );
  }
);

export default function Message() {
  const { messageList, add, remove } = useStore("top");

  useEffect(() => {
    // setInterval(() => {
    //   add({
    //     content: Math.random().toString().slice(2, 8),
    //     position: Math.random() > 0.5 ? "top" : "bottom",
    //   });
    // }, 2000);
    add({
      content: Math.random().toString().slice(2, 8),
      position: Math.random() > 0.5 ? "top" : "bottom",
    });
  }, []);

  const groups = Object.keys(messageList) as Position[];

  console.log(messageList, groups);

  const MessageWrapper = (
    <div className="message-wrapper">
      {groups.map((direction) => (
        <TransitionGroup
          key={direction}
          className={`message-wrapper-${direction}`}
        >
          {messageList[direction].map((item) => {
            const ref = createRef<HTMLDivElement>();
            return (
              <CSSTransition
                nodeRef={ref}
                key={item.id}
                timeout={300}
                classNames="message"
              >
                <MessageItem ref={ref} {...item} onClose={remove} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      ))}
    </div>
  );

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "message-container";
    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(MessageWrapper, el);
}
