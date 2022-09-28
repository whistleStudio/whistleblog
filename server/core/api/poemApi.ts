import { Request, Response } from "express";
import express from "express"
import {poemMap} from "../../public/dbMap.json"
import Poem from "../db/models/Poem";
import { IPoemSchema } from "../db/models/Poem";

const rt = express.Router();

type IPoem = Partial<IPoemSchema>

interface IMenu {
  author: string,
  list: ICate[]
}
interface ICate {
  cate: string ,
  titles: any[] | []
}

rt.get("/", (req:Request, res:Response) => {
  console.log("poem")
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
    } catch(e) {console.log(e);res.json({err:5, msg: "database err"})}
  })()

})

export default rt