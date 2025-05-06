import mongoose, { Document, Schema } from 'mongoose';

interface IHistory extends Document {
    userId: string;
    records:  {
        numbers: number[];
        calculate: string;
    }[];
};

const historySchema = new Schema<IHistory>({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    records: [
        {
            numbers: [Number],
            calculate: String,
        }
    ]
}, { timestamps: true });

export default mongoose.model<IHistory>('History', historySchema);
export { IHistory };