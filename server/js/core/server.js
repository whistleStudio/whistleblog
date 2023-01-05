"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./db/connect");
const homeApi_1 = __importDefault(require("./api/homeApi"));
const poemApi_1 = __importDefault(require("./api/poemApi"));
const musicApi_1 = __importDefault(require("./api/musicApi"));
const essayApi_1 = __importDefault(require("./api/essayApi"));
const app = (0, express_1.default)();
const PORT = 8181;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../dist')))
app.use("/api/home", homeApi_1.default);
app.use("/api/poem", poemApi_1.default);
app.use("/api/music", musicApi_1.default);
app.use("/api/essay", essayApi_1.default);
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.listen(PORT, () => {
    console.log(`server works on ${PORT}`);
});
