import { Router } from "express";
import authRoutes from "./auth.routes.js";
import actionRoutes from "./actions.routes.js";

const router = Router();
router.use('/auth', authRoutes);
router.use('/actions', actionRoutes);

export default router;
