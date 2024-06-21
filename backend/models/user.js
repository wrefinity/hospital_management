import { Schema, model } from 'mongoose';
import { hash as _hash, compareSync } from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const bcryptSalt = parseInt(process.env.BCRYPT_SALT, 10) || 10;

export const definedRole = ['patient', 'doctor', 'nurse', 'pharmacy', 'admin'];

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activeRole: {
    type: String,
  },
  roles: {
    type: [{ type: String, required: true, enum: definedRole }],
    default: definedRole[0]
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  },
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hash = await _hash(user.password, bcryptSalt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = function (password) {
  const compared = compareSync(password, this.password);
  console.log("compared, ", compared)
  return compared;
};

export default model('User', UserSchema);
