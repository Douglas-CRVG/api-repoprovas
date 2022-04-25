import { CreateUser } from "../controllers/authController.js"
import { prisma } from "../db.js";

export async function findByEmail(email: string){
    const result = await prisma.user.findUnique({
        where: { email }
    })
    return result;
}

export async function create(data: CreateUser){
    const result = await prisma.user.create({data})
    return result;
}

export async function createSession(data){
    const result = await prisma.session.create({data})
    return result.token;
}