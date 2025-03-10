'use client'
import React, { useState, useEffect } from 'react'

export default function Playground() {
  // 进入该页面后，将滚动条向下滚动一个 header 高度的距离
  useEffect(() => {
    const header = document.querySelector('header')
    if (header) {
      window.scrollTo(0, header.offsetHeight)
    }
  }, [])

  return (
    <iframe
      id="pg"
      src="http://localhost:5173/"
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
      allowFullScreen
      aria-hidden="false"
      tabIndex={0}
      style={{
        width: '100%',
        height: `100vh`,
        border: 0,
        position: 'absolute',
        left: 0,
      }}
    ></iframe>
  )
}
