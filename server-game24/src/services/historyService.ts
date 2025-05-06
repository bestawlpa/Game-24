import historyModel,{ IHistory } from "../models/historyModel";

const getAllHistory = async (): Promise<IHistory[]> => {
    try {
        return await historyModel.find();
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching History: ' + err.message);
    }
};

export { getAllHistory }