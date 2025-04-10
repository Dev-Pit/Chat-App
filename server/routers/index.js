import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { dashboard } from "../controllers/Index.js";

const router = express.Router();

router.get("/dashboard", verifyToken, dashboard);

export default router;
