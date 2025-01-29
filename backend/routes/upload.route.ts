import express from "express";
import { upload } from "../controllers/upload.controller";

const router = express.Router();
router.get("/uploads", upload);

export default router;
