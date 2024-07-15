import React, { useContext, useState } from "react";
import FormContext from "./FormContext";

export interface ItemProps {
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  name?: string;
  valuePropName?: string;
  rules?: Array<any>;
  children?: React.ReactNode;
}

export default function Item() {
  const { onValueChange, values, validateRegister } = useContext(FormContext);
  const [value, setValue] = useState();
  const [error, setError] = useState();

  return <div>Item</div>;
}
