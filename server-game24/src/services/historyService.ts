import historyModel,{ IHistory } from "../models/historyModel";

const getAllHistory = async (): Promise<IHistory[]> => {
    try {
        return await historyModel.find();
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching History: ' + err.message);
    }
};

const createHistory = async (userId: string, numbers: number[], calculate: string) => {
    try {
        const history = new historyModel({userId, numbers, calculate});
        const saved = await history.save();
        console.log('History saved:', saved);
        return saved;
    } catch (error) {
         const err = error as Error;
        throw new Error('Error creating history: ' + err.message);
    }
};

export { getAllHistory, createHistory }