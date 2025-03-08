import { useContext } from 'react'
import Editor from './Editor'
import FileList from './FileList'
import Styles from './index.module.scss'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import { debounce } from 'lodash-es'

// const test = {
//   name: "guang.tsx",
//   value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
//   language: "typescript",
// };

export default function CodeEditor() {
  const { files, setFiles, selectedFileName, theme } = useContext(PlaygroundContext)

  const file = files[selectedFileName]
  function onEditorChange(value?: string) {
    console.log(value)
    files[file.name].value = value!
    setFiles({ ...files })
  }

  return (
    <div className={Styles.container}>
      <FileList />
      <Editor
        file={files[selectedFileName]}
        onChange={debounce(onEditorChange, 500)}
        options={{ theme: `vs-${theme}` }}
      />
    </div>
  )
}
