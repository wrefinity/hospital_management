import { model, Schema } from "mongoose";


const TestSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    testName: { type: String, required: true },
    testDate: { type: Date, required: true },
    result: { type: String, required: true },
    notes: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


export default model('Test', TestSchema)