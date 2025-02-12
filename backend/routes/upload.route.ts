import {Router} from "express";
import { uploadFilesWithTexts } from "../controllers/upload.controller";
import { handleFileUpload } from "../middleware/upload.middleware";

const router = Router();

router.post("/:uuid",handleFileUpload, uploadFilesWithTexts);

export default router;