import { Router } from "express";
import { z } from "zod";
import * as ctrl from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

// Cadastro
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
  })
});

// Login
const loginSchema = z.object({
  body: z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres")
  })
});

router.post(
  "/register",
  validate(registerSchema),
  ctrl.register
);

router.post(
  "/login",
  validate(loginSchema),
  ctrl.login
);

export default router;