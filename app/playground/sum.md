# Package

- [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react)：基于 react 封装的代码编辑器（*Monaco Editor used in vscode by Microsoft*）
- [@typescript/ata](https://www.npmjs.com/package/@typescript/ata)：自动类型获取，实现 ts 的类型自动提示功能
- [allotment](https://www.npmjs.com/package/allotment)：面板分割（*React split-pane component*）
- [@babel/standalone](https://www.npmjs.com/package/@babel/standalone)：浏览器中使用 babel（*Standalone build of Babel for use in non-Node.js environments*）
- `Blob` + `URL.createBlobURL`：将模块代码转成 Blob 对象后再生成对应的 URL 用 import 导入

> `Blob` 对象表示一个不可变的、原始数据的类文件对象。`Blob` 表示的数据可以是任意类型的二进制数据，例如文本文件、图像、音频或视频等。`Blob` 对象通常用于处理文件上传、读取文件内容、创建 Blob URLs

- [importmap](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script/type/importmap) + `esm.sh`：定义 react、react-dom 等公共基础库的 cdn 导入
- `iframe` + `postMessage`：使用 iframe 进行预览，使用 postMessage 和父窗口通信来回显代码运行时错误
- `fflate` + `btoa`：使用 fflate 压缩 url-hash 字符串，用 btoa 转为 asc 码字符串
- `jszip` + `file-saver`：代码的压缩和下载
- `Web Worker`：通过 Web Worker 拆分编译逻辑到 worker 线程来进行性能优化，消除了 long lask

# 左右分割布局

```shell
npm install --save allotment
```

<img src="https://user-images.githubusercontent.com/981531/161631194-1e24ea10-f46a-42db-bfdb-89bcfa3fc50b.gif"/>

```jsx
import { Allotment } from "allotment";
import 'allotment/dist/style.css';

export default function ReactPlayground() {
    return <div style={{height: '100vh'}}>
        <Header/>
        {/* defaultSizes：左右面板的比例  */}
        <Allotment defaultSizes={[100, 100]}>
            <Allotment.Pane minSize={500}>
                <CodeEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={0}>
                <Preview />
            </Allotment.Pane>
        </Allotment>
    </div>
}
```

# 代码编辑器

```shell
npm install --save @monaco-editor/react
```

```tsx
return (
  <MonacoEditor
    height="100%" // 设置编辑器高度为100%
    path={file.name} // 设置文件路径
    language={file.language} // 设置文件语言
    value={file.value} // 设置文件内容
    onMount={handleEditorMount} // 编辑器挂载时的处理函数
    onChange={onChange} // 编辑器内容变化时的回调
    options={{
      // 编辑器的配置选项
      fontSize: 14, // 字体大小
      scrollBeyondLastLine: false, // 禁止滚动到最后一行之后
      minimap: {
        // 禁止显示缩略图
        enabled: false,
      },
      scrollbar: {
        // 设置滚动条大小
        verticalScrollbarSize: 6,
        horizontalScrollbarSize: 6,
      },
      ...options, // 合并传入的额外选项
    }}
  />
);
```

## 配置 `tsconfig.json`

![image-20240813145942453](https://gitee.com/z222222ha/img-store/raw/master/image-20240813145942453.png)

代码渲染没问题，但是提示 jsx 不知道怎么处理，是因为没有配置 `tsconfig.json`。

在 monaco 中，可以在编辑器加载完的回调里，设置 ts 的默认 `compilerOptions`：

```js
// 配置TypeScript语言的编译器选项，以便正确处理jsx
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.Preserve, // 保留jsx
  esModuleInterop: true, // 启用ES模块互操作性
});
```

### `JsxEmit` 枚举

`monaco.languages.typescript.JsxEmit` 枚举提供了以下选项：

- `React`：将 JSX 转换为 React 兼容的格式

```jsx
// 转换前：
const element = <div id="test" className="example">Hello, world!</div>;
```

```js
// 转换后：
const element = React.createElement(
  "div",
  { id: "test", className: "example" },
  "Hello, world!"
);
```

- `ReactNative`：将 JSX 转换为 React Native 兼容的格式

```jsx
// 转换前：
const element = <View id="test" class="example">Hello, world!</View>;
```

```js
// 转换后：
const element = React.createElement(
  View,
  { id: "test", class: "example" },
  "Hello, world!"
);
```

- `Preserve`：保留原有的 JSX 代码结构不变
- `None`：完全禁用 JSX 的生成

### `esModuleInterop` 

[TypeScript esModuleInterop 原理&实践](https://wangshunnn.github.io/blog/ts-esModuleInterop)

`esModuleInterop` 是一个配置选项，通常出现在 Babel 和 TypeScript 的配置文件中，用于控制如何处理 ES 模块（ESM）的互操作性问题。当你的项目使用 CommonJS（CJS）模块和 ES 模块混合时，`esModuleInterop` 可以帮助你更好地在两者之间进行转换。

ESM 是 JavaScript 的标准模块系统，而 CJS 是 Node.js 中使用的模块系统。这两种模块系统在处理导出和导入时有所不同：

- **ES 模块**：使用 `import` 和 `export` 语句。
- **CommonJS 模块**：使用 `require` 和 `module.exports`。

由于这些差异，当你试图在 CJS 环境中使用 ESM 模块时，可能会遇到一些问题。例如，CJS 环境默认不支持直接使用 `import` 语句。

当你设置了 `esModuleInterop` 选项后，Babel 或 TypeScript 会自动处理 ESM 和 CJS 之间的转换，确保你可以无缝地在 CJS 环境中使用 ESM 模块。

#### 在 tsc 中配置

在 TypeScript 的 `tsconfig.json` 文件中，你可以设置 `esModuleInterop` 为 `true`：

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "esModuleInterop": true
  }
}
```

#### 在 Babel 中配置

在 Babel 的 `.babelrc` 文件中，你可以使用：

 `@babel/preset-env` 和 `@babel/plugin-transform-modules-commonjs` 插件

```json
{
  "presets": [
    ["@babel/preset-env", {
      "modules": "commonjs"
    }]
  ],
  "plugins": [
    ["@babel/plugin-transform-modules-commonjs", {
      "allowImportExportEverywhere": true
    }]
  ]
}
```

#### 例子

默认 fs 要这么引入，因为它是 commonjs 的包，没有 default 属性：

```javascript
import * as fs from 'fs';
```

设置 `esModuleInterop` 会在编译的时候自动加上 default 属性。

就可以这样引入了：

```javascript
import fs from 'fs';
```



## 设置快捷键

```js
const handleEditorMount: OnMount = (editor, monaco) => {
  // 给编辑器添加快捷键，比如 Ctrl+J 格式化代码
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
    editor.getAction("editor.action.formatDocument")?.run();
  });
  // ......
};
```

## ATA

**Automatic Type Acquisition 自动类型获取**

> A dependency for downloading `*.d.ts` files corresponding to a Node.js source file. Relies on API's provided by [jsdelivr](https://www.jsdelivr.com/).

```shell
npm install --save @typescript/ata -f 
```

可以传入源码，自动分析出需要的 ts 的 dts 类型包，然后自动下载，实现写代码时 ts 类型提示：

```js
// automatic type acquisition 自动类型获取
import { setupTypeAcquisition } from "@typescript/ata";
import typescript from "typescript";

export function createATA(
  onDownloadFile: (code: string, path: string) => void
) {
  // 配置自动类型获取的实例
  const ata = setupTypeAcquisition({
    // 项目名称，用于标识和管理
    projectName: "my-ata",
    // 使用的TypeScript模块
    typescript: typescript,
    // 日志输出，这里使用console进行输出
    logger: console,
    // 自定义的委托对象，用于处理接收文件等操作
    delegate: {
      // 当接收到文件时的处理逻辑
      receivedFile: (code, path) => {
        // 输出接收到的文件路径
        console.log("自动下载的包", path);
        // 调用传入的回调函数处理文件
        onDownloadFile(code, path);
      },
    },
  });

  // 返回配置好的ATA实例
  return ata;
}
```

```js
const handleEditorMount: OnMount = (editor, monaco) => {
  // ......

  // 创建并初始化ATA对象，用于动态添加类型定义或代码到编辑器中
  // 参数回调函数的作用是将代码和路径传递给编辑器的 ts 环境，以便动态加载额外的库或代码
  const ata = createATA((code, path) => {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      code,
      `file://${path}` // 将代码和路径添加到Monaco的TypeScript语言环境中
    );
  });

  // 监听编辑器的内容变化，以便动态更新ATA
  editor.onDidChangeModelContent(() => {
    ata(editor.getValue());
  });

  // 初始加载当前编辑器内容到ATA，确保当前内容立即可用
  ata(editor.getValue());
};
```

# Context

```ts
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { compressHash, decompressHash, fileName2Language } from "./utils";
import { initFiles } from "./file";

