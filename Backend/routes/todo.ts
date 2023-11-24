import express,{ Router,Request,Response } from "express";
import {PrismaClient} from '@prisma/client';
import{number, string, z} from "zod";
import { fromZodError } from "zod-validation-error";

import authuser from "../middleware/authuser"


const router = Router();
const prisma = new PrismaClient();

const todoSchema =z.object({
    authorId:number(),
    title:string().min(5,"Title length too small"),
    subject:string().optional(),
    description:string().min(5,"Title length too small")
})


router.post("/createtodo",authuser,async (req,res)=>{

    let success = false;

    try {

        const userId =req.user._id;

        const {title , subject ,description } = req.body;

        const userTodo = {authorId:userId , title , subject ,description};

        const validationResult = todoSchema.safeParse(userTodo);

        if(!validationResult.success){
            return res.status(403).send(fromZodError(validationResult.error))
        }

        const createdTodo = await prisma.todo.create({data:{
            title,
            subject,
            description,
            authorId:userId}})

            return res.status(200).json(createdTodo);

        
    } catch (error) {
        console.log("Internal server error")
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally{
        prisma.$disconnect();
    }

} )

module.exports=router