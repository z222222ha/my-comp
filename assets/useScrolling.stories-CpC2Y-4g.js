import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{r as o}from"./index-CDs2tPxN.js";import"./js.cookie-DcrPj4HS.js";import"./index-B-yFm4aN.js";function f(e){const[t,s]=o.useState(!1);return o.useEffect(()=>{if(e.current){let r;const m=()=>{s(!1)},c=()=>{s(!0),clearTimeout(r),r=setTimeout(()=>m(),150)};return e.current.addEventListener("scroll",c),()=>{var i;(i=e.current)==null||i.removeEventListener("scroll",c),clearTimeout(r)}}},[]),t}const E={title:"Hooks/useScrolling",parameters:{layout:"centered"},tags:["autodocs"]},l={args:{},render:()=>{const e=o.useRef(null),t=f(e);return n.jsxs(n.Fragment,{children:[n.jsx("div",{children:t?"滚动中..":"没有滚动"}),n.jsx("div",{ref:e,style:{height:"200px",overflow:"auto"},children:new Array(100).fill(0).map((s,r)=>n.jsxs("div",{children:["Element-",r]},r))})]})}};var a,u,d;l.parameters={...l.parameters,docs:{...(a=l.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrolling = useScrolling(scrollRef);
    return <>\r
        <div>{scrolling ? "滚动中.." : "没有滚动"}</div>\r
        <div ref={scrollRef} style={{
        height: "200px",
        overflow: "auto"
      }}>\r
          {new Array(100).fill(0).map((_, index) => <div key={index}>Element-{index}</div>)}\r
        </div>\r
      </>;
  }
}`,...(d=(u=l.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const h=["Example"];export{l as Example,h as __namedExportsOrder,E as default};
