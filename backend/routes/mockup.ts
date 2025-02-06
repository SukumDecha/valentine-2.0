import {Router} from "express";
import { mockupData } from "../controllers/mockup.controller";

const router = Router();

router.post("/", mockupData);

export default router;