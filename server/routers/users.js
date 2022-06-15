import express from "express";
import { login, register } from "../controller/users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  return register(req, res);
});
router.post("/login", async (req, res) => {
  return login(req, res);
});

export default router;
