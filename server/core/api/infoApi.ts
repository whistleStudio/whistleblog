import express, {Request, Response} from "express";
import Info from "../db/models/Info";

const rt = express.Router()
/* 请求信息 */
rt.get("/getInfo", (req: Request, res: Response) => {
  let {k1, k2} = req.query;
  (async () => {
    try {
      let info = await Info.findOne({k1, k2});
      if (info) {
        res.json({err: 0, data: info});
      } else {
        res.json({err: 1, msg: "No information found"});
      }
    } catch (e) {
      console.log(e);
      res.json({err: 5, msg: "Internal server error"});
    }
  })();
})    

export default rt;
