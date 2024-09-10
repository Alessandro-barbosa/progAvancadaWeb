import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';
import AiConversation from '../utils/AiAnalisys';

const prisma = new PrismaClient();

class CommentController{
    constructor(){}
    async listComments(req: Request, res: Response){
        try{
            const comments = await prisma.comment.findMany();
            res.json(comments)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async createComment(req: Request, res: Response){        
        const commentData = req.body;        
        try{                                        
                const response = await AiConversation(commentData.content).then();
                console.log(response)
                const evaluation = (JSON.parse(response))
                console.log(evaluation)
                const newComment = await prisma.comment.create({
                    data: {
                        ...commentData,
                        evaluation: evaluation.classificação                 
                    }
                })
                console.log("Comentário criado com sucesso");
                res.json({
                    status: 200,
                    newComment: newComment,
                    })
        }catch(error){
            console.log("Erro ao criar comentário");
            res.json({
                status: 500,
                message: error
            })
        }    
    }
    async updateComment(req: Request, res: Response){
        const commentData = req.body;
        const commentId = req.params.id;
        try{
            const newComment = await prisma.comment.update({
                where: {
                    id: parseInt(commentId),
                },
                data: commentData,
            });
            console.log("comentário atualizado com sucesso");
            res.json({
                status: 200,
                newComment: newComment
            })
        }catch(error){
            console.log("Erro ao atualizar comentário");
            res.json({
                status: 500,
                message: error,
            })
            console.log(error);
        }
    }
    async deleteComment(req: Request, res: Response){
        const commentID = req.params.id;
        try{
            const commentDeleted = await prisma.comment.delete({
                where: {
                    id: parseInt(commentID)
                },
            })
            res.json({
                status: 200,
                commentDeleted: commentDeleted
            })
        }catch(error){
            res.json({
                status: 500,
                message: error
            })
        }
    }
}

export default new CommentController;