"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const poemSchema = new Schema({
    cate: String,
    title: String,
    author: String,
    imgUrl: String,
    txt: String,
    date: String
});
const Poem = mongoose_1.default.model("poem", poemSchema);
exports.default = Poem;
