import express, {Request, Response} from "express";
import {err} from "../../public/errMap.json"
import Music from "../db/models/Music";

const rt = express.Router()

/* 请求歌曲列表 */
rt.get("/getMusicList", (req: Request, res: Response) => {
  ;(async () => {
    try {
      let musicList = await Music.find({favor: {$gt: 0}}, "title favor")
      if (musicList.length >= 25) {
        musicList = musicList.sort(() => Math.random() - 0.5).sort((a, b) => b.favor-a.favor)// 打乱顺序
        musicList = [].slice.call(musicList, 0,25)
        res.json({err:0, musicList: musicList.map(e => e.title)})
      } else res.json(err[2])
    } catch(e){console.log(e);res.json(err[5])}
  })()
})

/* 请求播放歌曲信息 */
interface GetAMIRequest extends Request {
  query: {
    actTitle: string
  }
}
rt.get("/getActMusicInfo", (req: GetAMIRequest, res: Response) => {
  let {actTitle} = req.query
  ;(async () => {
    try {
      let actMusicInfo = await Music.findOne({title: actTitle}, "title singer src lyric imgUrl -_id")
      if (actMusicInfo) res.json({err:0, actMusicInfo})
      else res.json(err[1])
    } catch(e){console.log(e);res.json(err[5])}
  }) ()
})

export default rt