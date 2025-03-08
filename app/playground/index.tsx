import React from 'react'
import ReactPlayground from './src/ReactPlayground'
import { PlaygroundProvider } from './src/ReactPlayground/PlaygroundContext'

function Background() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}

export default Background
