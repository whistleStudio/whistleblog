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
const Poem_1 = __importDefault(require("../db/models/Poem"));
const dbMap_json_1 = require("../../public/dbMap.json");
const errMap_json_1 = require("../../public/errMap.json");
const rt = express_1.default.Router();
rt.get("/", (req, res) => {
    // console.log("poem")
    res.json({ err: 0 });
});
/* 请求目录 */
rt.get("/getMenu", (req, res) => {
    ;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        let menuList = [];
        try {
            for (let v of Object.values(dbMap_json_1.poemMap)) {
                let cateList = [];
                for (let c of v.cate) {
                    let titleList = yield Poem_1.default.find({ author: v.author, cate: c }, "title");
                    cateList.push({ cate: c, titles: titleList.map(e => e.title) });
                }
                menuList.push({ author: v.author, list: cateList });
            }
            res.json({ err: 0, menuList });
        }
        catch (e) {
            console.log(e);
            res.json(errMap_json_1.err[5]);
        }
    }))();
    rt.get("/getPoem", (req, res) => {
        let { author, title } = req.query;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let q = yield Poem_1.default.findOne({ author, title }, "author title txt imgUrl color date");
                if (q) {
                    res.json({ err: 0, poemInfo: q });
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
});
exports.default = rt;
