import{j as t}from"./jsx-runtime-QvZ8i92b.js";import{r}from"./index-uubelm5h.js";import{a}from"./js.cookie-CRL9lqqW.js";function p(e){const[s,o]=r.useState(a.get(e)||null),i=r.useCallback((u,C)=>{a.set(e,u,C),o(u)},[e]),k=r.useCallback(()=>{a.remove(e),o(null)},[e]);return[s,i,k]}const f={title:"Hooks/useCookie",parameters:{layout:"centered"},tags:["autodocs"]},n={args:{},render:()=>{const[e,s,o]=p("hanhui");r.useEffect(()=>{o()},[]);const i=()=>{s("666")};return t.jsxs("div",{children:[t.jsxs("p",{children:["cookie 值: ",e]}),t.jsx("button",{onClick:i,children:"更新 Cookie"}),t.jsx("br",{}),t.jsx("button",{onClick:o,children:"删除 Cookie"})]})}};var c,d,l;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const [cookie, updateCookie, deleteCookie] = useCookie("hanhui");
    useEffect(() => {
      deleteCookie();
    }, []);
    const updateCookieHandler = () => {
      updateCookie("666");
    };
    return <div>\r
        <p>cookie 值: {cookie}</p>\r
        <button onClick={updateCookieHandler}>更新 Cookie</button>\r
        <br />\r
        <button onClick={deleteCookie}>删除 Cookie</button>\r
      </div>;
  }
}`,...(l=(d=n.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const h=["Example"];export{n as Example,h as __namedExportsOrder,f as default};
