import express from "express";
import {
  getALLSports,
  getSportByID,
  createSport,
  updateSport,
  deleteSport,
} from "../controllers/sportsController.js";

const sportsRoutes = express.Router();

sportsRoutes.route("/").get(getALLSports).post(createSport);
sportsRoutes
  .route("/:id")
  .get(getSportByID)
  .patch(updateSport)
  .delete(deleteSport);
