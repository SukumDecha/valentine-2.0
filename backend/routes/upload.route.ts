import {Router} from "express";
import { uploadFiles } from "../controllers/upload.controller";
import { handleFileUpload } from "../middleware/upload.middleware";

const router = Router();

router.post("/:slug",handleFileUpload, uploadFiles);

export default router;