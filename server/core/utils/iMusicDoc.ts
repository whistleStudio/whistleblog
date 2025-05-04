import mongoose from "mongoose";
import Music, {IMusic} from "../db/models/Music";

const DBNAME = 'whistleblog'
const PORT = 27017

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

  const musicDoc: Partial<IMusic> = {
    title: "晨钟暮鼓",
    singer: "白百EndlessWhite",
    imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93/%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93.jpg",
    src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93/%E7%99%BD%E7%99%BEEndlessWhite%20-%20%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93.m4a",
    lyric: `
等时间埋没
你透过他的眼睛
当所有结束一切
都将恢复拷贝的过程
这世界定论无数
你无法替我走过
所谓是好是坏
都需要我一个人来挥舞大旗
等时间埋没
你透过他的眼睛
当所有结束一切
都将恢复拷贝的过程
这世界定论无数
你无法替我走过
所谓是好是坏
都需要我一个人来挥舞大旗      
    `,
  }
  await Music.create(musicDoc)

  console.log(`doc ${musicDoc.title} created!`)
}