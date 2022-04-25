import { CreateUser } from "../controllers/authController.js"
import bcrypt from "bcrypt";
import * as userRepository from "../repositories/userRepository.js";

export async function signUp(user: CreateUser){
    const emailExists = await userRepository.findByEmail(user.email)
    if (emailExists.email) throw {type: "conflict"}

    const createUser: CreateUser = {
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    }

    const result = await userRepository.create(createUser)
    return result;
}