// 定义 Playground 上下文接口
export interface PlaygroundContext {
  files: Files; // 所有文件集合
  selectedFileName: string; // 当前选中的文件名
  theme: Theme; // 主题
  setTheme: (theme: Theme) => void; // 设置主题
  setSelectedFileName: (fileName: string) => void; // 设置选中的文件名
  setFiles: (files: Files) => void; // 设置文件集合
  addFile: (fileName: string) => void; // 添加文件
  removeFile: (fileName: string) => void; // 删除文件
  updateFileName: (oldFieldName: string, newFieldName: string) => void; // 更新文件名
}

// 创建 Playground 上下文
export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);

// provider
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;

  // 使用钩子管理状态
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");
  const [theme, setTheme] = useState<Theme>("light");

  // 添加文件方法
  const addFile = (fileName: string) => {
    setFiles((prev) => {
      return {
        ...prev,
        [fileName]: {
          name: fileName,
          value: "",
          language: fileName2Language(fileName),
        },
      };
    });
  };

  // 删除文件方法
  const removeFile = (fileName: string) => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[fileName];
      return newFiles;
    });
  };

  // 更新文件名方法
  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    const { [oldFieldName]: file, ...rest } = files;
    const newFile = { ...file, name: newFieldName };
    setFiles({ ...rest, [newFieldName]: newFile });
  };

  // 分享 hash url
  useEffect(() => {
    // const hash = JSON.stringify(files);
    // window.location.hash = encodeURIComponent(hash); // 把 url 里不支持的字符做下转换
    const hash = compressHash(JSON.stringify(files));
    window.location.hash = hash;
  }, [files]);

  // 提供上下文值
  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        theme,
        setTheme,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};
