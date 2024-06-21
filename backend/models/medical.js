import { Schema, model } from 'mongoose';

const MedicalHistorySchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    condition: { type: String, required: true },
    diagnosisDate: { type: Date, required: true },
    treatment: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},{timestamps:true});

export default model('MedicalHistory', MedicalHistorySchema)