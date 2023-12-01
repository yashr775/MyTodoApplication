import express,{ Router,Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import{z} from "zod";
import { fromZodError } from "zod-validation-error";

import { PrismaClient } from '@prisma/client';
import authuser from '../middleware/authuser';
require('dotenv').config({ path: '../.env' });

const router = express.Router();
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const prisma = new PrismaClient();

const createUserSchema =z.object({
    name:z.string().min(3,"minimum 3 characters required"),
    email:z.string().email("wrong email format"),
    password:z.string(),
})

const loginUserSchema =z.object({
    email:z.string().email(),
    password:z.string()
})



router.post('/createuser', async (req:Request,res:Response)=>{

    let success =false

    const {name ,email , password} =req.body;

    const userData ={name,email,password};

    const validationResult = createUserSchema.safeParse(userData)

    if(!validationResult.success){
          res.status(403).send(fromZodError(validationResult.error))
    }

    try {

        const user =await prisma.user.findUnique({
            where:{
                email:email,
            }
        })

        if (user) {
            return res.status(403).send('User with the given email already exists');
          }else{

            const createdUser = await prisma.user.create({
                data:{name,
                    email,
                    password
                }
            })

          const userId = createdUser.id;
          const data = { user: {_id: userId } };
          const token = jwt.sign(data, JWT_SECRET!);
  
          if (token) success = true;
  
          return res.json({ success, token });

        }
        
    } catch (error) {
        console.log('Internal server error');
      console.error('Internal server error :: ' + error);
      res.status(500).send('Some error occurred');
    }
    finally {
        await prisma.$disconnect();
      }

})

router.post("/login",async(req:Request,res:Response)=>{

    let success =false;

    const {email,password} =req.body;

    const loginData = {email,password};

    const validationResult =loginUserSchema.parse(loginData);

    try {

        const user = await prisma.user.findUnique({
            where:{email}
        })
        

        if(!user) {
            return res.status(403).send("User with the given email does not exist")
        }

        if(password !== user?.password)
        {
            return res.status(403).send("wrong password entered");
        }

        const userId = user?.id;
        
        const data ={user:{_id:userId}};

        let token:string='';

        if(typeof JWT_SECRET ==="string"){
            token =jwt.sign(data,JWT_SECRET);
            success = true;
        }

        return res.status(200).json({success,token})


    } catch (error) {
        console.log('Internal server error');
      console.error('Internal server error :: ' + error);
      res.status(500).send('Some error occurred');
    }finally {
        await prisma.$disconnect();
      }


})

router.get("/getuser", authuser, async (req:Request,res:Response)=>{
    try {

        console.log(req.user._id);

        const userId =req.user._id;

        const user = await prisma.user.findUnique({where:{id:userId}})

        if(!user){
            return res.status(400).send("User with the given id does not exist");
        }

        return res.status(200).send(user)
        
    } catch (error) {
        console.log('Internal server error');
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally {
        await prisma.$disconnect();
      }
})

router.delete("/deleteuser",authuser,async (req:Request,res:Response)=>{

    try {
        console.log(req.user._id)

        const userId=req.user._id;

        const user =await prisma.user.findUnique({where:{id:userId}});
    
        if(!user){
            return res.status(400).send("User with the given id does not exist");
        }
     
        const deletedUser =await prisma.user.delete( { where: { id:userId } } );
    
        res.status(200).json(deletedUser)
    
        
    } catch (error) {
        console.log('Internal server error');
        console.error('Internal server error :: ' + error);
        res.status(500).send('Some error occurred');
    }finally {
        await prisma.$disconnect();
      }
   
})



module.exports = router