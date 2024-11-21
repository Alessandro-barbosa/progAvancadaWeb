import { Request, Response} from 'express';
import bcrypt from "bcrypt";
import { PrismaClient} from '@prisma/client'
import { CheckUserPassword } from '../utils/HashPassword';
import { generateJwToken } from '../utils/JWT';

const prisma = new PrismaClient();
class UserFiltrado{
    id: number = 0;
    name: string="";
    email: string="";

    constructor(name:string, email: string, id: number){
        this.id = id;
        this.email = email;
        this.name = name;
    }
}
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
                user: user,
                token: await generateJwToken(req.body)
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.json({
                    status: 400,
                    message: "Faltam campos no body: name, email ou password"
                });
            }
            
            const existingUser = await prisma.user.findFirst({
                where: {
                    email
                }
            });

            if (existingUser) {
                return res.json({
                    status: 409,
                    message: "E-mail já está cadastrado!"
                });
            }

            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Cria o novo usuário
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            const userFiltrado = new UserFiltrado(newUser.name as string, newUser.email, newUser.id);

            return res.json({
                status: 201,
                message: "Usuário criado com sucesso!",
                user: userFiltrado
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            });
        }
    }
    async signout(req: Request, res: Response) {
        try {
            return res.json({
                status: 200,
                message: "Usuário deslogado com sucesso!"
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error
            });
        }
    }
}
export default new AuthController;