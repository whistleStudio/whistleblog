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
            title: "离别的车站",
            singer: "孙露",
            imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E7%A6%BB%E5%88%AB%E7%9A%84%E8%BD%A6%E7%AB%99/%E5%A3%B0%E8%89%B2%E6%89%B0%E4%BA%BA.jpg",
            src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E7%A6%BB%E5%88%AB%E7%9A%84%E8%BD%A6%E7%AB%99/%E5%AD%99%E9%9C%B2%20-%20%E7%A6%BB%E5%88%AB%E7%9A%84%E8%BD%A6%E7%AB%99.m4a",
            lyric: `
当你紧紧握着我的手
再三说着珍重珍重
当你深深看着我的眼
再三说着别送别送
当你走上离别的车站
我终于不停的呼唤呼唤
眼看你的车子越走越远
我的心一片凌乱凌乱
千言万语还来不及说
我的泪早已泛滥泛滥
从此我迷上了那个车站
多少次在那儿痴痴的看
离别的一幕总会重演
你几乎把手儿挥断挥断
何时列车能够把你带回
我在这儿痴痴的盼
你身在何方我不管不管
请为我保重千万千万
当你走上离别的车站
我终于不停的呼唤呼唤
眼看你的车子越走越远
我的心一片凌乱凌乱
千言万语还来不及说
我的泪早已泛滥泛滥
从此我迷上了那个车站
多少次在那儿痴痴的看
离别的一幕总会重演
你几乎把手儿挥断挥断
何时列车能够把你带回
我在这儿痴痴的盼
你身在何方我不管不管
请为我保重千万千万
千言万语还来不及说
我的泪早已泛滥泛滥
从此我迷上了那个车站
多少次在那儿痴痴的看
离别的一幕总会重演
你几乎把手儿挥断挥断
何时列车能够把你带回
我在这儿痴痴的盼
你身在何方我不管不管
请为我保重千万千万
    `,
        };
        yield Music_1.default.create(musicDoc);
        console.log(`doc ${musicDoc.title} created!`);
    });
}
