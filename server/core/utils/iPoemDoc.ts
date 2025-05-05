import mongoose from "mongoose";
import Poem from "../db/models/Poem";
import { IPoemSchema } from "../db/models/Poem";
const DBNAME = 'whistleblog'
const PORT = 27017

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

  const oneDoc: IPoemSchema = {
    cate: "2046",
    title: "燕西线",
    author: "哨子",
    imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E7%87%95%E8%A5%BF%E7%BA%BF.jpg",
    txt: `燕西线的路很长，
    道很窄，
    只能勉强承下两辆车，
    容不得你想七想八，
    也不允许你反悔掉头。
    
    单线程地向前，
    很快乐。`,
    date: "哨子 2023-03"
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  await Poem.create(oneDoc)
  console.log(`doc ${oneDoc.title} created!`)
}