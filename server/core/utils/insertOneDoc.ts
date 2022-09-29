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
    cate: "2019",
    title: "海风",
    author: "哨子",
    imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E6%B5%B7%E9%A3%8E.jpg",
    txt: `你回首
    于是 整个天空
    都笑开了颜
    那会是群可爱的精灵
    乘着蓝蓝的海风
    把我推向六月明媚的你`,
    date: "2019-06"
  }

  await Poem.create(oneDoc)
  console.log(`doc ${oneDoc.title} created!`)
}