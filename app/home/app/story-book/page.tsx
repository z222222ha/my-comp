'use client'
import React, { useState, useEffect } from 'react'

export default function StoryBook() {
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    // Get header height after component mounts
    const height = document.querySelector('header')?.offsetHeight || 0
    setHeaderHeight(height)
  }, [])

  return (
    <div>
      <iframe
        src="http://localhost:6006"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
        style={{
          width: '100%',
          height: `calc(100vh - ${headerHeight}px)`,
          border: 0,
          position: 'absolute',
          left: 0,
        }}
      ></iframe>
    </div>
  )
}
