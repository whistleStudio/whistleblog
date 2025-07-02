import express, {Request, Response} from "express"
import Essay from "../db/models/Essay"
import {err} from "../../public/errMap.json"

const rt = express.Router()
const artCate = {
  App: `rgb(123, 179, 211)`,
  JavaScript: `rgb(235, 177, 71)`,
  NodeJs: `rgb(124, 194, 145)`,
  Vue: `rgb(182, 218, 126)`,
  Flutter: `rgb(83, 95, 150)`,
  叠梦: `rgb(255, 241, 153)`,
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
/* 获取文章列表 */
rt.get("/pageList", (req: pageListRequset, res: Response) => {
  const cate = req.query.cate
  const pageNum: number = parseInt(req.query.pageNum)
  const pageSkip: number = parseInt(req.query.pageSkip)
  // console.log(req.query)
  ;(async () => {
    try {
      if (cate==="All") {
        var essayList = await Essay.find({}).sort({ genDate: -1 }).skip(pageSkip).limit(pageNum)
      } else var essayList = await Essay.find({tag: cate}).sort({ genDate: -1 }).skip(pageSkip).limit(pageNum)
      if (essayList.length >= 0) {
        res.json({err:0, essayList})
      } else res.json(err[1])
    } catch(e){console.log(e);res.json(err[5])}
    
  })()
})

/* 获取单个文章 */
rt.get("/one", (req: Request, res: Response) => {
  const id = req.query.id as string
  if (!id) return res.json(err[2])
  ;(async () => {
    try {
      let essay = await Essay.findOne({_id: id})
      if (essay) {  
        res.json({err:0, essay})
      } else res.json(err[3])
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
      // console.log("sL", searchList.length) 
      res.json({err:0, searchList})
    } catch(e){res.json(err[5])}
  })()
})

export default rt
