import express from "express"
import "./db/connect"
import poemApi from "./api/poemApi"
import musicApi from "./api/musicApi"

const app = express() 
const PORT = 8181

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/poem", poemApi)
app.use("/api/music", musicApi)


app.listen(PORT, ()=>{
  console.log(`server works on ${PORT}`)
})

