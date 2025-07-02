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
const Info_1 = __importDefault(require("../db/models/Info"));
const rt = express_1.default.Router();
/* 请求信息 */
rt.get("/getInfo", (req, res) => {
    let { k1, k2 } = req.query;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let info = yield Info_1.default.findOne({ k1, k2 });
            if (info) {
                res.json({ err: 0, data: info });
            }
            else {
                res.json({ err: 1, msg: "No information found" });
            }
        }
        catch (e) {
            console.log(e);
            res.json({ err: 5, msg: "Internal server error" });
        }
    }))();
});
exports.default = rt;
