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

    await newUser.save();
    const accessToken = createAccessToken({ id: newUser._id });
    res
      .status(200)
      .json({ success: true, message: "success", newUser, accessToken });
  } catch (error) {}
};

export const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }

  try {
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không chính xác !",
      });
    }
    const accessToken = createAccessToken({ id: user._id });
    return res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user,
    });
  } catch (error) {
    console.log("error login", error);
  }
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "7d",
  });
};
