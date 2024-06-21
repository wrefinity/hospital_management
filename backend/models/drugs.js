import { Schema, model } from "mongoose";


const DrugSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    image: {
        required: true,
        type: String
    },
    desc: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        required: true,
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    quantity: {
        required: true,
        default: 0,
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    expiration_date:{
        type:Date,
        required:true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true })


export default model("Drug", DrugSchema)