import{j as s}from"./jsx-runtime-qGIIFXMu.js";import"./js.cookie-DcrPj4HS.js";import{r as a}from"./index-CDs2tPxN.js";import"./index-B-yFm4aN.js";function u(e){console.log(e);const[o,r]=a.useState(!1);typeof e=="function"&&(e=e(o));const t=()=>{console.log("mouseenter"),r(!0)},m=()=>{console.log("mouseleave"),r(!1)};return[a.cloneElement(e,{onMouseEnter:t,onMouseLeave:m}),o]}const x={title:"Hooks/useHover",parameters:{layout:"centered"},tags:["autodocs"]},n={args:{},render:()=>{const e=t=>s.jsxs("span",{children:["Hover me! ",t&&"Thanks! "]}),[o,r]=u(e);return s.jsxs(s.Fragment,{children:[o,s.jsx("span",{children:r?"HOVERED!":""})]})}};var c,l,p;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const element = (hovered: boolean) => <span>Hover me! {hovered && "Thanks! "}</span>;
    const [hoverable, hovered] = useHover(element);
    return <>\r
        {hoverable}\r
        <span>{hovered ? "HOVERED!" : ""}</span>\r
      </>;
  }
}`,...(p=(l=n.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const H=["Example"];export{n as Example,H as __namedExportsOrder,x as default};
