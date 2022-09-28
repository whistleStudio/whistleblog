import mongoose from "mongoose";

interface  IPoemSchema {
  cate: string,
  title: string,
  author: string,
  imgUrl?: string,
  txt: string,
  date: string,
  color?: number  
}

const Schema = mongoose.Schema
const poemSchema = new Schema<IPoemSchema>({
  cate: String,
  title: String,
  author: String,
  imgUrl: {type: String, default: ""},
  txt: String,
  date: String,
  color: {type: Number, default: 1}
})
const Poem = mongoose.model("poem", poemSchema)

export default Poem
export {IPoemSchema}