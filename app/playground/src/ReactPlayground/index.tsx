import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import Header from '../components/Header'
import CodeEditor from '../components/CodeEditor'
import Preview from '../components/Preview'

import Styles from './index.module.scss'
import { PlaygroundContext } from './PlaygroundContext'
import { useContext } from 'react'

export default function ReactPlayground() {
  const { theme } = useContext(PlaygroundContext)

  return (
    <div
      className={Styles[theme]}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}
    >
      {<Header />}
      {/* defaultSizes：左右面板的比例  */}
      <div style={{ flex: 1 }}>
        <Allotment defaultSizes={[1, 1]}>
          <Allotment.Pane minSize={500}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  )
}
