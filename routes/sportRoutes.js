import express from "express";
import {
  getALLSports,
  getSportByID,
  createSport,
  updateSport,
  deleteSport,
  getPlayersBySport,
} from "../controllers/sportsController.js";
import {
  deletePlayer,
  addPlayerToSport,
} from "../controllers/playersController.js";

const sportsRoutes = express.Router();

sportsRoutes.route("/").get(getALLSports).post(createSport);
sportsRoutes
  .route("/:id")
  .get(getSportByID)
  .patch(updateSport)
  .delete(deleteSport);
sportsRoutes.route("/:id/players").get(getPlayersBySport);

sportsRoutes
  .route("/:id/players")
  .get(getPlayersBySport)
  .post(addPlayerToSport);

sportsRoutes.route("/:id/players/:playerId").delete(deletePlayer);
export default sportsRoutes;
