import express from "express"
import { GenerateScripts, DownloadScript } from "../controllers/controller.js";

export const Route = express.Router();

Route.post("/generatescripts", GenerateScripts)
Route.get("/downloadscripts/:filename", DownloadScript)