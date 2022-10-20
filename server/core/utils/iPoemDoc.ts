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
    cate: "2018",
    title: "取经天路长",
    author: "哨子",
    // imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E5%A5%B3%E5%AD%90.png",
    txt: `温度五六七
    红色列车终点下起雨
    银杏 湿漉了傍晚站台
    信号灯 灼烧了等待徘徊
    书袋中了了的几片面包
    和着文字的碎屑
    
    昨日的火锅就像是一场梦
    今天的我又饥肠辘辘
    光影晕染着天空
    脚步被拉扯很长
    翼翼地
    漫过街巷`,
    date: "2018-03"
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
  await Poem.create(oneDoc)
  console.log(`doc ${oneDoc.title} created!`)
}