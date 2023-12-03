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


router.post("/createtodo",authuser,async (req:Request,res:Response)=>{

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

            success=true

            return res.status(200).json(createdTodo);

        
    } catch (error) {
        console.log("Internal server error")
        console.error('Internal server error :: ' + error);
       return res.status(500).send('Some error occurred');
    }finally{
        prisma.$disconnect();
    }

} )

router.get("/gettodobyid/:id", async (req:Request,res:Response) => {

    try {

        const todoId = parseInt(req.params.id);

        const todo = await prisma.todo.findUnique({where:{id:todoId}})

        if(todo == null){
          return  res.status(200).send("todo with the given id does not exist");
        }

        return res.status(200).json(todo);


        
    } catch (error) {
        console.log("Internal server error")
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally{
        prisma.$disconnect();
    }

})

router.get("/getalltodoforgivenuser",authuser, async (req:Request,res:Response)=>{

    
    try {
        const userId = req.user._id;

        const todos =await prisma.todo.findMany({where:{authorId:userId}})

        if(!todos){
            res.status(200).send("No todo available")
        }

        res.status(200).json(todos);

    } catch (error) {
        console.log("Internal server error")
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally{
        prisma.$disconnect();
    }

})

router.put("/updatetodo/:id", async (req:Request,res:Response) => {

    try {
        const todoId = parseInt(req.params.id);

    const todo = await prisma.todo.findUnique({where:{id:todoId}})

        if(todo === null){
            return res.status(404).send("todo with the given id does not exist");
        }

    const {title , subject , description} = req.body;

    let newTodo :{title?:string ; subject?:string ; description?:string} = {
        title:todo.title || "default",
        subject:todo.subject || "default",
        description:todo.description || "default" 
    }

    if (title !== undefined) newTodo.title = title;
    if (subject !== undefined) newTodo.subject = subject;
    if (description !== undefined) newTodo.description = description;

    const updatedTodo = await prisma.todo.update({ where: { id: todoId },data:newTodo})
    return res.status(200).json(updatedTodo);


    } catch (error) {
        console.log("Internal server error")
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally{
        prisma.$disconnect();
    }   
})


router.delete("/deletetodo/:id", async (req:Request,res:Response) => {

    try {
        const todoId = parseInt(req.params.id)

    const todo = await prisma.todo.findUnique({where:{id:todoId}});

    if(!todo){
      return  res.status(403).send("Todo with given id does not exist");
    }

    const deletedTodo =await prisma.todo.delete({where:{id:todoId}})
    return res.status(200).json(deletedTodo);
    } catch (error) {
        console.log("Internal server error")
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally{
        prisma.$disconnect();
    }   
    
})




module.exports=router