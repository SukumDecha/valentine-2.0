import express from "express";
import { uploadFiles } from "../controllers/upload.controller";
import multer from "multer";

const storage = multer.memoryStorage(); // Using memory storage for simplicity
const uploadMiddleware = multer({ storage }).array("images", 10);

const router = express.Router();
router.post("/uploads",uploadMiddleware, uploadFiles);

export default router;
