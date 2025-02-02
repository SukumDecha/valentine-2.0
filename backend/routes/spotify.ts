import { Router } from "express";
import { getTrack } from "../controllers/song.controller";
import { check } from "../controllers/song.controller";

const router = Router();

router.get("/track/:id", getTrack);
router.get("/check", check)

export default router;
