"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const historyController_1 = __importDefault(require("../controllers/historyController"));
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = express_1.default.Router();
router.get('/historys', historyController_1.default.getAllHistory);
router.post('/add-History', historyController_1.default.createHistory);
router.get('/history/:userId', authenticateToken_1.default, historyController_1.default.getHistoryUser);
exports.default = router;
