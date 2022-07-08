import { useEffect, useState } from 'react'

export const FetchWithWorkers = ({ count }) => {
  const [results, setResults] = useState([])

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      const worker = new Worker('./worker.js')

      worker.onmessage = event => {
        setResults(prev => [...prev, event.data])
      }

      worker.postMessage(process.env.REACT_APP_ENDPOINT)
    }
  }, [count])

  return (
    <ol>
      {results.map((result, index) => (
        <li key={`${index}_${result}`}>{result}</li>
      ))}
    </ol>
  )
}
