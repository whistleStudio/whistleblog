import express from "express"
import path from "path"
import "./db/connect"
import homeApi from "./api/homeApi"
import poemApi from "./api/poemApi"
import musicApi from "./api/musicApi"
import essayApi from "./api/essayApi"

const app = express() 
const PORT = 8181




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '../dist')))
app.use("/api/home", homeApi)
app.use("/api/poem", poemApi)
app.use("/api/music", musicApi)
app.use("/api/essay", essayApi)


app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.listen(PORT, ()=>{
  console.log(`server works on ${PORT}`)
})

