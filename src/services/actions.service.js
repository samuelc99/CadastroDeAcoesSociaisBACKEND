import { prisma } from "./db.js";

export function listActions({ q, status, take = 50, skip = 0 } = {}) {
  return prisma.action.findMany({
    where: {
      status: status || undefined,
      OR: q ? [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { location: { contains: q, mode: 'insensitive' } },
        { responsible: { contains: q, mode: 'insensitive' } },
      ] : undefined,
    },
    orderBy: { date: 'asc' },
    take: Number(take),
    skip: Number(skip),
  });
}

export function getAction(id) {
  return prisma.action.findUnique({ where: { id } });
}

export function createAction(data, ownerId = null) {
  const payload = { ...data, ownerId };
  return prisma.action.create({ data: payload });
}

export function updateAction(id, data) {
  return prisma.action.update({ where: { id }, data });
}

export function deleteAction(id) {
  return prisma.action.delete({ where: { id } });
}
