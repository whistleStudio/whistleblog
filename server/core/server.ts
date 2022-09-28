import express from "express"
import poemApi from "./api/poemApi"
import "./db/connect"
const app = express()
const PORT = 8181

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/poem", poemApi)


app.listen(PORT, ()=>{
  console.log(`server works on ${PORT}`)
})

