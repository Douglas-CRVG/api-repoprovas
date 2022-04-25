import { NextFunction, Request, Response } from "express";

interface ErrorHandler{
    bad_request: number;
    unauthorized: number;
    not_found: number;
    conflict: number;
    unprocessable_entity: number;
}

export default function errorHandlerMiddleware(error: any, request: Request, res: Response, next: NextFunction){
    const errorTypes: ErrorHandler = {
        bad_request: 400,
        unauthorized: 401,
        not_found: 404,
        conflict: 409,
        unprocessable_entity: 422
    }

    console.log(error);
    
    if (!error.message) {
        error.message = "An error as occurred"
    }

    if (!errorTypes[error.type]) {
        return res.sendStatus(500);
    }

    return res.sendStatus(errorTypes[error.type]);
}