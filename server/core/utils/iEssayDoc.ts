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
    tag: "JavaScript",
    title: "javascript关于原型对象重写后的问题",
    sum: "实际上, js中的每一个对象都有`__proto__`属性, 该属性会指向其构造函数的原型对象",
    src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/essay/javascript/javascript%E5%85%B3%E4%BA%8E%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1%E9%87%8D%E5%86%99%E5%90%8E%E7%9A%84%E9%97%AE%E9%A2%98/javascript%E5%85%B3%E4%BA%8E%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1%E9%87%8D%E5%86%99%E5%90%8E%E7%9A%84%E9%97%AE%E9%A2%98.html",
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