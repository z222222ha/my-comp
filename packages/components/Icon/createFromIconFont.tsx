import React from "react";
import Icon, { IconProps } from "./Icon";

const loadedSet = new Set<string>();

export default function createFromIconFont(scriptUrl: string) {
  if (typeof scriptUrl === "string" && !loadedSet.has(scriptUrl)) {
    const script = document.createElement("script");
    script.setAttribute("src", scriptUrl);
    script.setAttribute("data-namespace", scriptUrl);
    document.body.appendChild(script);

    loadedSet.add(scriptUrl);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
    const { type, ...rest } = props;

    return (
      <Icon {...rest} ref={ref}>
        {type ? <use xlinkHref={`#${type}`} /> : null}
      </Icon>
    );
  });

  return Iconfont;
}
