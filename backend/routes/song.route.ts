import { Router } from "express";
import { check, searchTrack } from "../controllers/song.controller";

const router = Router();

router.get("/search", searchTrack);
router.get("/check", check)

export default router;
