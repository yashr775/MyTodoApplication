require('dotenv').config({ path: '../../.env' });

import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const JWT_SECRET:string|undefined = process.env.JWT_SECRET

 const authuser = (req:Request,res:Response,next:NextFunction)=>{

    const token:string|undefined = req.header("auth-token");

    if(!token){
       return  res.status(404).send("Invalid token");
    }
    

    try {
        if (JWT_SECRET === undefined) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).send("Internal Server Error");
          }

          const data:string|JwtPayload=jwt.verify(token!,JWT_SECRET);

          if (typeof data === 'string' || !data.user) {
            console.error('Invalid token');
            return res.status(401).send({ error: 'Invalid token' });
          }
        
        req.user=data.user;
        next();

        
    } catch (error) {

        console.error("Internal server error :: " + error)
        return res.status(401).send({ error: "Some error occured" });
        
    }
}

export default authuser