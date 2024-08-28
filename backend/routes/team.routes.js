import express from "express";
import {
  createTeam,
  getTeamById,
  getTeams,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/all", getTeams);
router.get("/:id", getTeamById);

export default router;
