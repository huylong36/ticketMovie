import { UserModel } from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { fullName, address, phone, userName, numberCMND, email, password } =
    req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ success: true, message: "Missing username or password" });
  }
  try {
    // check người dùng đã tồn tại chưa
    const _user = await UserModel.findOne({ userName });
    const _email = await UserModel.findOne({ email });
    if (_user) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }
    if (_email) {
      return res
        .status(400)
        .json({ success: false, message: "Email đã được sử dụng" });
    }

    const newUser = new UserModel({
      fullName,
      address,
      phone,
      userName,
      numberCMND,
      email,
      password,
    });

    const accessToken = createAccessToken({ id: newUser._id });
    res
      .status(200)
      .json({ success: true, message: "success", newUser, accessToken });
  } catch (error) {}
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "7d",
  });
};
