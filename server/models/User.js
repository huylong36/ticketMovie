import mongoose from "mongoose";
const schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  numberCMND: {
    type: Number,
  },
  // tên truy cập
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
export const UserModel = mongoose.model("User", schema);
