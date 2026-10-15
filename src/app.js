import { config } from "dotenv";
import db from "./lib/db/mongoose.js";
import express from "express";
import authRouter from "./app/auth/auth.route.js";
import messageRouter from "./app/message/message.route.js";
import userRouter from "./app/user/user.route.js";
import { Otp } from "./app/auth/model/otp.model.js";
import { logger } from "./pkg/logger/logger.js";
import { env } from "./lib/config/env.js";
import { globalErrorHandler } from "./lib/error/err.handler.js";
import { router } from "./route.js";
import { correlationId } from "./pkg/correlation/correlationId.js";
import cookieParser from "cookie-parser";

export function createApp(){
    

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(correlationId)

app.use('/api',router);

app.use(globalErrorHandler);


return app;
}