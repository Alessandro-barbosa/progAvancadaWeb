import {Request, Response, NextFunction} from 'express';

class UserMiddleWare {
    constructor(){
    }
    async analisyToken(req: Request, res: Response, next: NextFunction){
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({
                message: "Não autorizado"
            })
        }
        console.log(token);
        
        next()
    }
}

export default new UserMiddleWare();