import { Router } from "express";
import { getUserData } from "../controllers/userData.controller";
import { mockupData } from "../controllers/mockup.controller";

const router = Router();

router.get("/:uuid", getUserData);
router.post("/mockup", mockupData);

export default router;
