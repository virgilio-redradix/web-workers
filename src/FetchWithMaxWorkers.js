import { useEffect, useState } from 'react'

export const FetchWithMaxWorkers = ({ count }) => {
  const [results, setResults] = useState([])
  const [startDate, setStartDate] = useState(0)

  const workersGroup = (numberOfWorkers, requests) => {
    for (let i = 0; i < numberOfWorkers; i++) {
      const worker = new Worker('./worker.js')

      let counter = 0
      worker.onmessage = event => {
        counter++

        setResults(prev => [...prev, event.data])

        if (counter === requests) {
          worker.terminate()
        }
      }

      for (let j = 0; j < requests; j++) {
        worker.postMessage(process.env.REACT_APP_ENDPOINT)
      }
    }
  }

  useEffect(() => {
    setStartDate(Date.now())

    const maxWorkers = parseInt(process.env.REACT_APP_MAX_WORKERS, 10)

    const requestsToReachCount = Math.ceil(count / maxWorkers)

    const requestsNotToExceedCount = requestsToReachCount - 1

    const workersMakingMaxRequests =
      maxWorkers - (maxWorkers * Math.ceil(count / maxWorkers) - count)

    const workersMakingLessRequests = maxWorkers - workersMakingMaxRequests

    workersGroup(workersMakingMaxRequests, requestsToReachCount)
    workersGroup(workersMakingLessRequests, requestsNotToExceedCount)
  }, [count])

  useEffect(() => {
    if (results.length === count) {
      console.log(
        `FetchWithMaxWorkers - Total time in ms: ${Date.now() - startDate}`,
      )
    }
  }, [results.length, count, startDate])

  return (
    <>
      <h1>Fetch data distributing requests to the configured workers</h1>

      <ol>
        {results.map((result, index) => (
          <li key={`${index}_${result}`}>{result}</li>
        ))}
      </ol>
    </>
  )
}
