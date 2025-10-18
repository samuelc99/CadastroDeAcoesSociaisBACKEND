import { prisma } from "../services/db.js";
import { ok, created, noContent, notFound, serverError, badRequest } from "../utils/http.js";

export async function list(req, res) {
  try {
    const actions = await prisma.action.findMany({ orderBy: { createdAt: "desc" } });
    return ok(res, actions);
  } catch (e) {
    return serverError(res, e);
  }
}

export async function get(req, res) {
  try {
    const action = await prisma.action.findUnique({ where: { id: req.params.id } });
    if (!action) return notFound(res, "Ação não encontrada");
    return ok(res, action);
  } catch (e) {
    return serverError(res, e);
  }
}

export async function create(req, res) {
  try {
    const data = req.body;
    const action = await prisma.action.create({ data });
    return created(res, action);
  } catch (e) {
    return badRequest(res, e.message);
  }
}

export async function update(req, res) {
  try {
    const data = req.body;
    const action = await prisma.action.update({
      where: { id: req.params.id },
      data
    });
    return ok(res, action);
  } catch (e) {
    return badRequest(res, e.message);
  }
}

export async function remove(req, res) {
  try {
    await prisma.action.delete({ where: { id: req.params.id } });
    return noContent(res);
  } catch (e) {
    return badRequest(res, e.message);
  }
}
