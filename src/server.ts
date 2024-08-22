import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

//Inserir usuários
app.post("/user", async function (req: Request, res: Response) {
  //Inserir um usuário ...
  try {
    const userdata = req.body;
    if(!userdata.email){
      return res.json({
        status: 400,
        message: "sem email"
    })
    }    
    console.log("Requisição enviada pelo método post: ");
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
});

// Listar usuários
app.get("/users", async function (req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users-data", async function (req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Atualizar usuários

app.put("/user/:id", async function (req: Request, res: Response) {
  const userData = req.body;
  const userId = req.params.id;
  try{
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: userData
    })
    res.json({
      status: 200,
      updateUser: updateUser,
    });
  }catch(error){
    res.json({
      status: 500,
      message: error,
    })
  }
});

// Deletar usuários

app.delete("/user/:id", async function (req: Request, res: Response) {
  const userData = req.body;
  const userId = req.params.id;

  try{
    const deleteUser = await prisma.user.delete({
      where:{
        id: parseInt(userId)
      }
    })
    res.json({
      status: 200,
      message: "successfully deleted",
      deleteUser: deleteUser
    })
  }catch(error){
    res.json({
      status: 500,
      message: error
    })
  }
});

// Listar posts
app.get("/posts", async function (req: Request, res: Response) {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// Criar um post para um usuário
app.post("/post", async function (req: Request, res: Response){
  const postData = req.body;
  try{
      const newPost = await prisma.post.create({
          data: postData,
      });
      console.log(postData);
      console.log("Post feito com sucesso");
      res.json({
        status: 200,
        newPost: newPost
      })
  }catch(error){
      console.log(postData);
      res.json({
          status: 500,
          message: error,
      })
      console.log(error);
  }
});

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
