import joi from "joi";
import { CreateUser } from "../controllers/authController.js";

const signUpSchema = joi.object<CreateUser>({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default signUpSchema;