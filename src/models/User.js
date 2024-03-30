import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Date,
  apiKey: { type: String, unique: true },
});

export const User = models?.User || model('User', UserSchema);