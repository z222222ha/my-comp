import { useEffect, useState } from "react";

export default function useScrolling(ref: React.RefObject<HTMLElement>) {
  // useState 记录scroll状态
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    if (ref.current) {
      let scrollingTimer: number;

      const handleScrollEnd = () => {
        setScrolling(false);
      };

      const handleScroll = () => {
        setScrolling(true);
        clearTimeout(scrollingTimer);
        scrollingTimer = setTimeout(() => handleScrollEnd(), 150);
      };

      ref.current.addEventListener("scroll", handleScroll);

      return () => {
        ref.current?.removeEventListener("scroll", handleScroll);
        clearTimeout(scrollingTimer);
      };
    }
  }, []);

  return scrolling;
}

// 为啥 useHover 的时候是传入 element，通过 cloneElement 添加事件，而 useScroll 里是传入 ref，通过 addEventListener 添加事件呢？

// 确实，这两种实现方式都可以。

// 但是有区别，传入 element 通过 cloneElement 修改后返回的方式，因为会覆盖这个属性，所以要先调用下之前的事件处理函数。

// 而传入 ref 直接 addEventListener 的方式，则是直接把事件绑定在元素上了，可以绑定多个。

// 比如 useHover 在 react-use 里用的 React Element + cloneElement 的方式实现，而在 ahooks 就是用的 ref + addEventListener 实现的

// 其实还有一种方式更常用，就是返回 hook 返回 onXxx 函数，调用者自己绑定
// 比如 @floating-ui/react 包的 useInteractions，就是返回 props 对象，比如 {onClick: xxx} 让调用者自己绑定
// 综上在 hooks 中绑定事件一共有三种方式
