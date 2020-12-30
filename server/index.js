const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get("/", (req, res) => {
  res.send({ message: "Success!" })
})
