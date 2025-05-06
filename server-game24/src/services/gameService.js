"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnswer = exports.generateRandomNumber = void 0;
const mathjs_1 = require("mathjs");
const generateRandomNumber = () => {
    try {
        const digits = [];
        while (digits.length < 4) {
            const digit = Math.floor(Math.random() * 9) + 1;
            digits.push(digit);
        }
        return parseInt(digits.join(''));
    }
    catch (error) {
        const err = error;
        throw new Error('Error fetching number: ' + err.message);
    }
};
exports.generateRandomNumber = generateRandomNumber;
const checkAnswer = (userId, numbers, calculate) => {
    try {
        const result = (0, mathjs_1.evaluate)(calculate);
        return result === 24;
    }
    catch (e) {
        throw new Error('Invalid calculate');
    }
};
exports.checkAnswer = checkAnswer;
