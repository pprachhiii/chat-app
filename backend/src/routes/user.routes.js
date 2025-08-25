import express from "express";
import { findUserByUsername } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find", findUserByUsername);

export default router;
