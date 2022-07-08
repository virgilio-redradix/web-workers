import { useEffect, useState } from 'react'

export const FetchWithWorkers = ({ count }) => {
  const [results, setResults] = useState([])
  const [startDate, setStartDate] = useState(0)

  useEffect(() => {
    setStartDate(Date.now())

    for (let i = 0; i < count; i++) {
      const worker = new Worker('./worker.js')

      worker.onmessage = event => {
        setResults(prev => [...prev, event.data])

        worker.terminate()
      }

      worker.postMessage(process.env.REACT_APP_ENDPOINT)
    }
  }, [count])

  useEffect(() => {
    if (results.length === count) {
      console.log(
        `FetchWithWorkers - Total time in ms: ${Date.now() - startDate}`,
      )
    }
  }, [results.length, count, startDate])

  return (
    <>
      <h1>Fetch data with a worker per request</h1>

      <ol>
        {results.map((result, index) => (
          <li key={`${index}_${result}`}>{result}</li>
        ))}
      </ol>
    </>
  )
}
