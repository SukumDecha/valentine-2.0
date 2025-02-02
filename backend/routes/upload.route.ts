import {Router} from "express";
import { uploadFiles, getUploadedFiles, mockupData } from "../controllers/upload.controller";
import { handleFileUpload } from "../middleware/upload.middleware";

const router = Router();

router.post("/",handleFileUpload, uploadFiles);
router.get("/",getUploadedFiles)
router.post("/mockup",mockupData)

export default router;