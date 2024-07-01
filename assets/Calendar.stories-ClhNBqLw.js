import{j}from"./jsx-runtime-QvZ8i92b.js";import{C as D}from"./index-CTT6V1xr.js";import"./index-uubelm5h.js";import{d as s}from"./js.cookie-CRL9lqqW.js";import"./index-Dei0BBcc.js";const M={title:"React-components/Calendar",component:D,parameters:{layout:"centered"},tags:["autodocs"]},e={args:{value:s("2023-11-08")}},r={args:{value:s("2023-11-08"),renderCell(t){return j.jsxs("div",{children:["日期",t.date()]})}}},a={args:{value:s("2023-11-08"),renderCellContent(t){return j.jsx("div",{style:{background:"yellowgreen"},children:t.format("YYYY-MM-DD")})}}},n={args:{value:s("2023-11-08"),locale:"en-US"}};var o,l,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
      }}>\r
          {currentDate.format("YYYY-MM-DD")}\r
        </div>;
    }
  }
}`,...(g=(i=a.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var C,v,y;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    value: dayjs("2023-11-08"),
    locale: "en-US"
  }
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const E=["Value","RenderCell","RenderCellContent","Locale"];export{n as Locale,r as RenderCell,a as RenderCellContent,e as Value,E as __namedExportsOrder,M as default};
