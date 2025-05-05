"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
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
