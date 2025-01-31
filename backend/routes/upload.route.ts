// src/routes/upload.routes.ts
import express from "express";
import { uploadFiles, getUploadedFiles, mockupData } from "../controllers/upload.controller";
import { handleFileUpload } from "../middleware/upload.middleware";

const router = express.Router();

router.post("/uploads",handleFileUpload, uploadFiles);
router.get("/uploads",getUploadedFiles)
router.post("/uploads/mockup",mockupData)

export default router;