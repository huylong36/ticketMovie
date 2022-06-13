import express from "express";
import { register } from "../controller/users.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  return register(req, res);
});

export default router;
