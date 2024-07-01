import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * 倒计时选项接口，定义了倒计时的配置参数
 */
interface Options {
  // 可选参数，以毫秒为单位的剩余时间
  // leftTime 和 targetTime 只用传入一个就行
  leftTime?: number;
  // 可选参数，倒计时结束的时间点
  targetTime?: dayjs.ConfigType;
  // 可选参数，更新倒计时的间隔，默认为1000毫秒
  interval?: number;
  // 可选参数，倒计时结束时的回调函数
  onEnd?: () => void;
}

/**
 * 格式化倒计时结果接口，定义了倒计时的各个时间单位
 */
interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

/**
 * 计算与目标时间的剩余时间
 * @param target - 倒计时目标时间
 * @returns 剩余时间，如果没有提供目标时间则返回0
 */
// 计算剩下的时间
function calcLeft(target?: dayjs.ConfigType) {
  if (!target) return 0;

  const left = dayjs(target).diff(dayjs(), "millisecond");
  return left < 0 ? 0 : left;
}

/**
 * 格式化剩余时间
 * @param milliseconds - 剩余时间，以毫秒为单位
 * @returns 格式化后的倒计时结果
 */
// 格式化时间
function formatTime(milliseconds: number): FormattedRes {
  return {
    days: Math.floor(milliseconds / 1000 / 60 / 60 / 24),
    hours: Math.floor((milliseconds / 1000 / 60 / 60) % 24),
    minutes: Math.floor((milliseconds / 1000 / 60) % 60),
    seconds: Math.floor((milliseconds / 1000) % 60),
    milliseconds: Math.floor(milliseconds % 1000),
  };
}

/**
 * 使用倒计时钩子，提供了一个可更新的倒计时和其格式化后的结果
 * @param options - 倒计时的配置选项
 * @returns 倒计时的剩余时间和格式化后的结果
 */
export default function useCountDown(options: Options): [number, FormattedRes] {
  const { leftTime, targetTime, onEnd, interval = 1000 } = options;

  // 使用useMemo钩子缓存计算结果，避免不必要的重新计算
  // 根据 leftTime 和 当前时间能计算出倒计时的目标日期
  const memoLeftTime = useMemo(() => {
    return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  // 确定倒计时的目标时间
  // 倒计时目标日期
  const target = "leftTime" in options ? memoLeftTime : targetTime;

  // 使用useState钩子管理倒计时的剩余时间
  const [countDown, setCountDown] = useState(() => calcLeft(target));

  // 使用useRef钩子保存onEnd回调函数的引用，以避免每次渲染都创建新的函数实例
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // 使用useEffect钩子来启动倒计时并更新状态
  useEffect(() => {
    if (!target) {
      setCountDown(0);
      return;
    }

    setCountDown(calcLeft(target));

    const timer = setInterval(() => {
      const toTarget = calcLeft(target);
      setCountDown(toTarget);
      if (toTarget <= 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);
  }, [interval, target]);

  // 使用useMemo钩子格式化倒计时结果，避免不必要的重新格式化
  // 格式化
  const formatRes = useMemo(() => formatTime(countDown), [countDown]);

  return [countDown, formatRes];
}
