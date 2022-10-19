/* 首页数据分发 */
import express, {Request, Response} from "express";
import {err} from "../../public/errMap.json"

const rt = express.Router()
const homeData = {
  poem: {
    title: "海风",
    content: `你回首
    于是 整个天空
    都笑开了颜
    那会是群可爱的精灵
    乘着蓝蓝的海风
    把我推向六月明媚的你`
  },
  music: {
    title: "舟宿渡夏目漱石",
    src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E8%88%9F%E5%AE%BF%E6%B8%A1%E5%A4%8F%E7%9B%AE%E6%BC%B1%E7%9F%B3/%E8%BF%98%E6%BD%AE%20-%20%E8%88%9F%E5%AE%BF%E6%B8%A1%E5%A4%8F%E7%9B%AE%E6%BC%B1%E7%9F%B3.mp3"
  },
  essay: {
    title: "flex & grid Layout",
    content: "xxxxxx"
  }
}

rt.get("/getHomeData", (req: Request, res: Response) => {
  res.json({err:0, homeData})
})

export default rt