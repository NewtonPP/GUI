import express from "express"
import { DownloadScripts, GenerateScripts } from "../controllers/controller.js";

export const Route = express.Router();

Route.post("/generatescripts", GenerateScripts)
Route.get("/downloadscripts/:filename", DownloadScripts)