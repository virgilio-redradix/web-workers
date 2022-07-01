const fetchData = async () => {
  const data = await fetch('http://numbersapi.com/random/math')
  const result = await data.text()
  return result
}

onmessage = async () => {
  const result = await fetchData()
  postMessage(result)
}
