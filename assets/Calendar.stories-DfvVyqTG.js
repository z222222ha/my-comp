import{j}from"./jsx-runtime-qGIIFXMu.js";import{C as D,d as s}from"./js.cookie-DcrPj4HS.js";import"./index-CDs2tPxN.js";import"./index-B-yFm4aN.js";const f={title:"React/日历组件",component:D,parameters:{layout:"centered"},tags:["autodocs"]},e={args:{value:s("2023-11-08")}},r={args:{value:s("2023-11-08"),renderCell(t){return j.jsxs("div",{children:["日期",t.date()]})}}},a={args:{value:s("2023-11-08"),renderCellContent(t){return j.jsx("div",{style:{background:"yellowgreen"},children:t.format("YYYY-MM-DD")})}}},n={args:{value:s("2023-11-08"),locale:"en-US"}};var o,l,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    value: dayjs("2023-11-08")
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,u,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: dayjs("2023-11-08"),
    renderCell(currentDate) {
      return <div>日期{currentDate.date()}</div>;
    }
  }
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,i,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    value: dayjs("2023-11-08"),
    renderCellContent(currentDate) {
      return <div style={{
        background: "yellowgreen"
      }}>{currentDate.format("YYYY-MM-DD")}</div>;
    }
  }
}`,...(g=(i=a.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var v,C,y;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    value: dayjs("2023-11-08"),
    locale: "en-US"
  }
}`,...(y=(C=n.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};const M=["Value","RenderCell","RenderCellContent","Locale"];export{n as Locale,r as RenderCell,a as RenderCellContent,e as Value,M as __namedExportsOrder,f as default};
