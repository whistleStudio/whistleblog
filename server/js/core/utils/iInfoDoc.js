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
const Info_1 = __importDefault(require("../db/models/Info"));
const DBNAME = 'whistleblog';
const PORT = 27017;
main().catch(err => console.log(err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb://wsh:19930304wsh@127.0.0.1:${PORT}/${DBNAME}`);
        console.log(`db:${DBNAME} connected on port:${PORT}`);
        const formatDate = (date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        };
        const oneDoc = {
            k1: "aguato",
            k2: "check_update",
            v1: "simple text",
            v2: {
                version: "1.0.1",
                releaseDate: formatDate(new Date()),
                changelog: `<span style="color: orange; font-size: 14px;">你好</span><p>1111</p>`,
                info: `<span style="color: skyblue;">测试</span>`
            }
        };
        yield Info_1.default.create(oneDoc);
        console.log(`Info doc with key ${oneDoc.k1}, ${oneDoc.k2} created!`);
    });
}
