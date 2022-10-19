import express, {Request, Response} from "express"
import Essay from "../db/models/Essay"
import {err} from "../../public/errMap.json"

const rt = express.Router()
const artCate = {
  JavaScript: `rgb(235, 177, 71)`,
  NodeJs: `rgb(124, 194, 145)`,
  Vue: `rgb(182, 218, 126)`,
  TypeScript: `rgb(123, 179, 211)`,
  Others: `rgb(240, 197, 212)`
}


/* 获取目录 */
rt.get("/getCate", (req: Request, res: Response) => {
  res.json({err:0, cate: artCate})
})


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
  console.log(req.query)
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

interface kwSearchRequest extends Request {
  query: {
    kw: string
  }
}
/* 关键词搜索 */
rt.get("/kwSearch", (req: kwSearchRequest, res: Response) => {
  let {kw} = req.query
  // 模糊查询
  let regStr = kw.trim().split("").join(".*")
  let reg = new RegExp(".*"+regStr+".*", "i")
  console.log(reg)
  let filter = {
    $or: [{title: {$regex: reg}}, {sum:  {$regex: reg}}]
  }
  ;(async () => {
    try {
    let searchList = await Essay.find(filter, "-_id")
      console.log("sL", searchList.length) 
      res.json({err:0, searchList})
    } catch(e){res.json(err[5])}
  })()
})

export default rt
