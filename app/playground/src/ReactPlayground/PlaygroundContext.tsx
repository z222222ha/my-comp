import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { compressHash, decompressHash, fileName2Language } from './utils'
import { initFiles } from './file'

// 定义文件对象的接口
export interface File {
  name: string
  value: string
  language: string
}

// 定义文件集合的接口
export interface Files {
  [key: string]: File
}

// 定义主题类型
export type Theme = 'light' | 'dark'

// 定义 Playground 上下文接口
export interface PlaygroundContext {
  files: Files // 所有文件集合
  selectedFileName: string // 当前选中的文件名
  theme: Theme // 主题
  setTheme: (theme: Theme) => void // 设置主题
  setSelectedFileName: (fileName: string) => void // 设置选中的文件名
  setFiles: (files: Files) => void // 设置文件集合
  addFile: (fileName: string) => void // 添加文件
  removeFile: (fileName: string) => void // 删除文件
  updateFileName: (oldFieldName: string, newFieldName: string) => void // 更新文件名
}

// 创建 Playground 上下文
export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext)

// 从 URL 中获取文件信息
const getFilesFromUrl = () => {
  let files: Files
  try {
    // const hash = decodeURIComponent(window.location.hash.slice(1)); // 去掉 #
    if (!window.location.hash) {
      return
    }
    const hash = decompressHash(window.location.hash.slice(1))
    files = JSON.parse(hash)
    return files
  } catch (error) {
    console.error(error)
  }
}

// Provider 组件
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props

  // 使用钩子管理状态
  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles)
  const [selectedFileName, setSelectedFileName] = useState('App.tsx')
  const [theme, setTheme] = useState<Theme>('light')

  // 添加文件方法
  const addFile = (fileName: string) => {
    setFiles((prev) => {
      return {
        ...prev,
        [fileName]: {
          name: fileName,
          value: '',
          language: fileName2Language(fileName),
        },
      }
    })
  }

  // 删除文件方法
  const removeFile = (fileName: string) => {
    setFiles((prev) => {
      const newFiles = { ...prev }
      delete newFiles[fileName]
      return newFiles
    })
  }

  // 更新文件名方法
  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    const { [oldFieldName]: file, ...rest } = files
    const newFile = { ...file, name: newFieldName }
    setFiles({ ...rest, [newFieldName]: newFile })
  }

  // 分享 hash url
  useEffect(() => {
    // const hash = JSON.stringify(files);
    // window.location.hash = encodeURIComponent(hash); // 把 url 里不支持的字符做下转换
    const hash = compressHash(JSON.stringify(files))
    window.location.hash = hash
  }, [files])

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
  )
}
