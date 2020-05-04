const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true }
});

UserSchema.pre('save', async function (next: () => void) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);

  user.password = hash;
  next();
});

UserSchema.methods.verifyPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const UserModel = mongoose.model('user', UserSchema);
