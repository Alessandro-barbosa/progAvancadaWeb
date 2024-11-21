import { Router } from "express";

import UserController from "../controllers/UserController";
import UserMiddleWare from "../middlewares/UserMiddleWare";

const UserRouter = Router();


//Listar usuários
UserRouter.get("/users", UserMiddleWare.analisyToken, UserController.listUser);

//Inserir usuários
UserRouter.post("/user", UserController.createUser);

//Atualizar usuários
UserRouter.put("/user/:id", UserController.updateUser);

//pegar Apenas um usuário
UserRouter.get("/user/:id", UserController.getUserById);

//Deletar usuários
UserRouter.delete("/user/:id", UserController.deleteUser);

export default UserRouter;