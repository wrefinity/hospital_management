import { Schema, model } from 'mongoose';

const logSchema = new Schema({
    action: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: {
        type: String,
    },
},{timestamps:true});

export default model('Log', logSchema);
