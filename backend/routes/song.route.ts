import { Router } from "express";
import { check, searchTrack, addTrackId } from "../controllers/song.controller";

const router = Router();

router.get("/search", searchTrack);
router.post("/:uuid", addTrackId);
router.get("/check", check)

export default router;
