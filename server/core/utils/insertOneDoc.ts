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
    cate: "2017",
    title: "札记（一）",
    author: "哨子",
    // imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E8%88%9E.jpg",
    txt: `那位优雅的女士
    就在我生病的前几天
    消失了
    兴许她是换了份工作
    抑或是和我碰到了同样的麻烦
    八点
    我仍守候在那里
    等她出现
    揣着复杂的心理
    那段时间
    我总觉得
    用英文gorgeous来形容她
    再贴切不过
    
    几个月后
    我换了份工作
    每天早上
    依然会路过那里
    想起的时候
    就张望一下
    却再也没见过她
    想不到更适合的理由
    也许
    是结婚了吧
    管它呢`,
    date: "2017-03-03"
  }

  await Poem.create(oneDoc)
  console.log(`doc ${oneDoc.title} created!`)
}