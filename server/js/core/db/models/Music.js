"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const musicSchema = new mongoose_1.default.Schema({
    title: String,
    singer: String,
    src: String,
    lyric: String,
    imgUrl: String,
    favor: { type: Number, default: 1 }
});
const Music = mongoose_1.default.model("music", musicSchema);
exports.default = Music;
