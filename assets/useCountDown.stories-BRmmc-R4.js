import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{d as p}from"./js.cookie-DcrPj4HS.js";import{r}from"./index-CDs2tPxN.js";import"./index-B-yFm4aN.js";function f(e){if(!e)return 0;const n=p(e).diff(p(),"millisecond");return n<0?0:n}function Y(e){return{days:Math.floor(e/1e3/60/60/24),hours:Math.floor(e/1e3/60/60%24),minutes:Math.floor(e/1e3/60%60),seconds:Math.floor(e/1e3%60),milliseconds:Math.floor(e%1e3)}}function y(e){const{leftTime:n,targetTime:m,onEnd:o,interval:a=1e3}=e,g=r.useMemo(()=>n&&n>0?Date.now()+n:void 0,[n]),s="leftTime"in e?g:m,[i,d]=r.useState(()=>f(s)),u=r.useRef(o);u.current=o,r.useEffect(()=>{if(!s){d(0);return}d(f(s));const T=setInterval(()=>{var D;const l=f(s);d(l),l<=0&&(clearInterval(T),(D=u.current)==null||D.call(u))},a)},[a,s]);const j=r.useMemo(()=>Y(i),[i]);return[i,j]}const R={title:"Hooks/useCountDown",parameters:{layout:"centered"},tags:["autodocs"]},c={args:{},render:()=>{const[,e]=y({targetTime:`${p().format("YYYY-MM-DD")} 17:00:00`}),{days:n,hours:m,minutes:o,seconds:a}=e;return t.jsxs("div",{children:[t.jsx("span",{children:"距离下班还剩："}),n>0&&t.jsxs("span",{children:[n,"天"]}),t.jsxs("span",{children:[m,"时"]}),t.jsxs("span",{children:[o,"分"]}),t.jsxs("span",{children:[a,"秒"]})]})}};var h,x,M;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const [, formatRes] = useCountDown({
      //   targetTime: \`\${new Date().getFullYear()}-12-31 23:59:59\`,
      targetTime: \`\${dayjs().format("YYYY-MM-DD")} 17:00:00\`
    });
    const {
      days,
      hours,
      minutes,
      seconds
    } = formatRes;
    return <div>\r
        <span>距离下班还剩：</span>\r
        {days > 0 && <span>{days}天</span>}\r
        <span>{hours}时</span>\r
        <span>{minutes}分</span>\r
        <span>{seconds}秒</span>\r
      </div>;
  }
}`,...(M=(x=c.parameters)==null?void 0:x.docs)==null?void 0:M.source}}};const C=["Example"];export{c as Example,C as __namedExportsOrder,R as default};
