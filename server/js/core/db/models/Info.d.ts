import mongoose from "mongoose";
interface IInfoSchema {
    k1: string;
    k2: string;
    v1: string;
    v2: object;
}
declare const Info: mongoose.Model<IInfoSchema, {}, {}, {}, any>;
export default Info;
export { IInfoSchema };
