import { evaluate } from 'mathjs';

const generateRandomNumber = ():Number => {
    try {
        const digits: number[] = [];
        while (digits.length < 4) {
            const digit = Math.floor(Math.random() * 9) + 1; 
            digits.push(digit);
        }
        return parseInt(digits.join(''));
    } catch (error) {
        const err = error as Error;
        throw new Error('Error fetching number: ' + err.message);
    }
};


const checkAnswer = (userId: string, numbers: number[], calculate: string): boolean => {
  try {
    const result = evaluate(calculate);
    return result === 24;
  } catch (e) {
    throw new Error('Invalid calculate');
  }
};

export { generateRandomNumber, checkAnswer  }