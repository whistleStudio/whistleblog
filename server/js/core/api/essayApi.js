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
const Essay_1 = __importDefault(require("../db/models/Essay"));
const errMap_json_1 = require("../../public/errMap.json");
const rt = express_1.default.Router();
const artCate = {
    JavaScript: `rgb(235, 177, 71)`,
    NodeJs: `rgb(124, 194, 145)`,
    Vue: `rgb(182, 218, 126)`,
    TypeScript: `rgb(123, 179, 211)`,
    Flutter: `rgb(83, 95, 150)`,
    Others: `rgb(240, 197, 212)`
};
/* 获取目录 */
rt.get("/getCate", (req, res) => {
    res.json({ err: 0, cate: artCate });
});
/* 获取文章 */
rt.get("/pageList", (req, res) => {
    const cate = req.query.cate;
    const pageNum = parseInt(req.query.pageNum);
    const pageSkip = parseInt(req.query.pageSkip);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (cate === "All") {
                var essayList = yield Essay_1.default.find({}, "-_id").skip(pageSkip).limit(pageNum);
            }
            else
                var essayList = yield Essay_1.default.find({ tag: cate }, "-_id").skip(pageSkip).limit(pageNum);
            if (essayList.length >= 0) {
                res.json({ err: 0, essayList });
            }
            else
                res.json(errMap_json_1.err[1]);
        }
        catch (e) {
            console.log(e);
            res.json(errMap_json_1.err[5]);
        }
    }))();
});
/* 关键词搜索 */
rt.get("/kwSearch", (req, res) => {
    let { kw } = req.query;
    // 模糊查询
    let regStr = kw.trim().split("").join(".*");
    let reg = new RegExp(".*" + regStr + ".*", "i");
    console.log(reg);
    let filter = {
        $or: [{ title: { $regex: reg } }, { sum: { $regex: reg } }]
    };
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let searchList = yield Essay_1.default.find(filter, "-_id");
            // console.log("sL", searchList.length) 
            res.json({ err: 0, searchList });
        }
        catch (e) {
            res.json(errMap_json_1.err[5]);
        }
    }))();
});
exports.default = rt;
