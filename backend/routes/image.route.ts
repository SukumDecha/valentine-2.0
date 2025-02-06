import { Router } from "express";
import { getUserImages } from "../controllers/image.controller";

const router = Router();

router.get("/:slug", getUserImages);

export default router;
