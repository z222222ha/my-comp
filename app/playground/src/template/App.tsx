import { useState } from 'react'
import './App.css'
import { Button, Calendar } from '@2haha/comp'
import dayjs from 'dayjs'

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
      <Calendar
        value={dayjs('2024-6-18')}
        // renderCell={(date) => {
        //   return <div style={{ background: "yellowgreen" }}>{date.format("YYYY-MM-DD")}</div>;
        // }}
        renderCellContent={(date) => {
          return <div style={{ background: 'yellowgreen' }}>{date.format('YYYY-MM-DD')}</div>
        }}
        locale="en-US"
        onChange={(date) => {
          console.log('click:', date.format('YYYY-MM-DD'))
        }}
      />
    </>
  )
}

export default App
