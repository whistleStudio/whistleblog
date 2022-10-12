import express, {Request, Response} from "express"
import Essay from "../db/models/Essay"
import {err} from "../../public/errMap.json"
import e from "express"

const rt = express.Router()

interface pageListRequset extends Request {
  query:{
    pageSkip: string
    pageNum: string
  }
}

rt.get("/pageList", (req: pageListRequset, res: Response) => {
  const pageNum: number = parseInt(req.query.pageNum)
  const pageSkip: number = parseInt(req.query.pageSkip)
  ;(async () => {
    try {
      let essayList = await Essay.find({}, "-_id").skip(pageSkip).limit(pageNum)
      if (essayList.length >= 0) {
        res.json({err:0, essayList})
      } else res.json(err[1])
    } catch(e){console.log(e);res.json(err[5])}
    
  })()
  
})

export default rt
