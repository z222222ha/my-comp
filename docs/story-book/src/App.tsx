import {
  Calendar,
  Icon,
  createIcon,
  createFromIconFont,
  Space,
  Portal,
  MutateObserver,
  CopyToClipboard,
  Watermark,
} from "zhh-components";
import {
  useCookie,
  useHover,
  useScrolling,
  useSize,
  useHoverRef,
} from "zhh-hooks";
import dayjs from "dayjs";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );

  const IconAdd = createIcon({
    content: (
      <>
        <path d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"></path>
      </>
    ),
  });

  const IconEmail = createIcon({
    content: (
      <>
        <path d="M874.666667 181.333333H149.333333c-40.533333 0-74.666667 34.133333-74.666666 74.666667v512c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V256c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-725.333334 64h725.333334c6.4 0 10.666667 4.266667 10.666666 10.666667v25.6L512 516.266667l-373.333333-234.666667V256c0-6.4 4.266667-10.666667 10.666666-10.666667z m725.333334 533.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V356.266667l356.266666 224c4.266667 4.266667 10.666667 4.266667 17.066667 4.266666s12.8-2.133333 17.066667-4.266666l356.266666-224V768c0 6.4-4.266667 10.666667-10.666666 10.666667z"></path>
      </>
    ),
  });

  const PandaSvg = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path
        d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
        fill="#6B676E"
      />
      <path
        d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
        fill="#FFEBD2"
      />
      <path
        d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
        fill="#E9D7C3"
      />
      <path
        d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
        fill="#FFFFFF"
      />
      <path
        d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
        fill="#6B676E"
      />
      <path
        d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
        fill="#464655"
      />
      <path
        d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
        fill="#464655"
      />
      <path
        d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
        fill="#464655"
      />
    </svg>
  );

  const IconFont = createFromIconFont(
    "//at.alicdn.com/t/font_3286126_wwyk59664s.js"
  );

  // portal

  const PortalTest = (
    <div className="portal-btn">
      <button>portal</button>
    </div>
  );
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log(containerRef);
  }, []);

  // mutateobserver
  const [className, setClassName] = useState("aaa");

  useEffect(() => {
    setTimeout(() => setClassName("bbb"), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };

  // useCookie
  const [cookie, updateCookie, deleteCookie] = useCookie("hanhui");

  useEffect(() => {
    deleteCookie();
  }, []);

  const updateCookieHandler = () => {
    updateCookie("666");
  };

  // useHover
  const element = (hovered: boolean) => (
    <div>Hover me! {hovered && "Thanks"}</div>
  );

  const [hoverable, hovered] = useHover(element);

  // useScrolling
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrolling = useScrolling(scrollRef);

  // useSize
  const useSizeRef = useRef<HTMLDivElement>(null);
  const size = useSize(useSizeRef);

  // useHoverRef
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHoverRef(hoverRef);

  return (
    <div>
      <Calendar
        value={dayjs("2024-6-18")}
        // renderCell={(date) => {
        //   return <div style={{ background: "yellowgreen" }}>{date.format("YYYY-MM-DD")}</div>;
        // }}
        renderCellContent={(date) => {
          return (
            <div style={{ background: "yellowgreen" }}>
              {date.format("YYYY-MM-DD")}
            </div>
          );
        }}
        locale="en-US"
        onChange={(date) => {
          console.log("click:", date.format("YYYY-MM-DD"));
        }}
      />

      <IconAdd />
      <IconAdd size="40px" />
      <IconEmail spin />
      <IconEmail style={{ color: "blue", fontSize: "50px" }} />
      <IconFont type="icon-xihuan" size="40px" />
      <IconFont type="icon-shezhi" fill="blue" spin />
      <IconFont
        type="icon-tongzhi"
        style={{ color: "blue", fontSize: "50px" }}
      />
      <Icon component={PandaSvg} style={{ fontSize: "50px" }} />
      <Icon
        component={HeartSvg}
        style={{ fontSize: "50px", color: "hotpink" }}
      />
      <div>---------------</div>
      <Space align="center" wrap={true} size={"large"} className="container">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </Space>
      <div>-----------------</div>
      <Space.ConfigProvider space={{ size: 20 }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
        <Space direction="vertical">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </Space.ConfigProvider>

      <Portal attach={document.body} ref={containerRef}>
        {PortalTest}
      </Portal>
      <div>------------------</div>
      <div>
        <MutateObserver onMutate={callback}>
          <div id="container">
            <div className={className}>
              {className === "aaa" ? (
                <div>aaa</div>
              ) : (
                <div>
                  <p>bbb</p>
                </div>
              )}
            </div>
          </div>
        </MutateObserver>
      </div>
      <div>------------------</div>
      <CopyToClipboard
        text={"zhhtest123"}
        onCopy={(text, result) => {
          console.log(text, result);
        }}
      >
        <div onClick={() => alert(1)}>copy</div>
      </CopyToClipboard>
      <div>------------------</div>
      <Watermark content={["测试水印", "神说要有光"]} gap={[0, 0]}>
        <div style={{ height: 800 }}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod
            deserunt quidem quas in rem ipsam ut nesciunt asperiores dignissimos
            recusandae minus, eaque, harum exercitationem esse sapiente?
            Eveniet, id provident!
          </p>
        </div>
      </Watermark>
      <div>------------------</div>
      <div>
        <p>cookie 值: {cookie}</p>
        <button onClick={updateCookieHandler}>更新 Cookie</button>
        <br />
        <button onClick={deleteCookie}>删除 Cookie</button>
      </div>
      <div>------------------</div>
      <div>
        {hoverable}
        <div>{hovered ? "HOVERED" : ""}</div>
      </div>
      <div>------------------</div>

      {<div>{scrolling ? "滚动中.." : "没有滚动"}</div>}

      <div ref={scrollRef} style={{ height: "200px", overflow: "auto" }}>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
        <div>guang</div>
      </div>
      <div>------------------</div>
      <div ref={useSizeRef}>
        <p>改变窗口大小试试</p>
        <p style={{ backgroundColor: "red" }}>
          width: {size?.width}px, height: {size?.height}px
        </p>
      </div>
      <div>------------------</div>
      <div ref={hoverRef} style={{ width: "30px", backgroundColor: "red" }}>
        {isHover ? "in" : "out"}
      </div>
      <div>------------------</div>
    </div>
  );
}

export default App;
