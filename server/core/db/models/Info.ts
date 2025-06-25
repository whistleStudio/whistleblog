import mongoose from "mongoose";

interface IInfoSchema {
  k1: string,
  k2: string,
  v1: string,
  v2: object,
}

const infoSchema = new mongoose.Schema<IInfoSchema>({
  k1: String,
  k2: String,
  v1: String,
  v2: Object,
})

const Info = mongoose.model<IInfoSchema>("info", infoSchema);

export default Info;
export { IInfoSchema };