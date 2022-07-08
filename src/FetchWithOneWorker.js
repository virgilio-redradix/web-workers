import { useEffect, useState } from 'react'

export const FetchWithOneWorker = ({ count }) => {
  const [results, setResults] = useState([])

  useEffect(() => {
    const worker = new Worker('./worker.js')

    worker.onmessage = event => {
      setResults(prev => [...prev, event.data])
    }

    for (let i = 0; i < count; i++) {
      worker.postMessage(process.env.REACT_APP_ENDPOINT)
    }
  }, [count])

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
