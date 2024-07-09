import { useContext } from "react";
// import { ConfigContext } from "./ConfigProvider";
import { ConfigContext } from "../ConfigProvider";

export default function useMessage() {
  // debugger;
  const { messageRef, space } = useContext(ConfigContext);
  console.log("messageRef context!!!!!", messageRef, space);

  if (!messageRef) {
    throw new Error("请在最外层添加 ConfigProvider 组件");
  }

  return messageRef?.current;
}
