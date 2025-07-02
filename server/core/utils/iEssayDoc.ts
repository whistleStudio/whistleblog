import mongoose from "mongoose";
import Essay, {IEssaySchema} from "../db/models/Essay";
const DBNAME = 'whistleblog'
const PORT = 27017

// /* -batch test-- */
// const tagArr = ["Vue", "NodeJs", "JavaScript", "TypeScript"]
// const titleArr = ["微信小程序学习", "flex & grid Layout"]
// const srcArr = [
//   "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/essay/test/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%AD%A6%E4%B9%A0/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%AD%A6%E4%B9%A0.html",
//   "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/essay/test/flex%20%26%20grid%20Layout/flex%20%26%20grid%20Layout.html"
// ]
// const sum = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// const count = 100
// /* --- */
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
  console.log(`db:${DBNAME} connected on port:${PORT}`)

  const oneDoc:IEssaySchema = {
    tag: "App",
    title: "阿瓜物联使用文档",
    sum: "支持本地和远程服务端的可视化物联网调试展演工具",
    src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/essay/App/aguato-docs/index.html",
    genDate: new Date()
  }


  await Essay.create(oneDoc)
  console.log(`doc ${oneDoc.title} created!`)

  /*--- batch test ---*/
  // for (let v of Array(100)) {
  //   const tagIdx = Math.floor(Math.random()*tagArr.length)
  //   const titleIdx = Math.floor(Math.random()*srcArr.length)
  //   const oneDoc: IEssaySchema = {
  //     tag: tagArr[tagIdx],
  //     title: titleArr[titleIdx],
  //     sum,
  //     src: srcArr[titleIdx],
  //     genDate: new Date()
  //   }
  //   await Essay.create(oneDoc)
  // }
  // console.log(`${count} docs created!`)
  /* ------------- */
}