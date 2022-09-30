import mongoose from "mongoose";
import Music, {IMusic} from "../db/models/Music";

const DBNAME = 'whistleblog'
const PORT = 27017

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@localhost:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

  const musicDoc: Partial<IMusic> = {
    title: "爱情的枪",
    singer: "左小祖咒",
    imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E7%88%B1%E6%83%85%E7%9A%84%E6%9E%AA/%E7%88%B1%E6%83%85%E7%9A%84%E6%9E%AA.jpg",
    src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E7%88%B1%E6%83%85%E7%9A%84%E6%9E%AA/%E5%B7%A6%E5%B0%8F%E7%A5%96%E5%92%92%20-%20%E7%88%B1%E6%83%85%E7%9A%84%E6%9E%AA.mp3",
    lyric: `
借我那把枪吧
你说你用不上那玩意去杀谁
莫非有人把情爱都已看厌
借我那把枪吧 或者借我五毛钱
我要搭上北方的快车 头也不回
杀了诚实吧 或者杀了爱情吧
在北风吹起的时候加入我们的队伍
杀了真理吧 或者杀了谎言吧
好在北风吹起的狂野中
唱着激昂的进行曲
借我那把枪吧
我又没说用不上那玩意
莫非有人给你机会 让你感到自卑
借我那把枪吧 或者借我五毛钱
生就属于北方的我将一去不回
如果有天我再归来
请不要为我感到伤悲
雁子会捎来讯息
当春风吹拂着新绿
那是因为我想你
跟我去北方吧 那里正下着雪
就让我滚热的灵魂在冰霜上撒个野
跟我去北方吧 逃离爱情的肤浅
南方的江山太娇媚
腐蚀了我的热血
杀了诚实吧 或者杀了爱情吧
爱情来的时候
你就会背叛你的诚实主义
杀了真理吧 或者杀了谎言吧
千万不要让他们站在敌对的那一边
借我那把枪吧
我又没说用不上那玩意儿
当真理站在谎言的那边
我就解决我自己
借我那把枪吧 或者借我五毛钱
南方的江山太娇媚
容易遮上我的眼
如果有天我再回来
请不要为我感到伤悲
雁子会捎来讯息
当春风吹拂着新绿
那是因为我想你       
    `,
  }
  await Music.create(musicDoc)

  console.log(`doc ${musicDoc.title} created!`)
}