```

# Babel 编译

```shell
npm install --save @babel/standalone

npm install --save-dev @types/babel__standalone
```

转换前需要检查是否导入 react：

```tsx
/**
 * 在代码转换前进行处理，特别是自动导入React
 * @param filename 文件名
 * @param code 原始代码
 * @returns 处理后的代码
 */
export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code;
  // 匹配代码中是否已经导入React
  const regexReact = /import\s+React/g;
  // 如果是JSX或TSX文件，并且代码中没有导入React，则自动导入React
  if (
    (filename.endsWith(".jsx") || filename.endsWith(".tsx")) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};
```

使用 Babel 进行转换：

```tsx
/**
 * 使用Babel转换代码
 * @param filename 文件名
 * @param code 代码内容
 * @param files 所有文件的集合
 * @returns 转换后的代码
 */
export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  // 首先进行代码的预处理
  const _code = beforeTransformCode(filename, code);
  let result = "";
  try {
    // 使用Babel进行代码转换，包含预设和自定义插件
    result = transform(_code, {
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(files)],
      retainLines: true, // 保持行号
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }
  return result;
};
```

根据模块路径从 context 中获取对应的 file 内容：

```tsx
/**
 * 根据模块路径获取对应的文件
 * @param files 所有文件的集合
 * @param modulePath 模块路径
 * @returns 对应的文件对象
 */
const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split("./").pop() || "";
  // 如果模块名不包含扩展名，则尝试匹配正确的文件名
  if (!moduleName.includes(".")) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith(".ts") ||
          key.endsWith(".tsx") ||
          key.endsWith(".js") ||
          key.endsWith(".jsx")
        );
      })
      .find((key) => {
        return key.split(".").includes(moduleName);
      });
    if (realModuleName) {
      moduleName = realModuleName;
    }
  }
  return files[moduleName];
};
```

自定义 Babel 插件，处理各模块的路径导入问题，即修改 `ImportDeclaration` 节点的 `source.value` ：

```tsx
/**
 * 自定义Babel插件，用于解析模块路径并转换代码
 * @param files 所有文件的集合
 * @returns Babel插件对象
 */
