export {}
const express = require("express")
const app = express()
const PORT = 8181

app.listen(PORT, ()=>{
  console.log(`server works on ${PORT}`)
})

