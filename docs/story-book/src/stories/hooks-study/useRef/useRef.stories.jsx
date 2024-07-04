import { useRef, useState } from "react";

const meta = {
  title: "Hooks-Study/useRef",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Example = {
  name: "使用 ref 引用非渲染的值",
  args: {},
  render: () => {
    const timer = useRef(null);
    const [start, setStart] = useState(null);
    const [now, setNow] = useState(null);

    function handleStart() {
      setNow(Date.now());
      setStart(Date.now());

      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setNow(Date.now());
      }, 10);
    }

    function handleStop() {
      clearInterval(timer.current);
    }

    let secondsPassed = 0;
    if (start && now) {
      secondsPassed = (now - start) / 1000;
    }
    return (
      <>
        <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
      </>
    );
  },
};
