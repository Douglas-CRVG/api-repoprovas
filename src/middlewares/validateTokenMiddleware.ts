import { NextFunction, Request, Response } from 'express';
import * as authService from "../services/authService.js"

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) throw { type: "unauthorized" }

    res.locals.user = authService.validateToken(token);

    next();
}
