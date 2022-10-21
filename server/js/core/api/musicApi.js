"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errMap_json_1 = require("../../public/errMap.json");
const Music_1 = __importDefault(require("../db/models/Music"));
const rt = express_1.default.Router();
/* 请求歌曲列表 */
rt.get("/getMusicList", (req, res) => {
    ;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let musicList = yield Music_1.default.find({ favor: { $gt: 0 } }, "title");
            if (musicList.length >= 25) {
                musicList = [].slice.call(musicList, 0, 25);
                res.json({ err: 0, musicList: musicList.map(e => e.title) });
            }
            else
                res.json(errMap_json_1.err[2]);
        }
        catch (e) {
            console.log(e);
            res.json(errMap_json_1.err[5]);
        }
    }))();
});
rt.get("/getActMusicInfo", (req, res) => {
    let { actTitle } = req.query;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let actMusicInfo = yield Music_1.default.findOne({ title: actTitle }, "title singer src lyric imgUrl -_id");
            if (actMusicInfo)
                res.json({ err: 0, actMusicInfo });
            else
                res.json(errMap_json_1.err[1]);
        }
        catch (e) {
            console.log(e);
            res.json(errMap_json_1.err[5]);
        }
    }))();
});
exports.default = rt;
