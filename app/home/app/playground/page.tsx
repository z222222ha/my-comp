'use client'
import React, { useState, useEffect } from 'react'

export default function Playground() {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    // Get header height after component mounts
    // const height = document.querySelector('header')?.offsetHeight || 0
    // setHeaderHeight(height)
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
