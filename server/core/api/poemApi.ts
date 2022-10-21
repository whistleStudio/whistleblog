import express, { Request, Response } from "express";
import Poem from "../db/models/Poem";
import {poemMap} from "../../public/dbMap.json"
import {err} from "../../public/errMap.json"

const rt = express.Router();


interface IMenu {
  author: string
  list: ICate[]
}
interface ICate {
  cate: string 
  titles: any[] | []
}

rt.get("/", (req:Request, res:Response) => {
  // console.log("poem")
  res.json({err: 0})
})
/* 请求目录 */
rt.get("/getMenu", (req:Request, res:Response) => {
  ;(async ()=>{
    let menuList: IMenu[] = []
    try {
      for (let v of Object.values(poemMap)) {
        let cateList: ICate[] = []
        for (let c of v.cate) {
          let titleList = await Poem.find({author: v.author, cate: c}, "title")
          cateList.push({cate: c, titles: titleList.map(e => e.title)})
        }
        menuList.push({author: v.author, list: cateList})
      }
      res.json({err:0, menuList})
    } catch(e) {console.log(e);res.json(err[5])}
  })()
  /* 请求单例 */
  interface GetPoemRequest extends Request {
    query: {
      author: string
      title: string
    }
  }
  rt.get("/getPoem", (req:GetPoemRequest, res:Response) => {
    let {author, title} = req.query
    ;(async () => {
      try {
        let q = await Poem.findOne({author, title}, "author title txt imgUrl color date")
        if (q) {
          res.json({err:0, poemInfo: q})
        } else res.json(err[1])
      } catch(e){console.log(e); res.json(err[5])}
    })()
  })
})

export default rt