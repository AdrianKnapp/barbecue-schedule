import { type UserModel } from '@/types/user';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    id: String,
    email: String,
    passwordHash: String,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User ?? mongoose.model<UserModel>('User', userSchema);

export default User;
