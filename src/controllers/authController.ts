import { User } from "@prisma/client";
import { Request, Response } from "express";
import * as userService from "../services/authService.js"

export type CreateUser = Omit<User, "id">

export async function signUp(req: Request, res: Response){
    const data: CreateUser = req.body;
    const result = await userService.signUp(data);

    res.status(201).send(result);
}

export async function signIn(req: Request, res: Response) {
    const data: CreateUser = req.body;
    const token = await userService.signIn(data);

    res.status(200).send({token});
}