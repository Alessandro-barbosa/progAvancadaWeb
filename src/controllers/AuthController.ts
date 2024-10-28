import { Request, Response} from 'express';
import bcrypt from "bcrypt";
import { PrismaClient} from '@prisma/client'
import { CheckUserPassword } from '../utils/HashPassword';
import { generateJwToken } from '../utils/JWT';

const prisma = new PrismaClient();

class AuthController{
    constructor(){}

    async signin(req: Request, res: Response){
        console.log("Chegou")
        try{
            const {email, password} = req.body;

            console.log("email:", email)
            console.log("password:", password)

            if(!email || !password){
                return res.json({
                    status: 400,
                    message: "Não contém o email ou senha no body"
                })
            }

            const user = await prisma.user.findFirst({
                where: {
                    email
                },
            });

            if(!user){
                return res.json({
                    status: 500, 
                    message: "Email não encontrado"
                })
            }

            const passwordCheck = await CheckUserPassword(password, user.password);

            if(!passwordCheck){
                return res.json({
                    status: 401,
                    message: "Usuário ou senha inválidos!"
                })
            }
            return res.json({
                status: 200,
                message: "logado com sucesso!",
                token: await generateJwToken(req.body)
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async signup(){

    }
    async signout(){

    }
}
export default new AuthController;