"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const poemApi_1 = __importDefault(require("./api/poemApi"));
require("./db/connect");
const app = (0, express_1.default)();
const PORT = 8181;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/poem", poemApi_1.default);
app.listen(PORT, () => {
    console.log(`server works on ${PORT}`);
});
