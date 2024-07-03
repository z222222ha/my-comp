import{j as s}from"./jsx-runtime-QvZ8i92b.js";import{r as a}from"./index-uubelm5h.js";import"./js.cookie-CRL9lqqW.js";function u(e){const[r,o]=a.useState(!1);typeof e=="function"&&(e=e(r));const t=()=>{o(!0)},m=()=>{o(!1)};return[a.cloneElement(e,{onMouseEnter:t,onMouseLeave:m}),r]}const E={title:"Hooks/useHover",parameters:{layout:"centered"},tags:["autodocs"]},n={args:{},render:()=>{const e=t=>s.jsxs("span",{children:["Hover me! ",t&&"Thanks! "]}),[r,o]=u(e);return s.jsxs(s.Fragment,{children:[r,s.jsx("span",{children:o?"HOVERED!":""})]})}};var c,p,l;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const element = (hovered: boolean) => <span>Hover me! {hovered && "Thanks! "}</span>;
    const [hoverable, hovered] = useHover(element);
    return <>\r
        {hoverable}\r
        <span>{hovered ? "HOVERED!" : ""}</span>\r
      </>;
  }
}`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const x=["Example"];export{n as Example,x as __namedExportsOrder,E as default};
