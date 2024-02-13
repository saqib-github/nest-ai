// user.schema.ts

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // other fields as needed
});
