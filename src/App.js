import { useState } from 'react'

import { FetchInMainThread } from './FetchInMainThread'
import { FetchWithOneWorker } from './FetchWithOneWorker'
import { FetchWithWorkers } from './FetchWithWorkers'

function App() {
  const [count, setCount] = useState(50)
  const [test, setTest] = useState('workers')

  return (
    <div className='App'>
      <input
        value={count}
        onChange={event => {
          setCount(event.target.value)
        }}
      />

      <button onClick={() => setTest('main')}>Fetch data in main thread</button>
      <button onClick={() => setTest('worker')}>
        Create one worker to fetch data
      </button>
      <button onClick={() => setTest('workers')}>
        Create one worker for each API call
      </button>

      {test === 'worker' ? (
        <FetchWithOneWorker count={count} />
      ) : test === 'workers' ? (
        <FetchWithWorkers count={count} />
      ) : (
        <FetchInMainThread count={count} />
      )}
    </div>
  )
}

export default App
