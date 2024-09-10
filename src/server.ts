import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import UserRouter from "./routes/UserRoutes";

import PostRouter from "./routes/PostRoutes";
import CommentRouter from "./routes/CommentRoutes";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(PostRouter);
app.use(CommentRouter)

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
