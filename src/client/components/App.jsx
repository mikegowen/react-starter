import React, { useEffect, useState } from "react"
import axios from "axios"
import "../styles/App.css"

function App() {
  const [message, setMessage] = useState([])

  useEffect(async () => {
    const response = await axios.get("http://localhost:3000/")
    setMessage(response.data.message)
  }, [])

  return (
    <div className="App">
      {message}
    </div>
  )
}

export default App
