import mongoose from "mongoose";
import Poem from "../db/models/Poem";
import { IPoemSchema } from "../db/models/Poem";
const DBNAME = 'whistleblog'
const PORT = 27017

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@localhost:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

  const oneDoc: IPoemSchema = {
    cate: "0w0",
    title: "又",
    author: "他界",
    // imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/%E4%BB%96%E7%95%8C/%E9%9B%B7%E9%9B%A8.jpg",
    txt: `想你的时候山不说话，
    旧车厢里盛满了枯萎的铁皮。
    路往离你更远的地方去了，
    轰鸣声响起的时候，
    正好开出一朵生锈的花。
    
    这注定是一趟慢条斯里的远程
    轨道冗长 像一个昏昏欲睡的故事
    像午后懒困的盹
    而远处的湖川也缄默
    大鱼亲吻它的涟漪
    
    东南方有湿热的云 绵密的雨
    糯软的糕点 呢喃的歌
    有恰如其分的浪漫
    无你
    
    路途更远的时候
    你的名字就呼之欲出
    从胸膛跑出来，躲在我的鼻息里
    我离你而去
    再为你而来
    这正是离别的意义`,
    date: "你 2017-04"
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  await Poem.create(oneDoc)
  console.log(`doc ${oneDoc.title} created!`)
}