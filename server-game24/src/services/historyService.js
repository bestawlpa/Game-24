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
exports.createHistory = exports.getAllHistory = void 0;
const historyModel_1 = __importDefault(require("../models/historyModel"));
const getAllHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield historyModel_1.default.find();
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching History: ' + err.message);
    }
});
exports.getAllHistory = getAllHistory;
const createHistory = (userId, numbers, calculate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = new historyModel_1.default({ userId, numbers, calculate });
        const saved = yield history.save();
        console.log('History saved:', saved);
        return saved;
    }
    catch (error) {
        const err = error;
        throw new Error('Error creating history: ' + err.message);
    }
});
exports.createHistory = createHistory;
