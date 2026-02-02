import express from "express";
import sportsRoutes from "./routes/sportRoutes.js";
const app = express();

app.use(express.json());
app.use("/sports", sportsRoutes);

export default app;
