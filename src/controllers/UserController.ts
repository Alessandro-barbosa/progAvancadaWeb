import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';
import AiConversation from '../utils/AiAnalisys';
import { CreateHashPassword } from '../utils/HashPassword';

const prisma = new PrismaClient();

class UserController {
    constructor(){
    }
    async listUser(req: Request, res: Response){
        
        try {
            const users = await prisma.user.findMany();  
            res.json(users)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async getUserById(req: Request, res: Response) {
      try {
          const { id } = req.params;  // Pegando o id da URL
          
          // Buscando o usuário com o id específico
          const user = await prisma.user.findUnique({
              where: { id: Number(id) },  // Converte o id para número (caso esteja vindo como string)
          });
  
          // Verificando se o usuário foi encontrado
          if (!user) {
              return res.status(404).json({ message: "Usuário não encontrado" });
          }
          // Retornando o usuário encontrado
          return res.json(user);
  
      } catch (error) {
          console.log(error);
          return res.status(500).json({
              error: error
          });
      }
  }
  
    async createUser(req: Request, res: Response){
        try {
            const userdata = req.body;
        
            if (!userdata.email && !userdata.password) {
              return res.status(400).json({
                status: 400,
                message:
                  "Você precisa passar o email e a senha no corpo da requisição",
              });
            }

            userdata.password = await CreateHashPassword(userdata.password);

            console.log(userdata.password);
        
            console.log(userdata);
            const newuser = await prisma.user.create({
              data: userdata,
            });
        
            console.log(newuser);
        
            res.json({
              status: 200,
              newuser: newuser,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async updateUser(req: Request, res: Response){
        try {
            const id = req.params.id;
            const body = req.body;
        
            const updatedUser = await prisma.user.update({
              where: {
                id: parseInt(id),
              },
              data: body,
            });
        
            if (updatedUser) {
              return res.json({
                status: 200,
                updatedUser: updatedUser,
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async deleteUser(req: Request, res: Response){
        try {
            const id = req.params.id;
        
            await prisma.user.delete({
              where: {
                id: parseInt(id),
              },
            });
        
            res.status(200).json({
              status: 200,
              message: "Usuário deletado com sucesso",
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: "Falha ao deletar o registro",
            });
          }
    }
}

export default new UserController();