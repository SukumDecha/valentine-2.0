import { Router } from "express";
import { addDescription } from "../controllers/description.controller";

const router = Router();

router.post("/:uuid", addDescription);

export default router;
