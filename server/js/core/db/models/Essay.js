"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const essaySchema = new mongoose_1.default.Schema({
    tag: String,
    title: String,
    sum: String,
    src: String,
    genDate: Date
});
const Essay = mongoose_1.default.model("essay", essaySchema);
exports.default = Essay;
