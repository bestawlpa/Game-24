"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const historyRoutes_1 = __importDefault(require("./routes/historyRoutes"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3087',
    credentials: true,
}));
app.use('/api', userRoutes_1.default);
app.use('/api', gameRoutes_1.default);
app.use('/api', historyRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).send("My first server!");
});
const PORT = 3088;
app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
});
