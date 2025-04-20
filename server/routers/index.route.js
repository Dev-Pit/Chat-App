import { Router } from "express";
import dashboard from "../controllers/index.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, dashboard);

export default router;
