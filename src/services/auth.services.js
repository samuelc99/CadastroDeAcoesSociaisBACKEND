import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./db.js";
import { env } from "../config/env.js";

export async function register({ name, email, password }) {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error('E-mail já cadastrado');
  const hash = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({ data: { name, email, password: hash } });
  return sanitizeUser(user);
}

export async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciais inválidas');
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) throw new Error('Credenciais inválidas');
  const token = sign(user);
  return { token, user: sanitizeUser(user) };
}

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });
}

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}