function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      // 处理导入声明
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        // 如果是相对路径导入，则进行文件查找和转换
        if (modulePath.startsWith(".")) {
          const file = getModuleFile(files, modulePath);
          if (!file) return;
          // 根据文件类型进行不同的转换处理
          if (file.name.endsWith(".css")) {
            path.node.source.value = css2Js(file);
          } else if (file.name.endsWith(".json")) {
            path.node.source.value = json2Js(file);
          } else {
            // 如果是JS或JSX文件，则进行Babel转换
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
}
```

不同文件，不同处理：

```tsx
/**
 * 将JSON文件转换为JS模块
 * @param file JSON文件对象
 * @returns 转换后的JS模块URL
 */
const json2Js = (file: File) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

/**
 * 将CSS文件转换为JS模块，并在页面中动态创建样式标签
 * @param file CSS文件对象
 * @returns 转换后的JS模块URL
 */
const css2Js = (file: File) => {
  const randomId = new Date().getTime();
  const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
})()
    `;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};
```

编译入口文件：

```tsx
/**
 * 编译所有文件，返回入口文件的转换结果
 * @param files 所有文件的集合
 * @returns 入口文件的转换结果
 */
export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
```

在 Preview 组件中编译：

```tsx
// normal compile
useEffect(() => {
  const res = compile(files);
  setCompiledCode(res);
}, [files]);
```

# iframe 预览

新建一个 iframe 框架文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Preview</title>
  </head>
  <body>
    <!-- 导入映射脚本，用于模块化开发 -->
    <script type="importmap"></script>
    <!-- 主应用脚本，使用ES6模块化语法 -->
    <script type="module" id="appSrc"></script>
    <!-- 应用根容器，用于渲染React或其他前端框架的内容 -->
    <div id="root"></div>
  </body>
</html>
```

用 ?raw 的 import 引入 iframe.html 的文件内容，替换其中的 import-maps 和 src 的内容，并创建 iframe 的 blob-url

```tsx
function getIframeUrl() {
  const res = iframeRaw
    .replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
    )
    .replace(
      '<script type="module" id="appSrc"></script>',
      `<script type="module" id="appSrc">${compiledCode}</script>`
    );
  return URL.createObjectURL(new Blob([res], { type: "text/html" }));
}

useEffect(() => {
  setIframeUrl(getIframeUrl());
}, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

return (
  <div style={{ height: "100%" }}>
    <iframe
      src={iframeUrl}
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        border: "none",
      }}
    />
  </div>
);
```

# iframe 错误回显

### 封装 Message 组件

```tsx
import { useEffect, useState } from "react";
import Styles from "./index.module.scss";
import cs from "classnames";

export interface MessageProps {
  type: "error" | "warn"; // 消息类型，可以是"error"或"warn"
  content: string; // 消息内容
}

// MessageTip组件，根据传入的props显示错误或警告信息
export default function MessageTip(props: MessageProps) {
  const { type, content } = props;
  const [visible, setVisible] = useState(false); // 状态管理，控制消息提示的显示与隐藏

  // handleClick函数，用于关闭消息提示
  const handleClick = () => {
    setVisible(false); // 将visible状态设置为false，隐藏消息提示
  };

  // 使用useEffect监听content的变化
  useEffect(() => {
    setVisible(!!content); // !!作用：将content转为布尔值，用于控制消息提示的显示
  }, [content]); // 依赖项为content，当content变化时重新渲染组件

  // 根据visible状态决定是否渲染消息提示组件
  return visible ? (
    <div className={cs(Styles.ct, Styles[type])}>
      {/* 动态设置类名，根据消息类型改变样式  */}
      {/* pre标签文本中的空白符（比如空格和换行符）都会显示出来 */}
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      {/* 直接将content作为HTML渲染，注意安全性 */}
      <button className={Styles.close} onClick={handleClick}>
        ✕
      </button>
      {/* 关闭按钮，点击时调用handleClick函数 */}
    </div>
  ) : null;
}
```

```scss
.ct {
  /* ... */
  color: var(--color);
  background-color: var(--bg-color);

  /* 定义两组风格颜色方案 */
  &.error {
    --color: #f56c6c;
    --bg-color: #fef0f0;
  }

  &.warn {
    --color: #e6a23c;
    --bg-color: #fdf6ec;
  }

  pre {
    padding: 12px 20px;
    overflow: auto;
    white-space: break-spaces;
  }

  .close {
	/* ... */
    background-color: var(--color);
    color: var(--bg-color);
  }
}
```

### postMessage 传递消息

iframe 监听 error 并传递消息：

```html
<script>
    window.addEventListener('error', (e) => {
        window.parent.postMessage({type: 'ERROR', message: e.message})
    })
</script>
```

Preview 组件中监听：

```tsx
const handleMessage = (msg: MessageData) => {
  const { type, message } = msg.data;
  if (type === "ERROR") {
    setError(message);
  }
};

