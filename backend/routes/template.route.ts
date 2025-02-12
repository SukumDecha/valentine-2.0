import {Router} from "express";
import { addTemplate } from "../controllers/template.controller";

const router = Router();

router.post("/:uuid", addTemplate);

export default router;