import { useEffect, useState } from 'react'

export const FetchWithOneWorker = ({ count }) => {
  const [results, setResults] = useState([])
  const [startDate, setStartDate] = useState(0)
  const [worker, setWorker] = useState()

  useEffect(() => {
    setStartDate(Date.now())

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
      console.log(
        `FetchWithOneWorker - Total time in ms: ${Date.now() - startDate}`,
      )

      worker.terminate()
    }
  }, [results.length, count, startDate, worker])

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
