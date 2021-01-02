import React, { useState, useEffect } from "react"
import "../styles/App.css"

function App() {
  const [data, setData] = useState("")

  useEffect(() => {
    callApi()
      .then(response => {
        setData(response.message)
      })
  })

  const callApi = async () => {
    let response = await fetch("http://localhost:3000/")
    response = await response.json()
    return response
  }

  return (
    <div className="App">
      {data}
    </div>
  )
}

export default App
