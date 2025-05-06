import { number } from 'mathjs';
import mongoose, { Document, Schema } from 'mongoose';
import { inherits } from 'util';

interface IHistory extends Document {
    userId: string;
    numbers: number[];
    calculate: string;
};

const historySchema = new Schema<IHistory>({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    numbers: {
        type: [Number],
        required: true,
    },
    calculate: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<IHistory>('History', historySchema);
export { IHistory };