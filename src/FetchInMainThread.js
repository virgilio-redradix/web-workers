import { useEffect, useState } from 'react'

export const FetchInMainThread = ({ count }) => {
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(process.env.REACT_APP_ENDPOINT)
      const result = await data.text()
      setResults(prev => [...prev, result])
    }

    for (let i = 0; i < count; i++) {
      fetchData()
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
