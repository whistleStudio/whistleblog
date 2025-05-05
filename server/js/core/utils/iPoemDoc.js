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
const Poem_1 = __importDefault(require("../db/models/Poem"));
const DBNAME = 'whistleblog';
const PORT = 27017;
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
        console.log(`db:${DBNAME} connected on port:${PORT}`);
        const oneDoc = {
            cate: "2046",
            title: "燕西线",
            author: "哨子",
            imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E7%87%95%E8%A5%BF%E7%BA%BF.jpg",
            txt: `燕西线的路很长，
    道很窄，
    只能勉强承下两辆车，
    容不得你想七想八，
    也不允许你反悔掉头。
    
    单线程地向前，
    很快乐。`,
            date: "哨子 2023-03"
        };
        yield Poem_1.default.create(oneDoc);
        console.log(`doc ${oneDoc.title} created!`);
    });
}
