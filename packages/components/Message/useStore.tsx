import { useState } from "react";
import { Position, MessageProps } from ".";

type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initState = {
  top: [],
  bottom: [],
};

let count = 1;
function getId(messageProps: MessageProps) {
  if (messageProps.id) {
    return messageProps.id;
  }
  count += 1;
  return count;
}

// 根据 id 查询是否存在
function getMsgPosition(msgList: MessageList, id: number) {
  for (const [position, list] of Object.entries(msgList)) {
    if (list.find((msg) => msg.id === id)) {
      return position as Position;
    }
  }
}

function findMsg(msgList: MessageList, id: number) {
  const position = getMsgPosition(msgList, id);
  const index = position
    ? msgList[position].findIndex((msg) => msg.id === id)
    : -1;
  return { position, index };
}

export default function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>(initState);

  return {
    messageList,
    add(messageProps: MessageProps) {
      const id = getId(messageProps);
      setMessageList((prev) => {
        // 存在相同id的消息，则不添加
        if (messageProps.id) {
          const position = getMsgPosition(prev, messageProps.id);
          if (position) return prev;
        }

        // position = top 在前面插入元素；position = bottom 在后面插入元素
        const position = messageProps.position || defaultPosition;
        const isTop = position?.includes("top");
        const messages = isTop
          ? [{ ...messageProps, id }, ...prev["top"]]
          : [...prev["bottom"], { ...messageProps, id }];

        return {
          ...prev,
          [position]: messages,
        };
      });
    },
    update(id: number, messageProps: MessageProps) {
      setMessageList((prev) => {
        const tempState = { ...prev };
        const { position, index } = findMsg(tempState, id);

        if (position && index !== -1) {
          tempState[position][index] = {
            ...tempState[position][index],
            ...messageProps,
          };
        }

        return tempState;
      });
    },
    remove(id: number) {
      setMessageList((prev) => {
        const position = getMsgPosition(prev, id)!;

        if (!position) return prev;

        return {
          ...prev,
          [position]: prev[position].filter((item) => item.id !== id),
        };
      });
    },
    clearAll() {
      setMessageList(initState);
    },
  };
}
