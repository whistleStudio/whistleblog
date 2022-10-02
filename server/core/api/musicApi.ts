import express, {request, Request, Response} from "express";
import mongoose from "mongoose";
import {err} from "../../public/errMap.json"
import Music from "../db/models/Music";

const rt = express.Router()

/* 请求歌曲列表 */
rt.get("/getMusicList", (req: Request, res: Response) => {
  ;(async () => {
    try {
      let musicList = await Music.find({favor: {$gt: 0}}, "title")
      if (musicList.length >= 25) {
        musicList = [].slice.call(musicList, 0,25)
        res.json({err:0, musicList: musicList.map(e => e.title)})
      } else res.json(err[2])
    } catch(e){console.log(e);res.json(err[5])}
  })()
})

export default rt