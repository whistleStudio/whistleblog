import mongoose from "mongoose";
interface IPoemSchema {
    cate: string;
    title: string;
    author: string;
    imgUrl: string;
    txt: string;
    date: string;
}
declare const Poem: mongoose.Model<IPoemSchema, {}, {}, {}, mongoose.Schema<IPoemSchema, mongoose.Model<IPoemSchema, any, any, any, any>, {}, {}, {}, {}, "type", IPoemSchema>>;
export default Poem;
export { IPoemSchema };
