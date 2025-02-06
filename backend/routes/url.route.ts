import {Router} from "express";
import { mockupData, getRequestParamSlugFromClient } from "../controllers/url.controller";

const router = Router();

router.get("/:slug", getRequestParamSlugFromClient);
router.post("/", mockupData);

export default router;