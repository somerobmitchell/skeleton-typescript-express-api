import * as pongController from "./pong-controller";
import { Router } from "express";

let pongRouter = Router();

pongRouter.get("/", pongController.index);

export default pongRouter;