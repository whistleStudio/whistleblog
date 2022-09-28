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
        yield mongoose_1.default.connect(`mongodb://wsh:19930304wsh@localhost:${PORT}/${DBNAME}`);
        console.log(`db:${DBNAME} connected on port:${PORT}`);
        const oneDoc = {
            cate: "2016",
            title: "归",
            author: "哨子",
            imgUrl: "https://whistleblog-1300400818.cos.ap-nanjing.myqcloud.com/poem/whistle/%E5%BD%92/backhome.jpg",
            txt: `二月落雪消逝的南方\n你坐在车厢遥望着远方\n晴朗透过车窗印在你眼里\n静静地从眼角流淌\n飘向那条小巷 那棵树旁\n等待 变成了光`,
            date: "2016-02-04"
        };
        yield Poem_1.default.create(oneDoc);
        console.log(`doc ${oneDoc.title} created!`);
    });
}
