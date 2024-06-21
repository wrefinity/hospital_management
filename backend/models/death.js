import { model, Schema } from "mongoose";

const DeathSchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateOfDeath: { type: Date, required: true },
    placeOfDeath: { type: String, required: true },
    reason: { type: String},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export default model('Death', DeathSchema);