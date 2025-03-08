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
