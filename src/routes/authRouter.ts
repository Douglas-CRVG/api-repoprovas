import { Router } from "express";
import * as authController from "../controllers/authController.js";
import {validateSchemaMiddleware} from "../middlewares/validateSchemaMiddlewares.js";
import * as schema from "../schemas/index.js";


const authRouter = Router();
authRouter.post("/sign-up", validateSchemaMiddleware(schema.signUpSchema), authController.signUp);

export default authRouter;