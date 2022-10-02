import mongoose from "mongoose";
import Music, {IMusic} from "../db/models/Music";

const DBNAME = 'whistleblog'
const PORT = 27017

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@localhost:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

  const musicDoc: Partial<IMusic> = {
    title: "泡沫",
    singer: "花儿乐队",
    imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%B3%A1%E6%B2%AB/%E6%B3%A1%E6%B2%AB.jpg",
    src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%B3%A1%E6%B2%AB/%E8%8A%B1%E5%84%BF%E4%B9%90%E9%98%9F%20-%20%E6%B3%A1%E6%B2%AB.mp3",
    lyric: `
    我点燃那盏灯火
向远方凝望着
空气都打开了
记忆随风散落
幻想美好的时刻
没有完美结果
红色夕阳下落
黯淡的云朵
憧憬像飘浮的泡沫
光映出灿烂的颜色
可却没有照到我
全世界的雨打到我
我的梦已经湿透了
瞬间被淹没

我点燃那盏灯火
向远方凝望着
空气都打开了
记忆随风散落
幻想美好的时刻
没有完美结果
红色夕阳下落
黯淡的云朵
憧憬像飘浮的泡沫
光映出灿烂的颜色
可却没有照到我
全世界的雨打到我
我的梦已经湿透了
瞬间被淹没          
    `,
  }
  await Music.create(musicDoc)

  console.log(`doc ${musicDoc.title} created!`)
}