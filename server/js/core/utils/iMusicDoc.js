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
const mongoose_1 = __importDefault(require("mongoose"));
const Music_1 = __importDefault(require("../db/models/Music"));
const DBNAME = 'whistleblog';
const PORT = 27017;
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
        console.log(`db:${DBNAME} connected on port:${PORT}`);
        const musicDoc = {
            title: "晨钟暮鼓",
            singer: "白百EndlessWhite",
            imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93/%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93.jpg",
            src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93/%E7%99%BD%E7%99%BEEndlessWhite%20-%20%E6%99%A8%E9%92%9F%E6%9A%AE%E9%BC%93.m4a",
            lyric: `
等时间埋没
你透过他的眼睛
当所有结束一切
都将恢复拷贝的过程
这世界定论无数
你无法替我走过
所谓是好是坏
都需要我一个人来挥舞大旗
等时间埋没
你透过他的眼睛
当所有结束一切
都将恢复拷贝的过程
这世界定论无数
你无法替我走过
所谓是好是坏
都需要我一个人来挥舞大旗      
    `,
        };
        yield Music_1.default.create(musicDoc);
        console.log(`doc ${musicDoc.title} created!`);
    });
}
