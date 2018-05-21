import * as pingController from "../controllers/ping-controller";
import { Router } from "express";

let pingRouter = Router();

pingRouter.get("/", pingController.index);

export default pingRouter;