import { useContext, useEffect, useRef, useState } from 'react'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import { compile } from './compiler'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../ReactPlayground/file'
import MessageTip from '../Message'

import CompilerWorker from './compiler.worker?worker'
import { debounce } from 'lodash-es'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const [compiledCode, setCompiledCode] = useState('')
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())
  const [error, setError] = useState('')

  // use worker
  const compilerWorkerRef = useRef<Worker>()

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker()
      compilerWorkerRef.current.addEventListener('message', ({ data }) => {
        console.log('worker', data)
        if (data.type === 'COMPILED_CODE') {
          setCompiledCode(data.data)
        } else {
          // console.log('error', data);
        }
      })
    }
  }, [])

  useEffect(
    debounce(() => {
      compilerWorkerRef.current?.postMessage(files)
    }, 500),
    [files]
  )

  // normal compile
  // useEffect(() => {
  //   const res = compile(files)
  //   setCompiledCode(res)
  // }, [files])

  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  function getIframeUrl() {
    const res = iframeRaw
      .replace('<script type="importmap"></script>', `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`)
      .replace('<script type="module" id="appSrc"></script>', `<script type="module" id="appSrc">${compiledCode}</script>`)
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  return (
    <div style={{ height: '100%' }}>
      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
      <MessageTip
        type="error"
        content={error}
      />
      {/* <MessageTip type="warn" content={new Error().stack!.toString()} /> */}
    </div>
  )
}
