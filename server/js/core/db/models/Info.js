"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const infoSchema = new mongoose_1.default.Schema({
    k1: String,
    k2: String,
    v1: String,
    v2: Object,
});
const Info = mongoose_1.default.model("info", infoSchema);
exports.default = Info;
