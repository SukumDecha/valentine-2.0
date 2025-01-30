// src/routes/upload.routes.ts
import express from "express";
import { uploadFiles } from "../controllers/upload.controller";
import { handleFileUpload } from "../middleware/upload.middleware";

const router = express.Router();

router.post("/uploads",handleFileUpload, uploadFiles);

export default router;