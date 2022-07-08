import { useEffect, useState } from 'react'

export const FetchInMainThread = ({ count }) => {
  const [results, setResults] = useState([])
  const [startDate, setStartDate] = useState(0)

  useEffect(() => {
    setStartDate(Date.now())

    const fetchData = async () => {
      const data = await fetch(process.env.REACT_APP_ENDPOINT)

      const result = await data.text()

      setResults(prev => [...prev, result])
    }

    for (let i = 0; i < count; i++) {
      fetchData()
    }
  }, [count])

  useEffect(() => {
    if (results.length === count) {
      console.log(`FetchInMainThread - Total time in ms: ${Date.now() - startDate}`)
    }
  }, [results.length, count, startDate])

  return (
    <>
      <h1>Fetch data from main thread</h1>

      <ol>
        {results.map((result, index) => (
          <li key={`${index}_${result}`}>{result}</li>
        ))}
      </ol>
    </>
  )
}
