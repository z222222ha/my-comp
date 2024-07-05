import React from "react";

export interface MessageProps {
  style?: React.CSSProperties;
  className?: string;
  content: React.ReactNode;
  duration?: number;
  id?: number;
  position?: "top" | "bottom";
}

export default function Message(props: MessageProps) {
  return <div>Message</div>;
}
