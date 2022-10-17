import express, {Request, Response} from "express"
import Essay from "../db/models/Essay"
import {err} from "../../public/errMap.json"
import e from "express"

const rt = express.Router()

interface pageListRequset extends Request {
  query:{
    cate: string
    pageSkip: string
    pageNum: string
  }
}
/* 获取文章 */
rt.get("/pageList", (req: pageListRequset, res: Response) => {
  const cate = req.query.cate
  const pageNum: number = parseInt(req.query.pageNum)
  const pageSkip: number = parseInt(req.query.pageSkip)
  ;(async () => {
    try {
      if (cate==="All") {
        var essayList = await Essay.find({}, "-_id").skip(pageSkip).limit(pageNum)
      } else var essayList = await Essay.find({tag: cate}, "-_id").skip(pageSkip).limit(pageNum)
      if (essayList.length >= 0) {
        res.json({err:0, essayList})
      } else res.json(err[1])
    } catch(e){console.log(e);res.json(err[5])}
    
  })()
})



export default rt
