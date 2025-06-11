import React, { PropsWithChildren, RefObject, useRef } from "react";
import { SizeType } from "../Space";
import Message, { MessageRef } from "../Message";

interface ConfigContextType {
  space?: { size: SizeType };
  messageRef?: RefObject<MessageRef>;
}

export const ConfigContext = React.createContext<ConfigContextType>({});

interface ConfigProviderProps extends PropsWithChildren<ConfigContextType> {}

export default function ConfigProvider(props: ConfigProviderProps) {
  const { children, space } = props;

  const messageRef = useRef<MessageRef>(null);

  return (
    <ConfigContext.Provider value={{ space, messageRef }}>
      <Message ref={messageRef} />
      {children}
    </ConfigContext.Provider>
  );
}
