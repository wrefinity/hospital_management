import { Schema, model } from 'mongoose';
export const orderEnum = ['pending', 'approved', 'declined']
const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    drug: {
        type: Schema.Types.ObjectId,
        ref: 'Drug',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: orderEnum,
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

export default model('Order', orderSchema);
