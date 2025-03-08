import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";

// 定义EditorFile接口，用于描述编辑器中文件的基本属性
export interface EditorFile {
  name: string; // 文件名
  value: string; // 文件内容
  language: string; // 文件语言
}

// 定义Props接口，用于描述Editor组件的属性
interface Props {
  file: EditorFile; // 要编辑的文件
  onChange?: EditorProps["onChange"]; // 编辑器内容变化时的回调
  options?: editor.IStandaloneEditorConstructionOptions; // 编辑器的配置选项
}

// Editor组件，使用MonacoEditor进行代码编辑
export default function Editor(props: Props) {
  const { file, onChange, options } = props; // 解构props中的属性

  // 定义编辑器挂载后的操作
  const handleEditorMount: OnMount = (editor, monaco) => {
    // 给编辑器添加快捷键，Ctrl+J格式化代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    // 配置TypeScript语言的编译器选项，以便正确处理jsx
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve, // 保留jsx
      esModuleInterop: true, // 启用ES模块互操作性
    });

    // 创建并初始化ATA（Automatic Type Acquisition，自动类型获取）对象，用于动态添加类型定义或代码到编辑器中。
    // 参数回调函数的作用是将代码和路径传递给Monaco编辑器的 typescript 语言环境，以便动态加载额外的库或代码。
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

  // 渲染MonacoEditor组件
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
}
