import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  desc: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
},
  {
    timestamps: true,
  }
);

export default model('Category', categorySchema);

