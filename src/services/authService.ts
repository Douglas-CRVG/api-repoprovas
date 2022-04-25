import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";
import { CreateUser } from "../controllers/authController.js";
import { Session, User } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

export async function signUp(user: CreateUser){
    await validateEmail(user.email);

    const dataUser = formatDataUser(user)

    return await userRepository.create(dataUser);
}

function formatDataUser(user: CreateUser): CreateUser {
    return {
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    };
}

async function validateEmail(email: string) {
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists?.email) throw { type: "conflict" };
}

type CreateSession = Omit<Session, "id">

export async function signIn(user: CreateUser) {
    const userExist = await checkExist(user.email);

    await checkPassword(user.password, userExist.password);

    const token = createToken(userExist)

    const dataSession = formatDataSession(userExist.id, token)
    
    return await userRepository.createSession(dataSession);

}

async function checkExist(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user?.email) throw { type: "unauthorized" };

    return user
}

async function checkPassword(password: string, hashpassword: string) {
    if (!bcrypt.compareSync(password, hashpassword)) throw { type: "unauthorized" };
}

function formatDataSession(id: number, token: string): CreateSession {
    return {
        userId: id,
        token
    };
}

function createToken(data: User){
    const secretKey = process.env.JWT_SECRET;
    const settings = { expiresIn: 60*60*24*30 }

    return jwt.sign(data, secretKey, settings);
}

export async function validateToken(token: string){
    const dataUser = checkToken(token) as User;

    const user = await findUserData(dataUser);

    return user;
}

async function findUserData(dataUser: User) {
    const user = await userRepository.findByEmail(dataUser.email);
    if (!user) throw { type: "unauthorized" };

    return user;
}

function checkToken(token: string) {
    const secretKey = process.env.JWT_SECRET;
    const data = jwt.verify(token, secretKey);
    console.log(data);

    if(data) return data;

    throw { type: "unauthorized" };
}
