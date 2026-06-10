import { Router } from "express";
import { prisma } from "../services/db.js";

const router = Router();

router.get("/dashboard", async (req, res) => {

  const totalActions =
    await prisma.action.count();

  const approvedActions =
    await prisma.action.count({
      where: {
        status: "APPROVED"
      }
    });

  const pendingActions =
    await prisma.action.count({
      where: {
        status: "PENDING"
      }
    });

  const rejectedActions =
    await prisma.action.count({
      where: {
        status: "REJECTED"
      }
    });

  const totalUsers =
    await prisma.user.count();

  res.json({
    totalActions,
    approvedActions,
    pendingActions,
    rejectedActions,
    totalUsers
  });

});

router.get("/pending", async (req, res) => {

  const actions = await prisma.action.findMany({
    where: {
      status: "PENDING"
    }
  });

  res.json(actions);
});

router.patch("/:id/approve", async (req, res) => {

  const action = await prisma.action.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      status: "APPROVED"
    }
  });

  res.json(action);
});

router.patch("/:id/reject", async (req, res) => {

  const action = await prisma.action.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      status: "REJECTED"
    }
  });

  res.json(action);
});

export default router;