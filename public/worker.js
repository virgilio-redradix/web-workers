const fetchData = async endpoint => {
  const data = await fetch(endpoint)
  const result = await data.text()
  return result
}

onmessage = async event => {
  const result = await fetchData(event.data)
  postMessage(result)
}
