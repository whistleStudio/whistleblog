import mongoose from "mongoose";

interface IMusic {
  title: string,
  singer: string,
  src: string,
  lyric: string,
  imgUrl: string,
  favor: number
}

const musicSchema = new mongoose.Schema<IMusic>({
  title: String,
  singer: String,
  src: String,
  lyric: String,
  imgUrl: String,
  favor: {type: Number, default: 1}
})

const Music = mongoose.model<IMusic>("music", musicSchema)

export default Music
export {IMusic}