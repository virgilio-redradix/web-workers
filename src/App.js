import { useState } from 'react'

import { FetchInMainThread } from './FetchInMainThread'
import { FetchWithOneWorker } from './FetchWithOneWorker'
import { FetchWithWorkers } from './FetchWithWorkers'
import { FetchWithMaxWorkers } from './FetchWithMaxWorkers'

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
      <button onClick={() => setTest('maxWorkers')}>
        Distribute requests to the configured workers
      </button>

      {test === 'worker' ? (
        <FetchWithOneWorker count={count} />
      ) : test === 'workers' ? (
        <FetchWithWorkers count={count} />
      ) : test === 'maxWorkers' ? (
        <FetchWithMaxWorkers count={count} />
      ) : (
        <FetchInMainThread count={count} />
      )}
    </div>
  )
}

export default App
