import React, { useRef, useState } from "react";
import FormContext from "./FormContext";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errors: any) => void;
  initialValues?: Record<string, any>;
}

export default function Form(props: FormProps) {
  const {
    className,
    children,
    style,
    onFinish,
    onFinishFailed,
    initialValues,
  } = props;
  // 用 useState 保存 values
  const [values, setValues] = useState(initialValues || {});
  // 用 useRef 保存 errors 和 validator
  const errors = useRef({});
  const validatorMap = useRef(new Map());

  // onValueChange 的时候就是修改 values 的值
  // submit 的时候就是调用 onFinish ,传入 values，再调用所有 validator 对值做校验
  // 如果有错误，就调用 onFinishFailed 回调

  const onValueChange = (key: string, value: any) => {
    console.log(key, value);
    values[key] = value;
  };

  const handleValidateRegister = (name: string, cb: () => void) => {
    validatorMap.current.set(name, cb);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(values);

    for (let [key, cb] of validatorMap.current) {
      if (typeof cb === "function") {
        errors.current[key] = cb();
      }
    }

    console.log(errors.current);

    const errorList = Object.keys(errors.current)
      .map((key) => {
        return errors.current[key];
      })
      .filter(Boolean);

    console.log(errorList);

    if (errorList.length) {
      onFinishFailed?.(errors.current);
    } else {
      onFinish?.(values);
    }
  };

  return (
    <FormContext.Provider
      value={{
        onValueChange,
        values,
        setValues: (v) => setValues(v),
        validateRegister: handleValidateRegister,
      }}
    >
      <form className={className} style={style} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
