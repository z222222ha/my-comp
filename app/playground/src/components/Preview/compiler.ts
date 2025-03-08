// 导入Babel的transform函数，用于代码的转换
import { transform } from "@babel/standalone";
import { Files, File } from "../../ReactPlayground/PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../ReactPlayground/file";
// 导入PluginObj类型，用于定义Babel插件
import { PluginObj } from "@babel/core";

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

/**
 * 编译所有文件，返回入口文件的转换结果
 * @param files 所有文件的集合
 * @returns 入口文件的转换结果
 */
export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
