import { useState } from 'react'
import './App.css'
import { Button } from '@guang-comp/react-comp-lib'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <Button
        type="default"
        onClick={() => alert(1)}
      >
        按钮二
      </Button>
    </>
  )
}

export default App
