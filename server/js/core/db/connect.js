"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DBNAME = "whistleblog", USER = "wsh", PASS = "19930304wsh", PORT = 27017;
mongoose_1.default.connect(`mongodb://127.0.0.1:${PORT}/${DBNAME}`, { dbName: DBNAME, user: USER, pass: PASS }, err => { if (!err)
    console.log(`db:${DBNAME} connect on port:${PORT}`);
else
    console.log(err); });
