const express = require("express")
const path = require("path")

const app = express()
const PORT = 8182

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '../mdist')))

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.listen(PORT, () => {console.log(`server works on ${PORT}`)})