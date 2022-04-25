import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/index.js"
dotenv.config();

const server = express();
server.use(cors());
server.use(json());
server.use(router);
server.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});