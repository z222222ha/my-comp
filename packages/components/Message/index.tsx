import React, { useEffect, createRef } from "react";
import useStore from "./useStore";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./msg.scss";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: React.CSSProperties;
  className?: string;
  content: React.ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
}

export default function Message() {
  const { messageList, add } = useStore("top");

  useEffect(() => {
    setInterval(() => {
      add({
        content: Math.random().toString().slice(2, 8),
        position: Math.random() > 0.5 ? "top" : "bottom",
      });
    }, 2000);
  }, []);

  const groups = Object.keys(messageList) as Position[];

  console.log(messageList, groups);

  return (
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
                <div ref={ref} key={item.id} className="message-item">
                  {item.content}
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      ))}
    </div>
  );
}
