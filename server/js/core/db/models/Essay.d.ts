import mongoose from "mongoose";
interface IEssaySchema {
    tag: string;
    title: string;
    sum: string;
    src: string;
    genDate: Date;
}
declare const Essay: mongoose.Model<IEssaySchema, {}, {}, {}, any>;
export default Essay;
export { IEssaySchema };
