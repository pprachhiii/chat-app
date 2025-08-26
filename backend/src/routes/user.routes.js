import express from "express";
import {
  findUserByUsername,
  getUsersForSidebar,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/find", findUserByUsername);
router.get("/", protectRoute, getUsersForSidebar);

export default router;