useEffect(() => {
  window.addEventListener("message", handleMessage);
  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, []);
```



# 主题切换

context 中添加 theme：

```tsx
// 定义主题类型
export type Theme = "light" | "dark";

const [theme, setTheme] = useState<Theme>("light");
```

定义 css：css 变量会在元素和它的所有子元素里生效

```scss
.light {
  --text: #444;
  --bg: #fff;
}

.dark {
  --text: #fff;
  --bg: #1a1a1a;
}
```

在需要切换的地方使用先前定义好的 css 变量：

```scss
// light and dark
background-color: var(--bg);
color: var(--text);
```

monaco editor 自带切换主题：

```tsx
<Editor
	file={files[selectedFileName]}
	onChange={debounce(onEditorChange, 500)}
	options={{ theme: `vs-${theme}` }}
/>
```



# 代码分享

在 `Context.Provider` 里设置下 `JSON.stringify(files)` 到 `location.hash`：

```tsx
useEffect(() => {
  const hash = JSON.stringify(files);
  window.location.hash = encodeURIComponent(hash); // 把 url 里不支持的字符做下转换
}, [files]);
```

读取 files 时，对 hash `decodeURIComponent` 一下，然后 `JSON.parse` 作为 files 的内容：

```tsx
// 从 URL 中获取文件信息
const getFilesFromUrl = () => {
  let files: Files;
  try {
    const hash = decodeURIComponent(window.location.hash.slice(1)); // 去掉 #
    files = JSON.parse(hash);
    return files;
  } catch (error) {
    console.error(error);
  }
};
```

用 [fflate](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ffflate) 对 hash 进行压缩：

```shell
npm install --save fflate
```

```ts
import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"

export function compress(data: string): string {
    const buffer = strToU8(data)
    const zipped = zlibSync(buffer, { level: 9 })
    const str = strFromU8(zipped, true)
    return btoa(str)
}

export function uncompress(base64: string): string {
    const binary = atob(base64)

    const buffer = strToU8(binary, true)
    const unzipped = unzlibSync(buffer)
    return strFromU8(unzipped)
}
```

`compress` 方法里，我们先调用 `fflate` 包的 `strToU8` 把字符串转为字节数组，然后 `zlibSync` 压缩，之后 `strFromU8` 转为字符串，最后用 `btoa` 将一个二进制字符串编码为 [Base64](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64) 编码的 ASCII 字符串。`uncompress` 方法相反。

```tsx
useEffect(() => {
    const hash = compress(JSON.stringify(files))
    window.location.hash = hash
}, [files])
```

```tsx
const getFilesFromUrl = () => {
  let files: Files | undefined
  try {
      const hash = uncompress(window.location.hash.slice(1))
      files = JSON.parse(hash)
  } catch (error) {
    console.error(error)
  }
  return files
}
```

使用剪贴板：

```shell
npm install --save copy-to-clipboard
```

```tsx
<ShareAltOutlined 
  style={{marginLeft: '10px'}}
  onClick={() => {
    copy(window.location.href);
    message.success('分享链接已复制。')
  }}
/>
```



# 打包下载

```shell
npm install --save jszip

npm install --save file-saver
npm install --save-dev @types/file-saver 
```

```tsx
export async function downloadFiles(files: Files) {
    const zip = new JSZip()

    Object.keys(files).forEach((name) => {
        zip.file(name, files[name].value)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, `code${Math.random().toString().slice(2, 8)}.zip`)
}
```



# Worker

vite 项目用 web worker ：

```tsx
import CompilerWorker from './compiler.worker?worker'
```

主线程：

```tsx
const compilerWorkerRef = useRef<Worker>();

useEffect(() => {
  if (!compilerWorkerRef.current) {
    compilerWorkerRef.current = new CompilerWorker();
    compilerWorkerRef.current.addEventListener("message", ({ data }) => {
      console.log("worker", data);
      if (data.type === "COMPILED_CODE") {
        setCompiledCode(data.data);
      } else {
        // console.log('error', data);
      }
    });
  }
}, []);

useEffect(
  debounce(() => {
    compilerWorkerRef.current?.postMessage(files);
  }, 500),
  [files]
);
```

Worker 线程：

```tsx
self.addEventListener("message", async ({ data }) => {
  try {
    self.postMessage({
      type: "COMPILED_CODE",
      data: compile(data),
    });
  } catch (e) {
    self.postMessage({ type: "ERROR", error: e });
  }
});
```

