import mongoose from "mongoose";

interface IEssaySchema {
  tag: string,
  title: string,
  sum: string,
  src: string,
  genDate: Date
}

const essaySchema = new mongoose.Schema<IEssaySchema>({
  tag: String,
  title: String,
  sum: String,
  src: String,
  genDate: Date
})

const Essay = mongoose.model<IEssaySchema>("essay", essaySchema)

export default Essay
export {IEssaySchema}