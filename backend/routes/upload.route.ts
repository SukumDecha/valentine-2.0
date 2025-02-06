import {Router} from "express";
import { uploadFiles, getUploadedFiles } from "../controllers/upload.controller";
import { handleFileUpload } from "../middleware/upload.middleware";

const router = Router();

router.post("/",handleFileUpload, uploadFiles);
router.get("/",getUploadedFiles)

export default router;