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
    const existing = await historyModel.findOne({ userId });
    console.log('ex',existing);
    

    const newRecord = { numbers, calculate };
    console.log('ne',newRecord);
    

    if (!existing) {
      const newHistory = new historyModel({
        userId,
        records: [newRecord]
      });
      console.log('nh',newHistory);
      
      return await newHistory.save();
    }

    existing.records.push(newRecord);
    return await existing.save();

  } catch (error) {
    const err = error as Error;
    throw new Error('Error updating history: ' + err.message);
  }
};

const getHistoryUser = async (userId:string) => {
    try {
        let history = await historyModel.findOne({ userId });

        if (!history) {
            console.log('ไม่มีตระกร้า');
        }
        return history;
    } catch (error) {
        const err = error as Error;
        throw new Error('Error updating history: ' + err.message);
    }
};

export { getAllHistory, createHistory, getHistoryUser }