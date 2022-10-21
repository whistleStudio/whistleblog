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
        yield mongoose_1.default.connect(`mongodb://wsh:19930304wsh@localhost:${PORT}/${DBNAME}`);
        console.log(`db:${DBNAME} connected on port:${PORT}`);
        const musicDoc = {
            title: "泡沫",
            singer: "花儿乐队",
            imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%B3%A1%E6%B2%AB/%E6%B3%A1%E6%B2%AB.jpg",
            src: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/music/%E6%B3%A1%E6%B2%AB/%E8%8A%B1%E5%84%BF%E4%B9%90%E9%98%9F%20-%20%E6%B3%A1%E6%B2%AB.mp3",
            lyric: `
    我点燃那盏灯火
向远方凝望着
空气都打开了
记忆随风散落
幻想美好的时刻
没有完美结果
红色夕阳下落
黯淡的云朵
憧憬像飘浮的泡沫
光映出灿烂的颜色
可却没有照到我
全世界的雨打到我
我的梦已经湿透了
瞬间被淹没

我点燃那盏灯火
向远方凝望着
空气都打开了
记忆随风散落
幻想美好的时刻
没有完美结果
红色夕阳下落
黯淡的云朵
憧憬像飘浮的泡沫
光映出灿烂的颜色
可却没有照到我
全世界的雨打到我
我的梦已经湿透了
瞬间被淹没          
    `,
        };
        yield Music_1.default.create(musicDoc);
        console.log(`doc ${musicDoc.title} created!`);
    });
}
