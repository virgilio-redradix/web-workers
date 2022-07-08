import { useEffect, useState } from 'react'

export const FetchWithOneWorker = ({ count }) => {
  const [results, setResults] = useState([])
  const [worker, setWorker] = useState()

  useEffect(() => {
    const worker = new Worker('./worker.js')

    worker.onmessage = event => {
      setResults(prev => [...prev, event.data])
    }

    setWorker(worker)

    for (let i = 0; i < count; i++) {
      worker.postMessage(process.env.REACT_APP_ENDPOINT)
    }
  }, [count])

  useEffect(() => {
    if (results.length === count) {
      worker.terminate()
    }
  }, [results.length, count, worker])

  return (
    <>
      <h1>Fetch data with one worker</h1>

      <ol>
        {results.map((result, index) => (
          <li key={`${index}_${result}`}>{result}</li>
        ))}
      </ol>
    </>
  )
}
