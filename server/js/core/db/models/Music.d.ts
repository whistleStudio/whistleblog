import mongoose from "mongoose";
interface IMusic {
    title: string;
    singer: string;
    src: string;
    lyric: string;
    imgUrl: string;
    favor: number;
}
declare const Music: mongoose.Model<IMusic, {}, {}, {}, any>;
export default Music;
export { IMusic };
