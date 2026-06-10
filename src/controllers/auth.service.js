import { prisma } from "./db.js";

export async function register({ name, email, password }) {

  const userExists = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (userExists) {
    throw new Error("E-mail já cadastrado");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });

  return user;
}

export async function login({ email, password }) {

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (user.password !== password) {
    throw new Error("Senha inválida");
  }

  return {
    message: "Login realizado com sucesso",
    user
  };
}