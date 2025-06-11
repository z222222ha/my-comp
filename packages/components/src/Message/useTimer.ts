import { useEffect, useRef } from "react";

export interface UserTimerProps {
  id: number;
  duration?: number;
  remove: (id: number) => void;
}

export default function useTimer(props: UserTimerProps) {
  const { id, duration = 3000, remove } = props;
  const timer = useRef<number | null>(null);

  const start = () => {
    timer.current = window.setTimeout(() => {
      remove(id);
      stop();
    }, duration);
  };

  const stop = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  const onMouseEnter = () => {
    console.log("mouse enter:", id);
    stop();
  };

  const onMouseLeave = () => {
    console.log("mouse leave:", id);
    start();
  };

  return { onMouseEnter, onMouseLeave };
}
