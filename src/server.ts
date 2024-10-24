import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import UserRouter from "./routes/UserRoutes";
import PostRouter from "./routes/PostRoutes";
import CommentRouter from "./routes/CommentRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const prisma = new PrismaClient();
const app = express();

app.use(express.json(), cors()); 

app.use(UserRouter);
app.use(PostRouter);
app.use(CommentRouter);
app.use(AuthRoutes);

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
